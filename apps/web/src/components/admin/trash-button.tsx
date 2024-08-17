'use client'

import type { Product } from '@repo/db/types'
import { useTransition } from 'react'
import { FaTrashCan } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface TrashButtonProps {
  id: Product['id']
  submitServer: (id: string) => Promise<{ error: string } | undefined>
}

export default function TrashButton({ id, submitServer }: TrashButtonProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleDeleteProduct = () => {
    startTransition(() => {
      submitServer(id)
        .then((response) => {
          if (response?.error)
            toast({
              description: response.error,
              variant: 'destructive',
            })
        })
        .catch(() => {
          toast({
            description: 'فشل مسح المنتج',
            variant: 'destructive',
          })
        })
    })
  }

  return (
    <Button
      variant='none'
      size='none'
      disabled={isPending}
      onClick={handleDeleteProduct}
    >
      <FaTrashCan className='size-6 text-destructive hover:text-destructive/80' />
    </Button>
  )
}
