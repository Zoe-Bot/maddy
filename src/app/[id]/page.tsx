import { notFound } from 'next/navigation'
import { FeedbackButtonGroup } from '../../components/button/FeedbackButtonGroup'
import SinglePagePdfRender from '../../components/layout/SinglePagePdfRender'
import { getSlideSet } from '../../services/slideSet'

type Params = { params: { id: string } }

export default async function SingleSlide({ params }: Params) {
	const { id } = params
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

				<FeedbackButtonGroup slidesetId={slideSet.id} />
			</div>
		</SinglePagePdfRender>
	)
}
