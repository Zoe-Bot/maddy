'use server'
import { Feedback, FeedbackType } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import prisma from './client'
import { routes } from './routes'

type FeedbackDto = {
	slidesetId: number
	page: number
	userId: string
}

export async function getFeedbackFromUser({ slidesetId, page, userId }: FeedbackDto): Promise<Feedback[]> {
	try {
		const feedbacks = await prisma.feedback.findMany({
			where: {
				slidesetId,
				page,
				userId,
			},
		})

		return feedbacks
	} catch (error) {
		console.error('Error fetching feedbacks', error)
		return []
	}
}

export async function setFeedback(feedback: FeedbackDto & { feedbackType: FeedbackType }) {
	try {
		await prisma.feedback.upsert({
			where: {
				userId_slidesetId_page: {
					userId: feedback.userId,
					slidesetId: feedback.slidesetId,
					page: feedback.page,
				},
			},
			create: {
				slidesetId: feedback.slidesetId,
				page: feedback.page,
				userId: feedback.userId,
				feedbackType: feedback.feedbackType,
			},
			update: {
				feedbackType: feedback.feedbackType,
			},
		})
		revalidatePath(routes.slideDecks.overview)
	} catch (error) {
		console.error('Error creating feedback', error)
		throw error
	}
}

export async function deleteFeedback(feedback: FeedbackDto & { feedbackType: FeedbackType }) {
	try {
		await prisma.feedback.deleteMany({
			where: {
				userId: feedback.userId,
				slidesetId: feedback.slidesetId,
				page: feedback.page,
				feedbackType: feedback.feedbackType,
			},
		})

		revalidatePath(routes.slideDecks.overview)
	} catch (error) {
		console.error('Error deleting feedback', error)
		throw error
	}
}

export async function getTotalQuestionFeedbacks(): Promise<number> {
	try {
		const totalQuestions = await prisma.feedback.count({
			where: {
				feedbackType: 'question',
			},
		})

		return totalQuestions
	} catch (error) {
		console.error('Error fetching total question feedbacks', error)
		return 0
	}
}

export async function getTotalNothingUnderstoodFeedbacks(): Promise<number> {
	try {
		const totalNothingUnderstood = await prisma.feedback.count({
			where: {
				feedbackType: 'nothing_understood',
			},
		})

		return totalNothingUnderstood
	} catch (error) {
		console.error('Error fetching total nothing understood feedbacks', error)
		return 0
	}
}

export async function getQuestionFeedbacksPerSlidesetAndPage({ slidesetId, page }: { slidesetId: number; page: number }): Promise<number> {
	try {
		const questionFeedbacks = await prisma.feedback.count({
			where: {
				slidesetId,
				page,
				feedbackType: 'question',
			},
		})

		return questionFeedbacks
	} catch (error) {
		console.error('Error fetching question feedbacks', error)
		return 0
	}
}

export async function getNothingUnderstoodFeedbacksPerSlidesetAndPage({ slidesetId, page }: { slidesetId: number; page: number }): Promise<number> {
	try {
		const nothingUnderstoodFeedbacks = await prisma.feedback.count({
			where: {
				slidesetId,
				page,
				feedbackType: 'nothing_understood',
			},
		})

		return nothingUnderstoodFeedbacks
	} catch (error) {
		console.error('Error fetching nothing understood feedbacks', error)
		return 0
	}
}

export async function getEverythingUnderstoodFeedbacksPerSlidesetAndPage({ slidesetId, page }: { slidesetId: number; page: number }): Promise<number> {
	try {
		const everythingUnderstoodFeedbacks = await prisma.feedback.count({
			where: {
				slidesetId,
				page,
				feedbackType: 'everything_understood',
			},
		})

		return everythingUnderstoodFeedbacks
	} catch (error) {
		console.error('Error fetching everything understood feedbacks', error)
		return 0
	}
}
