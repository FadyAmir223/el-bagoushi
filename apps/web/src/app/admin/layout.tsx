import AdminNav from '@/components/admin/admin-nav'

const routes = [
  { label: 'اضف منتج', url: 'upload' },
  { label: 'ادارة المنتجات', url: 'products' },
]

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex h-[calc(100vh-86px)]'>
      <aside className='h-full w-72 overflow-y-auto bg-zinc-800 p-4'>
        <ul className='flex flex-col gap-y-3'>
          {routes.map(({ label, url }) => (
            <AdminNav key={label} url={url}>
              {label}
            </AdminNav>
          ))}
        </ul>
      </aside>

      <section className='flex-1 overflow-y-auto p-4'>{children}</section>
    </main>
  )
}
