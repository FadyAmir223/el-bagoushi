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
}

export const config = {
  matcher: '/admin/:path*',
}
