'use server'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { routes } from './routes'

const JWT_SECRET = process.env.JWT_SECRET as string
const PASSWORD = process.env.PASSWORD as string

export async function login(password: string): Promise<string | void> {
	if (password === PASSWORD) {
		await setLoginCookie(password)

		redirect(routes.admin.slideDecks.overview)
	} else {
		return 'Das Passwort ist falsch'
	}
}

export async function setLoginCookie(password: string): Promise<void> {
	const token = await new SignJWT({ password }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('1h').sign(new TextEncoder().encode(JWT_SECRET))

	cookies().set('auth', token, {
		sameSite: 'strict',
		httpOnly: true,
		secure: true,
	})
}
