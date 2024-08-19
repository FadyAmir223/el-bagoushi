'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { uploadProduct } from '@/actions/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import type { UploadProductSchema } from '@/validations/upload-product'
import { uploadProductSchema } from '@/validations/upload-product'

const fields = [
  { name: 'name', label: 'الاسم', placeholder: 'مكرونة' },
  { name: 'description', label: 'الوصف', placeholder: 'الوزن 500 جم' },
  { name: 'price', label: 'السعر', placeholder: '49.5' },
] as const

export default function UploadProductForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UploadProductSchema>({
    resolver: zodResolver(uploadProductSchema),
  })

  const onSubmit = async (formData: UploadProductSchema) => {
    try {
      const form = new FormData()
      form.append('name', formData.name)
      form.append('description', formData.description)
      form.append('price', formData.price.toString())
      // @ts-expect-error works fine
      form.append('image', formData.image)

      const response = await uploadProduct(form)

      if (response?.errors)
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as keyof UploadProductSchema, {
            type: 'validate',
            message: message as string,
          })
        })

      if (response?.error)
        return toast({
          description: response.error,
          variant: 'destructive',
        })

      toast({
        description: 'تم اضافة المتنج',
        variant: 'success',
      })
    } catch {
      toast({
        description: 'خطأ اثناء اضافة المنتج',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      {fields.map(({ name, label, placeholder }) => (
        <div key={name} className='space-y-1'>
          <Label>{label}</Label>
          <Input
            type='text'
            placeholder={placeholder}
            autoComplete='off'
            {...register(name)}
          />
          <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
            {errors[name]?.message}
          </p>
        </div>
      ))}

      <div className='space-y-1'>
        <Label>الصورة</Label>
        <Input type='file' accept='image/*' {...register('image')} />
        <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
          {errors.image?.message}
        </p>
      </div>

      <Button className='font-bold'>اضف المنتج</Button>
    </form>
  )
}
