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
