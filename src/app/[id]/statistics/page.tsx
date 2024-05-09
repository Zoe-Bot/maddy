export default function Statistics({ params }: { params: { id: string } }) {
	return (
		<main className="container py-6">
			<h1 className="font-bold">Foliensatz {params.id} Statistiken</h1>
		</main>
	)
}
