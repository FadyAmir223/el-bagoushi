import { z } from 'zod'

const isServer = typeof window === 'undefined'

export const uploadProductSchema = z.object({
  name: z.string().trim().min(1, { message: 'الاسم مطلوب' }),
  description: z.string().trim().min(1, { message: 'الوصف مطلوب' }),
  price: z.coerce
    .number({ message: 'المطلوب رقم' })
    .min(1, { message: 'السعر مطلوب' }),
  image: z
    .instanceof(isServer ? File : FileList, { message: 'الصورة مطلوبة' })
    .transform((value) =>
      value instanceof File ? value : (value.item(0) ?? { size: 0, type: '' }),
    )
    .refine((file) => file.size > 0, 'الصورة مطلوبة')
    .refine((file) => file.size <= 100 * 1024 * 1024, 'اكبر حجم للصورة 10 ميجابايت')
    .refine((file) => file.type.startsWith('image/'), 'صيغة صورة غير مدعمة'),
})

export type UploadProductSchema = z.infer<typeof uploadProductSchema>
