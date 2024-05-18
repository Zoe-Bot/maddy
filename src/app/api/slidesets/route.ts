import { NextResponse } from 'next/server'
import { SlideSetDto } from '../../../components/modal/AddEditSlideModal'

type SlideSetRequest = {
	body: SlideSetDto
} & Request

import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { prisma } from '../../../services/client'

export async function POST(request: Request): Promise<NextResponse> {
	const body = (await request.json()) as HandleUploadBody

	try {
		const jsonResponse = await handleUpload({
			body,
			request,
			// @ts-ignore
			onBeforeGenerateToken: async (pathname, clientPayload) => {
				if (clientPayload === null) {
					throw Error('Client payload is required')
				}
				const clientPayloadData = JSON.parse(clientPayload)

				if (clientPayloadData.password !== '1234') {
					throw Error('Invalid password')
				}

				return {
					allowedContentTypes: ['application/pdf'],
					tokenPayload: JSON.stringify({
						name: clientPayloadData.name,
						description: clientPayloadData.description,
					}),
				}
			},
			onUploadCompleted: async ({ blob, tokenPayload }) => {
				try {
					const tokenPayloadData = JSON.parse(tokenPayload!)

					await prisma.slideset.create({
						data: {
							name: tokenPayloadData.name,
							description: tokenPayloadData.description,
							pdfUrl: blob.url,
						},
					})
				} catch (error) {
					throw new Error('Could not update user')
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
