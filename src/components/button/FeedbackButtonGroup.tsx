'use client'
import { HandRaisedIcon } from '@heroicons/react/20/solid'
import { FeedbackType } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { createFeedback, deleteFeedback } from '../../services/feedback'
import { getUserId } from '../../services/user'
import { Button } from './Button'

type Props = {
	slidesetId: number
}

export const FeedbackButtonGroup: React.FC<Props> = ({ slidesetId }) => {
	const searchParams = useSearchParams()
	const page = searchParams.get('page')

	const [activeButton, setActiveButton] = useState<'question' | 'nothing_understood' | null>()

	const handleFeedback = async (feedbackType: FeedbackType) => {
		const userId = getUserId()
		const pageNumber = page ? parseInt(page) : 1
		const feedback = {
			userId,
			slidesetId,
			page: pageNumber,
			feedbackType,
		}

		if (activeButton === feedbackType) {
			// If the button is active, remove the feedback
			setActiveButton(null)
			await deleteFeedback(feedback)
		} else {
			// If a different button is clicked, remove the feedback for the previously active button
			if (activeButton) {
				await deleteFeedback({
					...feedback,
					feedbackType: activeButton,
				})
			}
			// Activate the new button and create the feedback
			setActiveButton(feedbackType)
			await createFeedback(feedback)
		}
	}

	return (
		<div className="flex flex-col space-y-2">
			<Button onClick={() => handleFeedback('question')} kind={activeButton === 'question' ? 'primary' : 'secondary'}>
				<div className="flex justify-between">
					<HandRaisedIcon className={`${activeButton === 'question' ? '' : 'opacity-0'} w-6 h-6 mr-2`} />
					<p className="w-56 mr-8">Ich habe eine Frage</p>
					<p>10</p>
				</div>
			</Button>

			<Button onClick={() => handleFeedback('nothing_understood')} kind={activeButton === 'nothing_understood' ? 'primary' : 'secondary'}>
				<div className="flex justify-between">
					<HandRaisedIcon className={`${activeButton === 'nothing_understood' ? '' : 'opacity-0'} w-6 h-6 mr-2`} />
					<p className="w-56 mr-8">Ganze Folie erklären</p>
					<p>20</p>
				</div>
			</Button>
		</div>
	)
}
