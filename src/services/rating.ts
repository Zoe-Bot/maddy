'use server'
import { Rating } from '@prisma/client'
import prisma from './client'

type RatingDto = {
	slidesetId: number
	page: number
	userId: string
}

export const getRatingFromUser = async (slidesetId: number, page: number, userId: string): Promise<Rating | null> => {
	try {
		const rating = await prisma.rating.findUnique({
			where: {
				userId_slidesetId_page: {
					userId,
					slidesetId,
					page,
				},
			},
		})

		return rating
	} catch (error) {
		console.error('Error getting rating from user:', error)
		throw error
	}
}

export const deleteRating = async ({ userId, slidesetId, page }: RatingDto) => {
	try {
		await prisma.rating.delete({
			where: {
				userId_slidesetId_page: {
					userId,
					slidesetId,
					page,
				},
			},
		})
	} catch (error) {
		console.error('Error deleting rating:', error)
		throw error
	}
}

export const createOrUpdateRating = async ({ slidesetId, page, userId, stars }: RatingDto & { stars: number }) => {
	try {
		await prisma.rating.upsert({
			where: {
				userId_slidesetId_page: {
					slidesetId,
					page,
					userId,
				},
			},
			update: {
				stars,
			},
			create: {
				slidesetId,
				page,
				userId,
				stars,
			},
		})
	} catch (error) {
		console.error('Error creating or updating rating:', error)
		throw error
	}
}

type RatingCount = {
	one: number
	two: number
	three: number
	four: number
	five: number
}

export const getRatingPerSlidesetAndPage = async ({ slidesetId, page }: { slidesetId: number; page: number }): Promise<RatingCount> => {
	const starMap = {
		1: 'one',
		2: 'two',
		3: 'three',
		4: 'four',
		5: 'five',
	}

	const ratingCounts = await prisma.rating.groupBy({
		where: {
			slidesetId,
			page,
		},
		by: ['stars'],
		_count: {
			stars: true,
		},
	})

	const ratingCountsObject = ratingCounts.reduce(
		(acc: { [key: string]: number }, { stars, _count }) => {
			const key = starMap[stars as keyof typeof starMap]
			acc[key] = _count.stars
			return acc
		},
		{ one: 0, two: 0, three: 0, four: 0, five: 0 },
	) as RatingCount
	return ratingCountsObject
}
