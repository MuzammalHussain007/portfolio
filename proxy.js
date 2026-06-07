import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function proxy(request) {
  const { pathname } = request.nextUrl

  // Protect admin routes except login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('admin_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
