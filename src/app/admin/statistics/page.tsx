import { StatisticCardHighest } from '../../../components/cards/StatisticsCardHighest'
import { BarChart } from '../../../components/charts/BarChart'
import { getSlideSetsChartData, getSlideSetsHighestStats } from '../../../services/statistics'

export default async function Statistics() {
	const highestStats = await getSlideSetsHighestStats()
	const slidesetChartData = await getSlideSetsChartData()

	return (
		<main className="container py-6">
			<h1 className="font-bold text-xl md:text-2xl mb-2 md:mb-4">Statistiken</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 mb-4">
				<StatisticCardHighest
					headline="Meiste Alles Verstanden"
					totalQuestions={highestStats.everythingUnderstood.totalQuestions}
					totalNothingUnderstood={highestStats.everythingUnderstood.totalNothingUnderstood}
					totalEverythingUnderstood={highestStats.everythingUnderstood.totalEverythingUnderstood}
					slideset={highestStats.everythingUnderstood.slideset}
				/>
				<StatisticCardHighest
					headline="Meiste Fragen"
					totalQuestions={highestStats.questions.totalQuestions}
					totalNothingUnderstood={highestStats.questions.totalNothingUnderstood}
					totalEverythingUnderstood={highestStats.questions.totalEverythingUnderstood}
					slideset={highestStats.questions.slideset}
				/>
				<StatisticCardHighest
					headline="Meiste Komplett Erklären"
					totalQuestions={highestStats.nothingUnderstood.totalQuestions}
					totalNothingUnderstood={highestStats.nothingUnderstood.totalNothingUnderstood}
					totalEverythingUnderstood={highestStats.nothingUnderstood.totalEverythingUnderstood}
					slideset={highestStats.nothingUnderstood.slideset}
				/>
				<StatisticCardHighest
					headline="Meiste Probleme"
					totalQuestions={highestStats.problems.totalQuestions}
					totalNothingUnderstood={highestStats.problems.totalNothingUnderstood}
					totalEverythingUnderstood={highestStats.problems.totalEverythingUnderstood}
					slideset={highestStats.problems.slideset}
				/>
			</div>

			<BarChart data={slidesetChartData} xAxisLabel="Foliensatz" />
		</main>
	)
}
