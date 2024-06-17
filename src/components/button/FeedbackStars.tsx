'use client'
import { StarIcon } from '@heroicons/react/20/solid'
import Rating from '@mui/material/Rating'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { createOrUpdateRating, deleteRating, getRatingFromUser } from '../../services/rating'
import { getUserId } from '../../services/user'

type Props = {
	slidesetId: number
}

const labels: { [index: string]: string } = {
	1: 'Gar nicht verstanden',
	2: 'Wenig verstanden',
	3: 'Teilweise verstanden',
	4: 'Größtenteils verstanden',
	5: 'Vollständig verstanden',
}

function getLabelText(value: number) {
	return `${value} Stern${value !== 1 ? 'e' : ''}, ${labels[value]}`
}

export const FeedbackStars: React.FC<Props> = ({ slidesetId }) => {
	const searchParams = useSearchParams()
	const page = searchParams.get('page')
	const pageNumber = useMemo(() => (page ? parseInt(page) : 1), [page])
	const userId = getUserId()

	const [value, setValue] = useState<number | null>(null)
	const [hover, setHover] = useState(-1)
	const label = value !== null ? labels[hover !== -1 ? hover : value] : labels[hover]

	useEffect(() => {
		const fetchRating = async () => {
			const feedback = await getRatingFromUser(slidesetId, pageNumber, userId)
			setValue(feedback?.stars || null)
		}

		fetchRating()
	}, [slidesetId, pageNumber, userId])

	const handleChange = async (newValue: number | null) => {
		const feedback = {
			slidesetId,
			page: pageNumber,
			userId,
		}

		if (newValue === null) {
			setValue(null)
			await deleteRating(feedback)
		} else if (value === null || newValue !== value) {
			setValue(newValue)
			await createOrUpdateRating({
				...feedback,
				stars: newValue,
			})
		}
	}

	return (
		<div className="mt-2">
			<Rating
				value={value}
				precision={1}
				getLabelText={getLabelText}
				onChange={(_, newValue) => {
					handleChange(newValue)
				}}
				onChangeActive={(_, newHover) => {
					setHover(newHover)
				}}
				icon={<StarIcon className="w-10 h-10 mr-2" />}
				emptyIcon={<StarIcon className="opacity-50 w-10 h-10 mr-2" />}
			/>
			<div>{label}</div>
		</div>
	)
}
