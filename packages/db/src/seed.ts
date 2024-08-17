import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const DEFAULT_USERS = [
  { name: 'fady', phone: '010', password: 'aaaa' },
  { name: 'jessy', phone: '011', password: 'bbb' },
] satisfies Partial<User>[]

async function main() {
  await Promise.all(
    DEFAULT_USERS.map((user) =>
      db.user.upsert({
        where: { phone: user.phone },
        update: {},
        create: user,
      }),
    ),
  )
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async () => {
    // console.error(e)
    await db.$disconnect()
    // @ts-expect-error process exists
    process.exit(1)
  })
