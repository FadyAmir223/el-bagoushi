import type { Product } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const PRODUCTS = [
  {
    name: 'ارز الباجوشى',
    description: 'الحجم 600 جم',
    price: 30,
    image: '/products/ارز الباجوشى/cuid.jpg',
  },
  {
    name: 'مكرونة الباجوشى',
    description: 'اسباجتى وسط 500 جم',
    price: 45,
    image: '/products/مكرونة الباجوشى/cuid.jpg',
  },
] satisfies Partial<Product>[]

async function main() {
  await Promise.all(
    PRODUCTS.map((product) =>
      db.product.upsert({
        where: { name: product.name },
        update: {},
        create: product,
      }),
    ),
  )
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async () => {
    // console.error(error)
    await db.$disconnect()
    // @ts-expect-error process exists
    process.exit(1)
  })
