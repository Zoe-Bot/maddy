'use server'
import { Slideset } from '@prisma/client'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { prisma } from './client'
import { routes } from './routes'

type SlidesetUpdateDto = {
	id: number
	name?: string
	description?: string
}

export async function getSlideSets() {
	const slideSets = await prisma.slideset.findMany()
	return slideSets
}

export async function getSlideSet(id: number) {
	const slideSet = await prisma.slideset.findUnique({
		where: {
			id: id,
		},
	})
	return slideSet
}

export async function updateSlideset(updatedSlideset: SlidesetUpdateDto) {
	await prisma.slideset.update({
		where: {
			id: updatedSlideset.id,
		},
		data: {
			name: updatedSlideset.name,
			description: updatedSlideset.description,
		},
	})
}

export async function deleteSlideSet(slideSet: Slideset) {
	await prisma.slideset.delete({
		where: {
			id: slideSet.id,
		},
	})

	await del(slideSet.pdfUrl)

	revalidatePath(routes.admin.slideDecks.overview)
}

export async function deletePdfFile(pdfUrl: string) {
	await del(pdfUrl)
	revalidatePath(routes.admin.slideDecks.overview)
}
