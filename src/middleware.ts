import { jwtVerify } from 'jose'
import { JWSSignatureVerificationFailed } from 'jose/errors'
import { NextRequest, NextResponse } from 'next/server'
import { routes } from './services/routes'

const JWT_SECRET = process.env.JWT_SECRET as string
const PUBLIC_FILE = /\.(.*)$/

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (
		pathname.startsWith('/_next') || // exclude Next.js internals
		pathname.startsWith('/api') || //  exclude all API routes
		pathname.startsWith('/static') || // exclude static files
		PUBLIC_FILE.test(pathname) // exclude all files in the public folder
	) {
		return NextResponse.next()
	}

	const cookie = request.cookies.get('auth')
	let isAuthenticated = false

	if (cookie) {
		try {
			const payload = await jwtVerify(cookie.value, new TextEncoder().encode(JWT_SECRET))
			if (payload) {
				isAuthenticated = true
			}
		} catch (error) {
			if ((error as JWSSignatureVerificationFailed).code === 'ERR_JWT_EXPIRED') {
				const response = NextResponse.redirect(new URL(routes.login, request.url))
				console.debug('JWT expired')
				response.cookies.delete('auth')
				console.debug('Cookie deleted')
				return response
			} else {
				console.error('JWT verification failed', error)
			}
		}
	}

	const isLoginPage = pathname === routes.login
	const isAdminPage = pathname.startsWith('/admin')

	if (!isAuthenticated && isAdminPage) {
		return NextResponse.redirect(new URL(routes.login, request.url))
	}

	if (isAuthenticated && (isLoginPage || !isAdminPage)) {
		return NextResponse.redirect(new URL(routes.admin.slideDecks.overview, request.url))
	}

	return NextResponse.next()
}
