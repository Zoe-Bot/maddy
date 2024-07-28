type Props = {
	value: number
	icon: React.ReactNode
	color: string
	description: string
}

export const StatisticCardLecturer: React.FC<Props> = ({ value, icon, color, description }) => {
	return (
		<div className={`flex items-center bg-${color}-600 bg-opacity-10 p-6 gap-4`}>
			<div className={`flex items-center justify-center bg-${color}-600 text-white text-4xl rounded-full size-14 mb-2`}>{icon}</div>
			<div>
				<p>
					<span className="font-bold text-4xl mr-2">{value}</span>
					<span className="font-bold text-lg">{value === 1 ? 'Student' : 'Studenten'}</span>
				</p>
				<p className="text-gray-500">{description}</p>
			</div>
		</div>
	)
}
