import { NextResponse } from 'next/server'

function middleware(req) {
  const { pathname } = req.nextUrl

  const accessToken = req.cookies.get('accessToken')?.value
  let loggedIn = false

  if (accessToken !== undefined) loggedIn = true

  if (pathname.startsWith('/admin') && !loggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (pathname.startsWith('/login') && loggedIn) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}

const config = {
  matcher: '/admin/:path*',
}

module.exports = {
  middleware,
  config,
}
