'use client'
import { BarElement, CategoryScale, ChartData, Chart as ChartJS, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { routes } from '../../services/routes'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
	data: { label: string; nothingUnderstood: number; questions: number }[]
	xAxisLabel: string
	slidesetId: number
}

export const BarChart: React.FC<Props> = ({ data, xAxisLabel, slidesetId }) => {
	const router = useRouter()
	const chartRef = useRef<ChartJS<'bar'>>(null)

	const chartData: ChartData<'bar'> = {
		labels: data.map((item) => item.label),
		datasets: [
			{
				label: 'Fragen',
				data: data.map((item) => item.questions),
				backgroundColor: '#27acb3',
				borderWidth: 0,
			},
			{
				label: 'Nichts verstanden',
				data: data.map((item) => item.nothingUnderstood),
				backgroundColor: '#eb3f3f',
				borderWidth: 0,
			},
		],
	}

	const options: ChartOptions<'bar'> = {
		responsive: true,
		scales: {
			x: {
				title: {
					display: true,
					text: xAxisLabel,
				},
				grid: {
					color: 'rgba(0, 0, 0, 0.05)',
				},
				ticks: {
					color: 'rgba(0, 0, 0, 0.5)',
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Anzahl',
				},
				grid: {
					color: 'rgba(0, 0, 0, 0.05)',
				},
				ticks: {
					color: 'rgba(0, 0, 0, 0.5)',
				},
			},
		},
		onClick: (_, elements) => {
			if (!chartRef.current) return

			if (elements.length > 0) {
				const elementIndex = elements[0].index
				const barLabel = data[elementIndex].label
				router.push(routes.admin.slideDecks.single(slidesetId, Number(barLabel)))
			}
		},
		onHover: (event, elements) => {
			if (!chartRef.current) return

			const target = event.native?.target as HTMLElement
			if (elements.length > 0) {
				target.style.cursor = 'pointer'
			} else {
				target.style.cursor = 'default'
			}
		},
	}

	return (
		<div className="bg-gray-100 p-8">
			<Bar data={chartData} options={options} ref={chartRef} />
		</div>
	)
}
