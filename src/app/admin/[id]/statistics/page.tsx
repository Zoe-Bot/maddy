import { notFound } from 'next/navigation'
import { StatisticCardHighest } from '../../../../components/cards/StatisticCardHighest'
import { StatisticCardSum } from '../../../../components/cards/StatisticCardSum'
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

			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				<StatisticCardHighest headline="Meiste Fragen" totalQuestions={totalQuestions} totalNothingUnderstood={totalNothingUnderstood} slideSet={slideSet} page={1} />
				<StatisticCardHighest headline="Meiste Nichts verstanden" totalQuestions={totalQuestions} totalNothingUnderstood={totalNothingUnderstood} slideSet={slideSet} page={2} />
				<StatisticCardHighest headline="Meiste Probleme" totalQuestions={totalQuestions} totalNothingUnderstood={totalNothingUnderstood} slideSet={slideSet} page={3} />
				<StatisticCardSum headline="Gesamt Fragen" symbol="?" totalCount={totalQuestions} />
				<StatisticCardSum headline="Gesamt Nichts verstanden" symbol="x" totalCount={totalNothingUnderstood} />
				<StatisticCardSum headline="Gesamt Probleme" symbol="?x" totalCount={totalQuestions + totalNothingUnderstood} />
			</div>
		</main>
	)
}
