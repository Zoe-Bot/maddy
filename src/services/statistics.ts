import { FeedbackType } from '@prisma/client'
import prisma from './client'

type SingleSlideSetStatistics = {
	label: string
	questions: number
	nothingUnderstood: number
}

export async function getSingleSlideSetChartData(slidesetId: number): Promise<SingleSlideSetStatistics[]> {
	try {
		// Group by page and feedbackType to count feedbacks
		const feedbackStats = await prisma.feedback.groupBy({
			by: ['page', 'feedbackType'],
			where: {
				slidesetId: slidesetId,
			},
			_count: {
				feedbackType: true,
			},
			orderBy: {
				page: 'asc',
			},
		})

		// Reduce the feedbackStats to a SingleSlideSetStatistics object with the page as key
		const result = feedbackStats.reduce<Record<number, SingleSlideSetStatistics>>((acc, stat) => {
			const page = stat.page
			if (!acc[page]) {
				acc[page] = { label: `${page}`, questions: 0, nothingUnderstood: 0 }
			}
			if (stat.feedbackType === 'question') {
				acc[page].questions += stat._count.feedbackType
			} else if (stat.feedbackType === 'nothing_understood') {
				acc[page].nothingUnderstood += stat._count.feedbackType
			}
			return acc
		}, {})

		// Remove the page key and return the values
		return Object.values(result)
	} catch (error) {
		console.error(error)
		return []
	}
}

type PageStats = {
	totalQuestions: number
	totalNothingUnderstood: number
}

type HighestStats = {
	questions: {
		page: number | null
		totalQuestions: number
		totalNothingUnderstood: number
	}
	nothingUnderstood: {
		page: number | null
		totalQuestions: number
		totalNothingUnderstood: number
	}
	problems: {
		page: number | null
		totalQuestions: number
		totalNothingUnderstood: number
	}
}

export async function getSingleSlideSetHighestStats(slidesetId: number): Promise<HighestStats> {
	try {
		// Group by page and feedbackType to count feedbacks
		const feedbackCounts = await prisma.feedback.groupBy({
			by: ['page', 'feedbackType'],
			where: {
				slidesetId: slidesetId,
			},
			_count: {
				id: true,
			},
		})

		const pageStats: Record<number, PageStats> = {}

		feedbackCounts.forEach((feedback) => {
			const { page, feedbackType, _count } = feedback
			if (!pageStats[page]) {
				pageStats[page] = {
					totalQuestions: 0,
					totalNothingUnderstood: 0,
				}
			}

			if (feedbackType === FeedbackType.question) {
				pageStats[page].totalQuestions = _count.id
			} else if (feedbackType === FeedbackType.nothing_understood) {
				pageStats[page].totalNothingUnderstood = _count.id
			}
		})

		// Determine the highest stats
		let highestStats: HighestStats = {
			questions: { page: null, totalQuestions: 0, totalNothingUnderstood: 0 },
			nothingUnderstood: { page: null, totalQuestions: 0, totalNothingUnderstood: 0 },
			problems: { page: null, totalQuestions: 0, totalNothingUnderstood: 0 },
		}

		for (const [page, stats] of Object.entries(pageStats)) {
			const pageNumber = parseInt(page)
			const { totalQuestions, totalNothingUnderstood } = stats

			// Check for the highest questions page
			if (totalQuestions > highestStats.questions.totalQuestions) {
				highestStats.questions = {
					page: pageNumber,
					totalQuestions,
					totalNothingUnderstood,
				}
			}

			// Check for the highest nothing understood page
			if (totalNothingUnderstood > highestStats.nothingUnderstood.totalNothingUnderstood) {
				highestStats.nothingUnderstood = {
					page: pageNumber,
					totalQuestions,
					totalNothingUnderstood,
				}
			}

			// Check for the highest problems page
			const totalProblems = totalQuestions + totalNothingUnderstood
			const highestProblemsTotal = highestStats.problems.totalQuestions + highestStats.problems.totalNothingUnderstood

			if (totalProblems > highestProblemsTotal) {
				highestStats.problems = {
					page: pageNumber,
					totalQuestions,
					totalNothingUnderstood,
				}
			}
		}

		return highestStats
	} catch (error) {
		console.error(error)
		return {
			questions: { page: null, totalQuestions: 0, totalNothingUnderstood: 0 },
			nothingUnderstood: { page: null, totalQuestions: 0, totalNothingUnderstood: 0 },
			problems: { page: null, totalQuestions: 0, totalNothingUnderstood: 0 },
		}
	}
}

export async function getSingleSlideSetSumStats(slidesetId: number) {
	const questionsCount = await prisma.feedback.count({
		where: {
			slidesetId: slidesetId,
			feedbackType: 'question',
		},
	})

	const nothingUnderstoodCount = await prisma.feedback.count({
		where: {
			slidesetId: slidesetId,
			feedbackType: 'nothing_understood',
		},
	})

	const problemsCount = questionsCount + nothingUnderstoodCount

	const sumStats = {
		questions: questionsCount,
		nothingUnderstood: nothingUnderstoodCount,
		problems: problemsCount,
	}

	return sumStats
}
