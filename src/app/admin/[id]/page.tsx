import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { notFound } from 'next/navigation'
import { StatisticCardLecturer } from '../../../components/cards/StatisticCardLecturer'
import SinglePagePdfRender from '../../../components/layout/SinglePagePdfRender'
import { getEverythingUnderstoodFeedbacksPerSlidesetAndPage, getNothingUnderstoodFeedbacksPerSlidesetAndPage, getQuestionFeedbacksPerSlidesetAndPage } from '../../../services/feedback'
import { getSlideSet } from '../../../services/slideSet'

type Params = { params: { id: string }; searchParams: { page: string } }

export default async function SingleSlide({ params, searchParams }: Params) {
	const { id } = params
	const { page } = searchParams
	const slideSet = await getSlideSet(parseInt(id))

	if (!slideSet) {
		return notFound()
	}

	const totalQuestions = await getQuestionFeedbacksPerSlidesetAndPage({ slidesetId: parseInt(id), page: parseInt(page) })
	const totalNothingUnderstood = await getNothingUnderstoodFeedbacksPerSlidesetAndPage({ slidesetId: parseInt(id), page: parseInt(page) })
	const totalEverythingUnderstood = await getEverythingUnderstoodFeedbacksPerSlidesetAndPage({ slidesetId: parseInt(id), page: parseInt(page) })

	return (
		<SinglePagePdfRender pdfUrl={slideSet.pdfUrl} isAdmin>
			<h1 className="font-bold text-xl md:text-2xl mt-5 xl:mt-10">{slideSet?.name}</h1>
			<p className="text-gray-500 mb-4 xl:mb-8">{slideSet.uploadDate.toLocaleDateString()}</p>

			<div className="space-y-4">
				<StatisticCardLecturer
					value={totalEverythingUnderstood}
					icon={<CheckIcon className="size-8" />}
					color="green"
					description={totalEverythingUnderstood === 1 ? 'versteht ganze Folie' : 'verstehen ganze Folie'}
				/>

				<StatisticCardLecturer value={totalQuestions} icon={<div>?</div>} color="primary" description={totalQuestions === 1 ? 'hat eine Frage' : 'haben eine Frage'} />

				<StatisticCardLecturer
					value={totalNothingUnderstood}
					icon={<XMarkIcon className="size-8" />}
					color="red"
					description={totalNothingUnderstood === 1 ? 'versteht ganze Folie nicht' : 'verstehen ganze Folie nicht'}
				/>
			</div>
		</SinglePagePdfRender>
	)
}
