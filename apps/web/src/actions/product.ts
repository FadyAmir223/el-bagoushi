'use server'

import { existsSync } from 'fs'
import { mkdir, rm, writeFile } from 'fs/promises'
import { revalidateTag } from 'next/cache'
import { headers } from 'next/headers'
import path from 'path'

import { addProduct, deleteProductDb } from '@/data/products'
import { ASSETS } from '@/utils/constants'
import { isAuthenticated } from '@/utils/is-authenticated'
import { deleteProductSchema } from '@/validations/delete-product'
import { uploadProductSchema } from '@/validations/upload-product'

export async function uploadProduct(formData: unknown) {
  if (
    (await isAuthenticated(
      headers().get('authorization') || headers().get('Authorization'),
    )) === false
  )
    return { error: 'Permission Denied' }

  if (!(formData instanceof FormData)) return { error: 'بيانات غير صحيحة' }

  const FormDataEntries = Object.fromEntries(formData)
  const result = uploadProductSchema.safeParse(FormDataEntries)

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0] as string]: issue.message }),
      {},
    )
    return { errors }
  }

  const { name, description, price, image } = result.data

  const productPath = `/products/${name}`

  // @ts-expect-error .name exists
  const imagePath = `${productPath}/${crypto.randomUUID()}${path.extname(image.name).toLowerCase()}`

  const addRes = await addProduct({ name, description, price, image: imagePath })
  if (addRes?.error) return { error: addRes.error }

  const writePath = ASSETS.path + productPath
  if (!existsSync(writePath)) await mkdir(writePath, { recursive: true })

  // @ts-expect-error .arrayBuffer() exists
  await writeFile(ASSETS.path + imagePath, Buffer.from(await image.arrayBuffer()))

  revalidateTag('products')
}

export async function deleteProduct(formData: unknown) {
  if (
    (await isAuthenticated(
      headers().get('authorization') || headers().get('Authorization'),
    )) === false
  )
    return { error: 'Permission Denied' }

  const result = deleteProductSchema.safeParse(formData)
  if (result.error) return { error: 'معرف منتج غير صحيح' }

  const deleteRes = await deleteProductDb(result.data)
  if ('error' in deleteRes) return { error: deleteRes.error }

  await rm(`${ASSETS.path}/products/${deleteRes.name}`, {
    recursive: true,
    force: true,
  })

  revalidateTag('products')
}
