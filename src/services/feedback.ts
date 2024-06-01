'use server'

import { Feedback, FeedbackType } from '@prisma/client'
import { prisma } from './client'

type FeedbackDto = {
	slidesetId: number
	page: number
	userId: number
	feedbackType: FeedbackType
}

export async function createFeedback(feedback: FeedbackDto) {
	await prisma.feedback.create({
		data: {
			slidesetId: feedback.slidesetId,
			page: feedback.page,
			userId: feedback.userId,
			feedbackType: feedback.feedbackType,
		},
	})
}

export async function deleteFeedback(feedback: Feedback) {
	await prisma.feedback.deleteMany({
		where: {
			userId: feedback.userId,
			slidesetId: feedback.slidesetId,
			page: feedback.page,
		},
	})
}
