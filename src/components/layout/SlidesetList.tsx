import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { getTotalNothingUnderstoodFeedbacks, getTotalQuestionFeedbacks } from '../../services/feedback'
import { routes } from '../../services/routes'
import { getSlideSetsWithCounts } from '../../services/slideSet'
import { SlideSetListMenu } from '../ui/SlideSetListMenu'

type Props = {
	isAdmin?: boolean
}

export const SlideSetList: React.FC<Props> = async ({ isAdmin }) => {
	const slideSets = await getSlideSetsWithCounts()
	const totalQuestions = await getTotalQuestionFeedbacks()
	const totalNothingUnderstood = await getTotalNothingUnderstoodFeedbacks()

	return (
		<>
			<div className="space-y-6 mb-8 md:mb-10">
				{slideSets.map((slideSet) => (
					<div className="flex flex-row items-center justify-between" key={slideSet.id}>
						<Link className="flex items-center justify-between w-full" href={isAdmin ? routes.admin.slideDecks.single(slideSet.id) : routes.slideDecks.single(slideSet.id)}>
							<div>
								<h2 className="text-primary-600 text-lg md:text-xl font-bold">{slideSet.name}</h2>
								<p className="text-gray-800 mb-1">{slideSet.description}</p>
								<p className="text-gray-400 text-sm">{slideSet.uploadDate.toLocaleDateString()}</p>
							</div>

							<div className="flex items-center gap-2 min-w-fit">
								{/* <Chip color="primary">{slideSet.feedbackCounts.questions} ?</Chip>
								<Chip color="red">{slideSet.feedbackCounts.nothing_understood} x</Chip> */}

								{!isAdmin && <ChevronRightIcon className="w-8 h-8 text-gray-400 ml-5" />}
							</div>
						</Link>

						{isAdmin && <SlideSetListMenu slideSet={slideSet} />}
					</div>
				))}
			</div>

			{/* <div className="text-center">
				<p>
					Das sind <span className="font-bold">{slideSets.length} Folien</span> mit ingesamt <Chip color="primary">{totalQuestions} ?</Chip> {totalQuestions === 1 ? 'Frage' : 'Fragen'} und{' '}
					<Chip color="red">{totalNothingUnderstood} x</Chip> nicht verstanden.
				</p>
			</div> */}
		</>
	)
}
