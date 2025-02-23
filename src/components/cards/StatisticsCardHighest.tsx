import { CheckIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { routes } from '../../services/routes'
import { Chip } from '../ui/Chip'

type Props = {
	headline: string
	slideset: {
		id: number
		name: string
	} | null
	totalQuestions: number
	totalNothingUnderstood: number
	totalEverythingUnderstood: number
}

export const StatisticCardHighest: React.FC<Props> = ({ headline, totalQuestions, totalNothingUnderstood, totalEverythingUnderstood, slideset }) => {
	return (
		<div className="relative flex items-center justify-between bg-gray-100 gap-2 p-6">
			<div>
				<p className="font-bold text-sm md:text-base mb-1">{headline}</p>
				<p className="font-bold text-primary-600 text-lg md:text-xl mb-2 md:mb-4">{slideset?.name ?? ''}</p>
				<div className="space-x-2">
					<Chip color="green">
						{totalEverythingUnderstood} <CheckIcon className="inline size-5" />
					</Chip>
					<Chip color="primary">{totalQuestions} ?</Chip>
					<Chip color="red">{totalNothingUnderstood} x</Chip>
				</div>
			</div>
			<Link className="absolute inset-0 h-full" href={routes.admin.slideDecks.single(slideset?.id ?? 1, 1)} />
		</div>
	)
}
