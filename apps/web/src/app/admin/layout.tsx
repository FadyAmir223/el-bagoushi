import AdminNav from '@/components/admin/admin-nav'

const routes = [
  { label: 'اضف منتج', url: 'upload' },
  { label: 'امسح منتج', url: 'delete' },
]

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex flex-col md:h-[calc(100vh-86px)] md:flex-row'>
      <aside className='block bg-zinc-800 p-4 md:h-full md:w-72 md:overflow-y-auto'>
        <ul className='flex flex-1 flex-row flex-wrap gap-2 gap-y-3 md:flex-col'>
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
