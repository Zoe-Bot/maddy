import { StatisticCardHighest } from '../../../components/cards/StatisticsCardHighest'
import { BarChart } from '../../../components/charts/BarChart'

export default async function Statistics() {
	const highestStats = {
		questions: {
			slideset: {
				id: 1,
				name: 'Foliensatz 1',
			},
			totalQuestions: 0,
			totalNothingUnderstood: 0,
		},
		nothingUnderstood: {
			slideset: {
				id: 2,
				name: 'Foliensatz 2',
			},
			totalQuestions: 0,
			totalNothingUnderstood: 0,
		},
		problems: {
			slideset: {
				id: 3,
				name: 'Foliensatz 3',
			},
			totalQuestions: 0,
			totalNothingUnderstood: 0,
		},
	}

	const slidesetChartData = [
		{ label: '1', questions: 0, nothingUnderstood: 0 },
		{
			label: '2',
			questions: 0,
			nothingUnderstood: 0,
		},
		{ label: '3', questions: 0, nothingUnderstood: 0 },
	]

	return (
		<main className="container py-6">
			<h1 className="font-bold text-xl md:text-2xl mb-2 md:mb-4">Statistiken</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
				<StatisticCardHighest
					headline="Meiste Fragen"
					totalQuestions={highestStats.questions.totalQuestions}
					totalNothingUnderstood={highestStats.questions.totalNothingUnderstood}
					slideset={highestStats.questions.slideset}
				/>
				<StatisticCardHighest
					headline="Meiste Komplett Erklären"
					totalQuestions={highestStats.nothingUnderstood.totalQuestions}
					totalNothingUnderstood={highestStats.nothingUnderstood.totalNothingUnderstood}
					slideset={highestStats.nothingUnderstood.slideset}
				/>
				<StatisticCardHighest
					headline="Meiste Probleme"
					totalQuestions={highestStats.problems.totalQuestions}
					totalNothingUnderstood={highestStats.problems.totalNothingUnderstood}
					slideset={highestStats.problems.slideset}
				/>
			</div>

			<BarChart data={slidesetChartData} xAxisLabel="Foliensatz" />
		</main>
	)
}
