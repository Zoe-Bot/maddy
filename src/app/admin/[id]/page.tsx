export default function SingleSlide({ params }: { params: { id: string } }) {
	return (
		<main className="container py-6">
			<h1 className="font-bold">Foliensatz {params.id}</h1>
		</main>
	)
}
