import type { Metadata } from 'next'

import { env } from '@/lib/env'

// TODO: fill
const meta = {
  title: 'الباجوشى',
  description: 'لتعبئة المواد الغذائية',
  image: '/assets/images/logo.webp',
}

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: '%s | الباجوشى',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: env.NEXT_PUBLIC_SITE_URL,
    locale: 'ar_EG',
    siteName: meta.title,
    type: 'website',
    images: [
      {
        url: env.NEXT_PUBLIC_SITE_URL + meta.image,
        alt: `${meta.title} logo`,
        width: 1000,
        height: 1000,
      },
    ],
  },
  alternates: {
    canonical: env.NEXT_PUBLIC_SITE_URL,
    languages: {
      'en-US': `${env.NEXT_PUBLIC_SITE_URL}`,
      'ar-EG': `${env.NEXT_PUBLIC_SITE_URL}`,
    },
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  },
  assets: `${env.NEXT_PUBLIC_SITE_URL}/assets`,
  category: '',
}

import Footer from '@/components/home/footer'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
