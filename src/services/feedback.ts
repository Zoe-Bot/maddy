'use server'
import { Feedback, FeedbackType } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import prisma from './client'
import { routes } from './routes'

type FeedbackDto = {
	slidesetId: number
	page: number
	userId: string
	feedbackType: FeedbackType
}

export async function getFeedbackFromUser(slidesetId: number, page: number, userId: string): Promise<Feedback[]> {
	const feedbacks = await prisma.feedback.findMany({
		where: {
			slidesetId,
			page,
			userId,
		},
	})

	return feedbacks
}

export async function createFeedback(feedback: FeedbackDto) {
	await prisma.feedback.upsert({
		where: {
			userId_slidesetId_page_feedbackType: {
				userId: feedback.userId,
				slidesetId: feedback.slidesetId,
				page: feedback.page,
				feedbackType: feedback.feedbackType,
			},
		},
		create: {
			slidesetId: feedback.slidesetId,
			page: feedback.page,
			userId: feedback.userId,
			feedbackType: feedback.feedbackType,
		},
		update: {},
	})

	revalidatePath(routes.slideDecks.overview)
}

export async function deleteFeedback(feedback: FeedbackDto) {
	await prisma.feedback.deleteMany({
		where: {
			userId: feedback.userId,
			slidesetId: feedback.slidesetId,
			page: feedback.page,
			feedbackType: feedback.feedbackType,
		},
	})

	revalidatePath(routes.slideDecks.overview)
}

export async function getTotalQuestionFeedbacks(): Promise<number> {
	const totalQuestions = await prisma.feedback.count({
		where: {
			feedbackType: 'question',
		},
	})

	return totalQuestions
}

export async function getTotalNothingUnderstoodFeedbacks(): Promise<number> {
	const totalNothingUnderstood = await prisma.feedback.count({
		where: {
			feedbackType: 'nothing_understood',
		},
	})

	return totalNothingUnderstood
}

export async function getQuestionFeedbacksPerSlidesetAndPage(slidesetId: number, page: number): Promise<number> {
	const questionFeedbacks = await prisma.feedback.count({
		where: {
			slidesetId,
			page,
			feedbackType: 'question',
		},
	})

	return questionFeedbacks
}

export async function getNothingUnderstoodFeedbacksPerSlidesetAndPage(slidesetId: number, page: number): Promise<number> {
	const nothingUnderstoodFeedbacks = await prisma.feedback.count({
		where: {
			slidesetId,
			page,
			feedbackType: 'nothing_understood',
		},
	})

	return nothingUnderstoodFeedbacks
}
