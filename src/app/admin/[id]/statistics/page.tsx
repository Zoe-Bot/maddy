import { notFound } from 'next/navigation'
import { StatisticCardHighestSingle } from '../../../../components/cards/StatisticCardHighestSingle'
import { StatisticCardSum } from '../../../../components/cards/StatisticCardSum'
import { BarChart } from '../../../../components/charts/BarChart'
import { getSlideSet } from '../../../../services/slideSet'
import { getSingleSlideSetChartData, getSingleSlideSetHighestStats, getSingleSlideSetSumStats } from '../../../../services/statistics'

type Params = { params: { id: string } }

export default async function SingleSlidesetStatistics({ params }: Params) {
	const { id } = params
	const slideSet = await getSlideSet(parseInt(id))

	if (!slideSet) {
		return notFound()
	}

	const singleSlidesetChartData = await getSingleSlideSetChartData(slideSet.id)
	const highestStats = await getSingleSlideSetHighestStats(slideSet.id)
	const sumStats = await getSingleSlideSetSumStats(slideSet.id)

	return (
		<main className="container py-6">
			<h1 className="font-bold text-xl md:text-2xl">{slideSet?.name}</h1>
			<p className="text-gray-500 mb-2 md:mb-4">{slideSet.uploadDate.toLocaleDateString()}</p>

			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
				<StatisticCardHighestSingle
					headline="Meiste Fragen"
					totalQuestions={highestStats.questions.totalQuestions}
					totalNothingUnderstood={highestStats.questions.totalNothingUnderstood}
					slideSet={slideSet}
					page={highestStats.questions.page ?? 0}
				/>
				<StatisticCardHighestSingle
					headline="Meiste Komplett Erklären"
					totalQuestions={highestStats.nothingUnderstood.totalQuestions}
					totalNothingUnderstood={highestStats.nothingUnderstood.totalNothingUnderstood}
					slideSet={slideSet}
					page={highestStats.nothingUnderstood.page ?? 0}
				/>
				<StatisticCardHighestSingle
					headline="Meiste Alles Verstanden"
					totalQuestions={highestStats.everythingUnderstood.totalQuestions}
					totalNothingUnderstood={highestStats.everythingUnderstood.totalNothingUnderstood}
					slideSet={slideSet}
					page={highestStats.everythingUnderstood.page ?? 0}
				/>
				<StatisticCardHighestSingle
					headline="Meiste Probleme"
					totalQuestions={highestStats.problems.totalQuestions}
					totalNothingUnderstood={highestStats.problems.totalNothingUnderstood}
					slideSet={slideSet}
					page={highestStats.problems.page ?? 0}
				/>
				<StatisticCardSum headline="Gesamt Fragen" symbol="?" totalCount={sumStats.questions} />
				<StatisticCardSum headline="Gesamt Komplett Erklären" symbol="x" totalCount={sumStats.nothingUnderstood} />
				<StatisticCardSum headline="Gesamt Probleme" symbol="?x" totalCount={sumStats.problems} />
			</div>

			<BarChart data={singleSlidesetChartData} xAxisLabel="Folie" slidesetId={slideSet.id} />
		</main>
	)
}
