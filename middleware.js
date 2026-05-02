export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/customers/:path*',
    '/slots/:path*',
    '/offers/:path*',
  ],
}
