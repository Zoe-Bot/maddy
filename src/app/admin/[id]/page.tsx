import { XMarkIcon } from '@heroicons/react/20/solid'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { notFound } from 'next/navigation'
import SinglePagePdfRender from '../../../components/layout/SinglePagePdfRender'
import { getSlideSet } from '../../../services/slideSet'

export default async function SingleSlide({ params }: Params) {
	const { id } = params
	const slideSet = await getSlideSet(parseInt(id))

	if (!slideSet) {
		return notFound()
	}

	return (
		<SinglePagePdfRender pdfUrl={slideSet.pdfUrl} isAdmin>
			<h1 className="font-bold text-xl md:text-2xl mt-5 xl:mt-10">{slideSet?.name}</h1>
			<p className="text-gray-500 mb-4 xl:mb-10">{slideSet.uploadDate.toLocaleDateString()}</p>

			<div className="space-y-4">
				<div className="flex flex-col items-center gap-1 bg-primary-600 bg-opacity-10 py-6">
					<div className="flex items-center justify-center bg-primary-600 text-white text-4xl rounded-full w-16 h-16 mb-2">?</div>
					<p className="font-bold text-4xl">10</p>
					<p className="font-bold text-lg">Studenten</p>
					<p className="text-gray-500">haben eine Frage</p>
				</div>

				<div className="flex flex-col items-center gap-1 bg-red-600 bg-opacity-10 py-6">
					<div className="flex items-center justify-center bg-red-600 text-white text-4xl rounded-full w-16 h-16 mb-2">
						<XMarkIcon className="w-8 h-8" />
					</div>
					<p className="font-bold text-4xl">20</p>
					<p className="font-bold text-lg">Studenten</p>
					<p className="text-gray-500">verstehen ganze Folie nicht</p>
				</div>
			</div>
		</SinglePagePdfRender>
	)
}
