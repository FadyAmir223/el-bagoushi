import ImageApi from '@/components/home/image'
import { getProducts } from '@/data/products'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getProducts()

  return (
    <main className='container my-8'>
      <h1 className='relative mb-10 pb-1 text-center text-[2rem] font-bold text-primary before:absolute before:left-1/2 before:top-full before:h-0.5 before:w-28 before:-translate-x-1/2 before:bg-primary'>
        منتجاتنا
      </h1>

      <ul className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {products.map(({ id, name, description, price, image }, idx) => (
          <li
            key={id}
            className='overflow-hidden rounded-lg border-2 border-primary p-0.5 transition-transform duration-300 hover:scale-[1.03]'
          >
            <div className='relative aspect-[3/4] w-full'>
              <ImageApi
                src={image}
                alt={name}
                className='w-full object-contain'
                sizes='
                  (max-width: 480px) 100vw, 
                  (max-width: 768px) 50vw, 
                  (max-width: 976px) 33vw, 
                  (max-width: 1240px) 25vw, 
                  20vw
                '
                fill
                priority={idx < 3}
              />
            </div>
            <div className='px-3 py-2'>
              <span className='text-lg font-bold'>
                {price}
                <span className='text-primary'> EGP</span>
              </span>

              <p className='mb-2 mt-3 font-semibold'>{name}</p>
              <p className=''>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
