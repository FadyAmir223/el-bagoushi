import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/admin'],
    },

    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
