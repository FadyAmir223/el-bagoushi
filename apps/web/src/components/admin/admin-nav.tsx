'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

interface AdminNavProps {
  children: ReactNode
  url: string
}

export default function AdminNav({ children, url }: AdminNavProps) {
  const pathname = usePathname()
  const segment = pathname.split('/').at(-1)

  return (
    <Link
      key={url}
      href={`/admin/${url}`}
      className={cn(
        'rounded-md bg-primary-foreground px-4 py-2 transition-colors hover:bg-primary-foreground/75',
        { 'bg-primary-foreground/95': segment === url },
      )}
    >
      {children}
    </Link>
  )
}
