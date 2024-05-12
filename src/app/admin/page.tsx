import { list } from '@vercel/blob'
import { Form } from '../../components/form/Form'

export default async function SingleSlide({ params }: { params: { id: string } }) {
	const blobs = await list()

	return (
		<main className="container py-6">
			<h1 className="font-bold">Foliensatz Übersicht</h1>

			<Form />

			<section></section>
		</main>
	)
}
