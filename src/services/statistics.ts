import { FeedbackType } from '@prisma/client'
import prisma from './client'

type SingleSlideSetStatistics = {
	label: string
	questions: number
	nothingUnderstood: number
	everythingUnderstood: number
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
				acc[page] = { label: `${page}`, questions: 0, nothingUnderstood: 0, everythingUnderstood: 0 }
			}
			if (stat.feedbackType === 'question') {
				acc[page].questions += stat._count.feedbackType
			} else if (stat.feedbackType === 'nothing_understood') {
				acc[page].nothingUnderstood += stat._count.feedbackType
			} else if (stat.feedbackType === 'everything_understood') {
				acc[page].everythingUnderstood += stat._count.feedbackType
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
	totalEverythingUnderstood: number
}

type HighestStats = {
	questions: {
		page: number | null
		totalQuestions: number
		totalNothingUnderstood: number
		totalEverythingUnderstood: number
	}
	nothingUnderstood: {
		page: number | null
		totalQuestions: number
		totalNothingUnderstood: number
		totalEverythingUnderstood: number
	}
	everythingUnderstood: {
		page: number | null
		totalQuestions: number
		totalNothingUnderstood: number
		totalEverythingUnderstood: number
	}
	problems: {
		page: number | null
		totalQuestions: number
		totalNothingUnderstood: number
		totalEverythingUnderstood: number
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
					totalEverythingUnderstood: 0,
				}
			}

			if (feedbackType === FeedbackType.question) {
				pageStats[page].totalQuestions = _count.id
			} else if (feedbackType === FeedbackType.nothing_understood) {
				pageStats[page].totalNothingUnderstood = _count.id
			} else if (feedbackType === FeedbackType.everything_understood) {
				pageStats[page].totalEverythingUnderstood = _count.id
			}
		})

		// Determine the highest stats
		let highestStats: HighestStats = {
			questions: { page: null, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
			nothingUnderstood: { page: null, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
			problems: { page: null, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
			everythingUnderstood: { page: null, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
		}

		for (const [page, stats] of Object.entries(pageStats)) {
			const pageNumber = parseInt(page)
			const { totalQuestions, totalNothingUnderstood, totalEverythingUnderstood } = stats

			// Check for the highest questions page
			if (totalQuestions > highestStats.questions.totalQuestions) {
				highestStats.questions = {
					page: pageNumber,
					totalQuestions,
					totalNothingUnderstood,
					totalEverythingUnderstood,
				}
			}

			// Check for the highest nothing understood page
			if (totalNothingUnderstood > highestStats.nothingUnderstood.totalNothingUnderstood) {
				highestStats.nothingUnderstood = {
					page: pageNumber,
					totalQuestions,
					totalNothingUnderstood,
					totalEverythingUnderstood,
				}
			}

			// Check for the highest everything understood page
			if (totalEverythingUnderstood > highestStats.everythingUnderstood.totalEverythingUnderstood) {
				highestStats.everythingUnderstood = {
					page: pageNumber,
					totalQuestions,
					totalNothingUnderstood,
					totalEverythingUnderstood,
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
					totalEverythingUnderstood,
				}
			}
		}

		return highestStats
	} catch (error) {
		console.error(error)
		return {
			questions: { page: null, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
			nothingUnderstood: { page: null, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
			problems: { page: null, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
			everythingUnderstood: { page: null, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
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

	const everythingUnderstoodCount = await prisma.feedback.count({
		where: {
			slidesetId: slidesetId,
			feedbackType: 'everything_understood',
		},
	})

	const problemsCount = questionsCount + nothingUnderstoodCount

	const sumStats = {
		questions: questionsCount,
		nothingUnderstood: nothingUnderstoodCount,
		problems: problemsCount,
		everythingUnderstood: everythingUnderstoodCount,
	}

	return sumStats
}

export async function getSlideSetsChartData() {
	try {
		// Get all slidesets
		const slidesets = await prisma.slideset.findMany()

		// Get all feedbacks grouped by slidesetId and feedbackType
		const feedbacks = await prisma.feedback.groupBy({
			by: ['slidesetId', 'feedbackType'],
			_count: {
				slidesetId: true,
			},
		})

		// Initialize the results array with the slideset ids
		const results = slidesets.map((slideset) => ({
			label: slideset.id.toString(),
			questions: 0,
			nothingUnderstood: 0,
			everythingUnderstood: 0,
		}))

		// Fill the results array with the feedback counts
		feedbacks.forEach((feedback) => {
			const slidesetResult = results.find((result) => result.label === feedback.slidesetId.toString())
			if (slidesetResult) {
				if (feedback.feedbackType === 'question') {
					slidesetResult.questions = feedback._count.slidesetId
				} else if (feedback.feedbackType === 'nothing_understood') {
					slidesetResult.nothingUnderstood = feedback._count.slidesetId
				} else if (feedback.feedbackType === 'everything_understood') {
					slidesetResult.everythingUnderstood = feedback._count.slidesetId
				}
			}
		})

		return results
	} catch (error) {
		console.error(error)
		return []
	}
}

export async function getSlideSetsHighestStats() {
	try {
		const slidesets = await prisma.slideset.findMany()
		const allSlidesetStats = await getSlideSetsChartData()

		const mostQuestionsSlideset = allSlidesetStats.reduce((prev, current) => (prev.questions > current.questions ? prev : current))
		const mostNothingUnderstoodSlideset = allSlidesetStats.reduce((prev, current) => (prev.nothingUnderstood > current.nothingUnderstood ? prev : current))
		const mostProblemsSlideset = allSlidesetStats.reduce((prev, current) => (prev.questions + prev.nothingUnderstood > current.questions + current.nothingUnderstood ? prev : current))
		const mostEverythingUnderstoodSlideset = allSlidesetStats.reduce((prev, current) => (prev.everythingUnderstood > current.everythingUnderstood ? prev : current))

		const result = {
			questions: {
				slideset: {
					id: Number(mostQuestionsSlideset.label),
					name: slidesets.find((slideset) => slideset.id.toString() === mostQuestionsSlideset.label)!.name,
				},
				totalQuestions: mostQuestionsSlideset.questions,
				totalNothingUnderstood: mostQuestionsSlideset.nothingUnderstood,
				totalEverythingUnderstood: mostQuestionsSlideset.everythingUnderstood,
			},
			nothingUnderstood: {
				slideset: {
					id: Number(mostNothingUnderstoodSlideset.label),
					name: slidesets.find((s) => s.id.toString() === mostNothingUnderstoodSlideset.label)!.name,
				},
				totalQuestions: mostNothingUnderstoodSlideset.questions,
				totalNothingUnderstood: mostNothingUnderstoodSlideset.nothingUnderstood,
				totalEverythingUnderstood: mostNothingUnderstoodSlideset.everythingUnderstood,
			},
			everythingUnderstood: {
				slideset: {
					id: Number(mostEverythingUnderstoodSlideset.label),
					name: slidesets.find((s) => s.id.toString() === mostEverythingUnderstoodSlideset.label)!.name,
				},
				totalQuestions: mostEverythingUnderstoodSlideset.questions,
				totalNothingUnderstood: mostEverythingUnderstoodSlideset.nothingUnderstood,
				totalEverythingUnderstood: mostEverythingUnderstoodSlideset.everythingUnderstood,
			},
			problems: {
				slideset: {
					id: Number(mostProblemsSlideset.label),
					name: slidesets.find((s) => s.id.toString() === mostProblemsSlideset.label)!.name,
				},
				totalQuestions: mostProblemsSlideset.questions,
				totalNothingUnderstood: mostProblemsSlideset.nothingUnderstood,
				totalEverythingUnderstood: mostProblemsSlideset.everythingUnderstood,
			},
		}
		return result
	} catch (error) {
		console.error(error)
		return {
			questions: { slideset: { id: 0, name: '' }, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
			nothingUnderstood: { slideset: { id: 0, name: '' }, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
			problems: { slideset: { id: 0, name: '' }, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
			everythingUnderstood: { slideset: { id: 0, name: '' }, totalQuestions: 0, totalNothingUnderstood: 0, totalEverythingUnderstood: 0 },
		}
	}
}
