import { HandRaisedIcon } from '@heroicons/react/20/solid'
import { notFound } from 'next/navigation'
import { Button } from '../../components/button/Button'
import SinglePagePdfRender from '../../components/layout/SinglePagePdfRender'
import { getSlideSet } from '../../services/slideSet'

type Params = { params: { id: string; page: string } }

export default async function SingleSlide({ params }: Params) {
	const { id, page } = params
	const slideSet = await getSlideSet(Number(id))

	if (!slideSet) {
		return notFound()
	}

	return (
		<SinglePagePdfRender id={id} pdfUrl={slideSet.pdfUrl} page={page}>
			<h1 className="font-bold text-xl md:text-2xl mt-5 xl:mt-20">{slideSet?.name}</h1>
			<p className="text-gray-500 mb-4 xl:mb-10">{slideSet.uploadDate.toLocaleDateString()}</p>

			<div className="flex flex-col">
				<h2 className="font-bold mb-2">Dozent benachrichtigen</h2>

				<div className="flex flex-col space-y-2">
					<Button>
						<div className="flex justify-between">
							<HandRaisedIcon className="w-6 h-6 mr-2" />
							<p className="w-56">Ich habe eine Frage</p>
							<p>10</p>
						</div>
					</Button>

					<Button kind="secondary">
						<div className="flex justify-between">
							<HandRaisedIcon className="w-6 h-6 mr-2" />
							<p className="w-56">Ganze Folie erklären</p>
							<p>20</p>
						</div>
					</Button>
				</div>
			</div>
		</SinglePagePdfRender>
	)
}
