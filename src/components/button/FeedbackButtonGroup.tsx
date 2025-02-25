'use client'
import { ArrowPathIcon, HandRaisedIcon } from '@heroicons/react/20/solid'
import { FeedbackType } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
	deleteFeedback,
	getEverythingUnderstoodFeedbacksPerSlidesetAndPage,
	getFeedbackFromUser,
	getNothingUnderstoodFeedbacksPerSlidesetAndPage,
	getQuestionFeedbacksPerSlidesetAndPage,
	setFeedback,
} from '../../services/feedback'
import { getUserId } from '../../services/user'
import { Button } from './Button'

type Props = {
	slidesetId: number
}

export const FeedbackButtonGroup: React.FC<Props> = ({ slidesetId }) => {
	const searchParams = useSearchParams()
	const page = searchParams.get('page')
	const pageNumber = useMemo(() => (page ? parseInt(page) : 1), [page])
	const userId = getUserId()

	const [activeButton, setActiveButton] = useState<'question' | 'nothing_understood' | 'everything_understood' | null>()
	const [totalQuestions, setTotalQuestions] = useState<number>(0)
	const [totalNothingUnderstood, setTotalNothingUnderstood] = useState<number>(0)
	const [totalEverythingUnderstood, setTotalEverythingUnderstood] = useState<number>(0)
	const [isLoadingTotalFeedback, setIsLoadingTotalFeedback] = useState<boolean>(true)
	const [isLoadingFeedback, setIsLoadingFeedback] = useState<boolean>(false)

	useEffect(() => {
		const getFeedback = async () => {
			const feedbacks = await getFeedbackFromUser({ slidesetId, page: pageNumber, userId })

			if (feedbacks.length !== 0) {
				setActiveButton(feedbacks[0].feedbackType)
			} else {
				setActiveButton(null)
			}
		}
		getFeedback()
	}, [slidesetId, pageNumber, userId])

	useEffect(() => {
		setIsLoadingTotalFeedback(true)
		const getQuestionsAndNothingUnderstood = async () => {
			const [totalQuestions, totalNothingUnderstood, totalEverythingUnderstood] = await Promise.all([
				getQuestionFeedbacksPerSlidesetAndPage({ slidesetId, page: pageNumber }),
				getNothingUnderstoodFeedbacksPerSlidesetAndPage({ slidesetId, page: pageNumber }),
				getEverythingUnderstoodFeedbacksPerSlidesetAndPage({ slidesetId, page: pageNumber }),
			])

			setTotalQuestions(totalQuestions)
			setTotalNothingUnderstood(totalNothingUnderstood)
			setTotalEverythingUnderstood(totalEverythingUnderstood)
			setIsLoadingTotalFeedback(false)
		}
		getQuestionsAndNothingUnderstood()
	}, [slidesetId, pageNumber, activeButton])

	const handleFeedback = async (feedbackType: FeedbackType) => {
		const feedback = {
			userId,
			slidesetId,
			page: pageNumber,
			feedbackType,
		}

		try {
			setIsLoadingFeedback(true)
			if (activeButton === feedbackType) {
				// If the button is active, remove the feedback
				setActiveButton(null)
				await deleteFeedback(feedback)
			} else {
				setActiveButton(feedbackType)
				await setFeedback(feedback)
			}
		} catch (error) {
			setActiveButton(activeButton)
		} finally {
			setIsLoadingFeedback(false)
		}
	}

	return (
		<div className="flex flex-col space-y-2">
			<Button disabled={isLoadingFeedback} onClick={() => handleFeedback('everything_understood')} kind={activeButton === 'everything_understood' ? 'primary' : 'secondary'}>
				<div className="flex justify-between items-center">
					<HandRaisedIcon className={`${activeButton === 'everything_understood' ? '' : 'opacity-0'} w-6 h-6 mr-2`} />
					<p className="w-56 mr-6">Alles verstanden</p>
					<p className="w-6">{isLoadingTotalFeedback ? <ArrowPathIcon className="animate-spin w-5 h-5" /> : totalEverythingUnderstood}</p>
				</div>
			</Button>

			<Button disabled={isLoadingFeedback} onClick={() => handleFeedback('question')} kind={activeButton === 'question' ? 'primary' : 'secondary'}>
				<div className="flex justify-between items-center">
					<HandRaisedIcon className={`${activeButton === 'question' ? '' : 'opacity-0'} w-6 h-6 mr-2`} />
					<p className="w-56 mr-6">Ich habe eine kleine Frage</p>
					<p className="w-6">{isLoadingTotalFeedback ? <ArrowPathIcon className="animate-spin w-5 h-5" /> : totalQuestions}</p>
				</div>
			</Button>

			<Button disabled={isLoadingFeedback} onClick={() => handleFeedback('nothing_understood')} kind={activeButton === 'nothing_understood' ? 'primary' : 'secondary'}>
				<div className="flex justify-between items-center">
					<HandRaisedIcon className={`${activeButton === 'nothing_understood' ? '' : 'opacity-0'} w-6 h-6 mr-2`} />
					<p className="w-56 mr-6">Ganze Folie erklären</p>
					<p className="w-6">{isLoadingTotalFeedback ? <ArrowPathIcon className="animate-spin w-5 h-5" /> : totalNothingUnderstood}</p>
				</div>
			</Button>
		</div>
	)
}
