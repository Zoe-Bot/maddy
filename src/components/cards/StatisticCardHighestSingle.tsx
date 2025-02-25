import { CheckIcon } from '@heroicons/react/16/solid'
import { Slideset } from '@prisma/client'
import Link from 'next/link'
import { Document, Page } from 'react-pdf'
import { routes } from '../../services/routes'
import { Chip } from '../ui/Chip'

type Props = {
	totalQuestions: number
	totalNothingUnderstood: number
	totalEverythingUnderstood: number
	slideSet: Slideset
	page: number
	headline: string
}

export const StatisticCardHighestSingle: React.FC<Props> = ({ headline, totalQuestions, totalNothingUnderstood, totalEverythingUnderstood, slideSet, page }) => {
	return (
		<div className="relative flex items-center justify-between bg-gray-100 gap-2 p-6">
			<div>
				<p className="font-bold text-sm md:text-base mb-1">{headline}</p>
				<p className="font-bold text-primary-600 text-lg md:text-xl mb-2">Folie {page}</p>
				<div className="space-x-2">
					<Chip color="green">
						{totalEverythingUnderstood} <CheckIcon className="inline size-5" />
					</Chip>
					<Chip color="primary">{totalQuestions} ?</Chip>
					<Chip color="red">{totalNothingUnderstood} x</Chip>
				</div>
			</div>
			{page !== 0 && (
				<Document file={slideSet.pdfUrl}>
					<Page pageNumber={page} width={230} />
				</Document>
			)}
			<Link className="absolute inset-0 h-full" href={routes.admin.slideDecks.single(slideSet.id, page)} />
		</div>
	)
}
