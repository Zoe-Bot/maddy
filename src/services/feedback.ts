'use server'

import { FeedbackType } from '@prisma/client'
import { prisma } from './client'

type FeedbackDto = {
	slidesetId: number
	page: number
	userId: string
	feedbackType: FeedbackType
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
}
