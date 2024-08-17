import dynamic from 'next/dynamic'

const UploadProductForm = dynamic(
  () => import('@/components/admin/upload-product-form'),
  { ssr: false },
)

export default function AdminUpload() {
  return (
    <main>
      <UploadProductForm />
    </main>
  )
}
