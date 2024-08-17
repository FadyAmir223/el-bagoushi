import db from '@repo/db'

export default async function Home() {
  const users = await db.user.findMany({})

  return (
    <main>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <p>{user.phone}</p>
        </div>
      ))}
    </main>
  )
}
