import db from '@repo/db'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await db.product.findMany({})

  return (
    <main>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
        </div>
      ))}
    </main>
  )
}
