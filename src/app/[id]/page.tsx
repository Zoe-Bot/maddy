import { HandRaisedIcon } from '@heroicons/react/20/solid'
import { notFound } from 'next/navigation'
import { Document, Page } from 'react-pdf'
import { Button } from '../../components/button/Button'
import { getSlideSet } from '../../services/slideSet'

type Params = { params: { id: string } }

export default async function SingleSlide({ params }: Params) {
	const slideSet = await getSlideSet(Number(params.id))

	if (!slideSet) {
		return notFound()
	}

	return (
		<main className="container py-6">
			<div>
				<Document file={slideSet.pdfUrl}>
					<Page pageNumber={1} />
				</Document>
			</div>

			<div>
				<h1 className="font-bold">{slideSet?.name}</h1>
				<p>{slideSet.uploadDate.toLocaleDateString()}</p>

				<div className="flex flex-col">
					<h2>Dozent benachrichtigen</h2>

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
							<p className="w-56">Ich habe eine Frage</p>
							<p>10</p>
						</div>
					</Button>
				</div>
			</div>
		</main>
	)
}
