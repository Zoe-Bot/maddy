import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import prisma from '../../../../services/client'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(request: Request): Promise<NextResponse> {
	const body = (await request.json()) as HandleUploadBody

	try {
		const jsonResponse = await handleUpload({
			body,
			request,
			onBeforeGenerateToken: async (_, clientPayload) => {
				if (clientPayload === null) {
					throw Error('Client payload is required')
				}

				const clientPayloadData = JSON.parse(clientPayload)

				const cookieStore = cookies()
				const authCookie = cookieStore.get('auth')

				if (!authCookie) {
					throw Error('Need to be logged in')
				}
				const payload = await jwtVerify(authCookie.value, new TextEncoder().encode(JWT_SECRET))

				if (!payload) {
					throw Error('Unauthorized')
				}

				return {
					allowedContentTypes: ['application/pdf'],
					tokenPayload: JSON.stringify({
						id: clientPayloadData.id,
						name: clientPayloadData.name,
						description: clientPayloadData.description,
					}),
				}
			},
			onUploadCompleted: async ({ blob, tokenPayload }) => {
				try {
					const tokenPayloadData = JSON.parse(tokenPayload!)

					await prisma.slideset.update({
						where: {
							id: tokenPayloadData.id,
						},
						data: {
							name: tokenPayloadData.name,
							description: tokenPayloadData.description,
							pdfUrl: blob.url,
						},
					})
				} catch (error) {
					throw new Error('Could not create slide set in the database')
				}
			},
		})

		return NextResponse.json(jsonResponse)
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 400 }, // The webhook will retry 5 times waiting for a 200
		)
	}
}
