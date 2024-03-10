import type { NextRequest } from 'next/server'
import { AuthToken } from './app/services/auth.token'

export function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (request.cookies.has('jwtToken')) {
            const cookie = request.cookies.get('jwtToken')
            const Token = new AuthToken(cookie.value)

            if (Token.isExpired) {
                return Response.redirect(new URL('/login', request.url))
            }

            return
        } else {

            return Response.redirect(new URL('/login', request.url))
        }
    }
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*'],
}