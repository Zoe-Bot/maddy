'use client'
import { HandRaisedIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Button } from './Button'

export const FeedbackButtonGroup: React.FC = () => {
	const [activeButton, setActiveButton] = useState<'question' | 'nothing_understood' | null>()

	return (
		<div className="flex flex-col space-y-2">
			<Button onClick={() => setActiveButton((activeButton) => (activeButton === 'question' ? null : 'question'))} kind={activeButton === 'question' ? 'primary' : 'secondary'}>
				<div className="flex justify-between">
					<HandRaisedIcon className={`${activeButton === 'question' ? '' : 'opacity-0'} w-6 h-6 mr-2`} />
					<p className="w-56 mr-8">Ich habe eine Frage</p>
					<p>10</p>
				</div>
			</Button>

			<Button
				onClick={() => setActiveButton((activeButton) => (activeButton === 'nothing_understood' ? null : 'nothing_understood'))}
				kind={activeButton === 'nothing_understood' ? 'primary' : 'secondary'}
			>
				<div className="flex justify-between">
					<HandRaisedIcon className={`${activeButton === 'nothing_understood' ? '' : 'opacity-0'} w-6 h-6 mr-2`} />
					<p className="w-56 mr-8">Ganze Folie erklären</p>
					<p>20</p>
				</div>
			</Button>
		</div>
	)
}
