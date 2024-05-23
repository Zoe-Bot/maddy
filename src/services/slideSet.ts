'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from './client'
import { routes } from './routes'

export async function getSlideSets() {
	const slideSets = await prisma.slideset.findMany()

	revalidatePath(routes.admin.slideDecks.overview)
	revalidatePath(routes.slideDecks.overview)
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

export async function deleteSlideSet(id: number) {
	await prisma.slideset.delete({
		where: {
			id,
		},
	})

	revalidatePath(routes.admin.slideDecks.overview)
	revalidatePath(routes.slideDecks.overview)
}
