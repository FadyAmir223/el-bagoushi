import 'server-only'

import db from '@repo/db'
import type { Product } from '@repo/db/types'
import { Prisma } from '@repo/db/types'
import { unstable_cache } from 'next/cache'

export const getProducts = unstable_cache(
  async () => {
    try {
      return db.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
        },
      })
    } catch {
      return []
    }
  },
  ['products'],
  { tags: ['products'] },
)

export async function getAdminProducts() {
  try {
    return db.product.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  } catch {
    return []
  }
}

export async function addProduct(data: {
  name: string
  description: string
  price: number
  image: string
}) {
  try {
    await db.product.create({
      data,
      select: { id: true },
    })
  } catch (error) {
    console.log(error)

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === 'P2002') return { error: 'اسم منتج مكرر' }

    return { error: 'حدث خطأ اثناء الحفظ فى قاعدة البيانات' }
  }
}

export async function deleteProductDb(id: Product['id']) {
  try {
    return await db.product.delete({
      where: { id },
      select: { name: true },
    })
  } catch {
    return { error: 'فشل مسح المنتج' }
  }
}
