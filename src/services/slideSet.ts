'use server'
import { Slideset } from '@prisma/client'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { prisma } from './client'
import { routes } from './routes'

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

export async function deleteSlideSet(slideSet: Slideset) {
	await prisma.slideset.delete({
		where: {
			id: slideSet.id,
		},
	})

	await del(slideSet.pdfUrl)

	revalidatePath(routes.admin.slideDecks.overview)
}
