import { notFound } from 'next/navigation'
import { FeedbackButtonGroup } from '../../components/button/FeedbackButtonGroup'
import { FeedbackStars } from '../../components/button/FeedbackStars'
import SinglePagePdfRender from '../../components/layout/SinglePagePdfRender'
import { getSlideSet } from '../../services/slideSet'

type Params = { params: { id: string }; searchParams: { page: string } }

export default async function SingleSlide({ params, searchParams }: Params) {
	const { id } = params
	const { page } = searchParams
	const slideSet = await getSlideSet(parseInt(id))

	if (!slideSet) {
		return notFound()
	}

	return (
		<SinglePagePdfRender pdfUrl={slideSet.pdfUrl}>
			<h1 className="font-bold text-xl md:text-2xl mt-5 xl:mt-20">{slideSet?.name}</h1>
			<p className="text-gray-500 mb-4 xl:mb-10">{slideSet.uploadDate.toLocaleDateString()}</p>

			<div className="flex flex-col">
				<h2 className="font-bold mb-2">Dozent benachrichtigen</h2>

				{parseInt(page) % 2 === 0 ? <FeedbackButtonGroup slidesetId={slideSet.id} /> : <FeedbackStars slidesetId={slideSet.id} />}
			</div>
		</SinglePagePdfRender>
	)
}
