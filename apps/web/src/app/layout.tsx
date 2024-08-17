import './globals.css'

import { Roboto } from 'next/font/google'

import Header from '@/components/home/header'
import { Toaster } from '@/components/ui/toaster'
import { env } from '@/lib/env'
import { cn } from '@/utils/cn'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ar' dir='rtl'>
      <body
        className={cn(
          roboto.className,
          'flex min-h-screen flex-col overflow-x-hidden bg-[#2f2a25] text-[#F1F1F1]',
          env.NODE_ENV === 'development' && 'debug-screens',
        )}
      >
        <Header />
        {children}

        <Toaster />
      </body>
    </html>
  )
}
