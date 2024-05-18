'use server'
import { prisma } from './client'

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
