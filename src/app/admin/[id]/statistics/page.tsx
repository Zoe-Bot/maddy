import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Document, Page } from 'react-pdf'
import { Chip } from '../../../../components/ui/Chip'
import { routes } from '../../../../services/routes'
import { getSlideSet } from '../../../../services/slideSet'

type Params = { params: { id: string } }

export default async function Statistics({ params }: Params) {
	const { id } = params
	const slideSet = await getSlideSet(parseInt(id))

	if (!slideSet) {
		return notFound()
	}

	const totalQuestions = 0
	const totalNothingUnderstood = 0

	return (
		<main className="container py-6">
			<h1 className="font-bold text-xl md:text-2xl">{slideSet?.name}</h1>
			<p className="text-gray-500 mb-2 md:mb-4">{slideSet.uploadDate.toLocaleDateString()}</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="relative flex items-center justify-between bg-gray-100 p-6">
					<div>
						<p className="font-bold mb-1">Meiste Fragen</p>
						<p className="font-bold text-primary-500 text-xl mb-2">Folie 10</p>
						<div className="space-x-2">
							<Chip color="primary">{totalQuestions} ?</Chip>
							<Chip color="red">{totalNothingUnderstood} x</Chip>
						</div>
					</div>
					<Document file={slideSet.pdfUrl}>
						<Page pageNumber={10} width={250} />
					</Document>
					<Link className="absolute inset-0 h-full" href={routes.slideDecks.single(slideSet.id, 10)} />
				</div>
			</div>
		</main>
	)
}
