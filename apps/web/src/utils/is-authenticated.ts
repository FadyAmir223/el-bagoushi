import { env } from '@/lib/env'

async function encodePassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    'SHA-512',
    new TextEncoder().encode(password),
  )
  return Buffer.from(arrayBuffer).toString('base64')
}

export async function isAuthenticated(token: string | null) {
  if (!token) return false

  // @ts-expect-error Buffer.from accepts string
  const [username, password] = Buffer.from(token.split(' ')[1], 'base64')
    .toString()
    .split(':')

  if (!password) return false

  return (
    username === env.ADMIN_USERNAME &&
    (await encodePassword(password)) === env.ADMIN_PASSWORD
  )
}
