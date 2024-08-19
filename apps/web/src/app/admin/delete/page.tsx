import { deleteProduct } from '@/actions/product'
import TrashButton from '@/components/admin/trash-button'
import { getAdminProducts } from '@/data/products'

export const dynamic = 'force-dynamic'

export default async function AdminProducts() {
  const products = await getAdminProducts()

  return (
    <main>
      <ul className='grid grid-cols-2 gap-5'>
        {products.map(({ id, name }) => (
          <li
            key={id}
            className='flex items-center justify-between rounded-lg border border-primary bg-neutral-800 p-3'
          >
            {name}
            <TrashButton id={id} submitServer={deleteProduct} />
          </li>
        ))}
      </ul>
    </main>
  )
}
