'use server'
import { Slideset } from '@prisma/client'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import prisma from './client'
import { routes } from './routes'

type SlidesetUpdateDto = {
	id: number
	name?: string
	description?: string
}

export async function getSlideSetsWithCounts() {
	try {
		const slidesets = await prisma.slideset.findMany({
			include: {
				_count: {
					select: {
						feedback: {
							where: {
								feedbackType: 'question',
							},
						},
					},
				},
				feedback: {
					where: {
						feedbackType: 'nothing_understood',
					},
					select: {
						feedbackType: true,
					},
				},
			},
		})

		const slidesetsWithFeedbackCounts = slidesets.map((slideset) => ({
			...slideset,
			feedbackCounts: {
				questions: slideset._count.feedback,
				nothing_understood: slideset.feedback.length,
			},
		}))

		return slidesetsWithFeedbackCounts
	} catch (error) {
		console.error('Error fetching slidesets with counts', error)
		return []
	}
}

export async function getSlideSet(id: number) {
	try {
		const slideSet = await prisma.slideset.findUnique({
			where: {
				id: id,
			},
		})
		return slideSet
	} catch (error) {
		console.error('Error fetching slideset', error)
		return null
	}
}

export async function updateSlideset(updatedSlideset: SlidesetUpdateDto) {
	try {
		await prisma.slideset.update({
			where: {
				id: updatedSlideset.id,
			},
			data: {
				name: updatedSlideset.name,
				description: updatedSlideset.description,
			},
		})

		revalidatePath(routes.admin.slideDecks.overview)
	} catch (error) {
		console.error('Error updating slideset', error)
	}
}

export async function deleteSlideSet(slideSet: Slideset) {
	try {
		await prisma.slideset.delete({
			where: {
				id: slideSet.id,
			},
		})

		await del(slideSet.pdfUrl)

		revalidatePath(routes.admin.slideDecks.overview)
	} catch (error) {
		console.error('Error deleting slideset', error)
	}
}

export async function deletePdfFile(pdfUrl: string) {
	try {
		await del(pdfUrl)
		revalidatePath(routes.admin.slideDecks.overview)
	} catch (error) {
		console.error('Error deleting pdf file', error)
	}
}

export async function getSlidesetPagesWithFeedback(slidesetId: number): Promise<number[]> {
	const pages = await prisma.feedback.findMany({
		where: {
			slidesetId: slidesetId,
		},
		select: {
			page: true,
		},
		distinct: ['page'],
		orderBy: {
			page: 'asc',
		},
	})

	const pageNumbersArray = pages.map((page) => page.page)
	return pageNumbersArray
}
