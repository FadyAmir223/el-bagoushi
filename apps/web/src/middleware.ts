import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { isAuthenticated } from '@/utils/is-authenticated'

export default async function middleware(req: NextRequest) {
  if (
    (await isAuthenticated(
      req.headers.get('authorization') || req.headers.get('Authorization'),
    )) === false
  )
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    })

  const { pathname } = req.nextUrl

  if (pathname === '/admin')
    return NextResponse.redirect(new URL('/admin/upload', req.url))
}

export const config = {
  matcher: '/admin/:path*',
}
