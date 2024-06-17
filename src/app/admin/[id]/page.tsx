import { StarIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Rating } from '@mui/material'
import { notFound } from 'next/navigation'
import SinglePagePdfRender from '../../../components/layout/SinglePagePdfRender'
import { getNothingUnderstoodFeedbacksPerSlidesetAndPage, getQuestionFeedbacksPerSlidesetAndPage } from '../../../services/feedback'
import { getRatingPerSlidesetAndPage } from '../../../services/rating'
import { getSlideSet } from '../../../services/slideSet'

type Params = { params: { id: string }; searchParams: { page: string } }

export default async function SingleSlide({ params, searchParams }: Params) {
	const slidesetId = parseInt(params.id)
	const page = parseInt(searchParams.page)

	const slideSet = await getSlideSet(slidesetId)

	const isButtonGroupPage = page % 2 === 0
	let totalQuestions = 0
	let totalNothingUnderstood = 0
	let stars = {
		one: 0,
		two: 0,
		three: 0,
		four: 0,
		five: 0,
	}

	if (!slideSet) {
		return notFound()
	}

	if (isButtonGroupPage) {
		totalQuestions = await getQuestionFeedbacksPerSlidesetAndPage({ slidesetId, page })
		totalNothingUnderstood = await getNothingUnderstoodFeedbacksPerSlidesetAndPage({ slidesetId, page })
	} else {
		stars = await getRatingPerSlidesetAndPage({
			slidesetId,
			page,
		})
	}

	return (
		<SinglePagePdfRender pdfUrl={slideSet.pdfUrl} isAdmin>
			<h1 className="font-bold text-xl md:text-2xl mt-5 xl:mt-10">{slideSet?.name}</h1>
			<p className="text-gray-500 mb-4 xl:mb-10">{slideSet.uploadDate.toLocaleDateString()}</p>

			{isButtonGroupPage ? (
				<div className="space-y-4">
					<div className="flex flex-col items-center gap-1 bg-primary-600 bg-opacity-10 py-6">
						<div className="flex items-center justify-center bg-primary-600 text-white text-4xl rounded-full w-16 h-16 mb-2">?</div>
						<p className="font-bold text-4xl">{totalQuestions}</p>
						<p className="font-bold text-lg">{totalQuestions === 1 ? 'Student' : 'Studenten'}</p>
						<p className="text-gray-500">{totalQuestions === 1 ? 'hat' : 'haben'} eine Frage</p>
					</div>

					<div className="flex flex-col items-center gap-1 bg-red-600 bg-opacity-10 py-6">
						<div className="flex items-center justify-center bg-red-600 text-white text-4xl rounded-full w-16 h-16 mb-2">
							<XMarkIcon className="w-8 h-8" />
						</div>
						<p className="font-bold text-4xl">{totalNothingUnderstood}</p>
						<p className="font-bold text-lg">{totalNothingUnderstood === 1 ? 'Student' : 'Studenten'}</p>
						<p className="text-gray-500">{totalNothingUnderstood === 1 ? 'versteht' : 'verstehen'} ganze Folie nicht</p>
					</div>
				</div>
			) : (
				<div className="space-y-4">
					{Array.from({ length: 5 }, (_, i) => i + 1).map((value) => {
						const ratingCount = Object.values(stars)[value - 1]
						return (
							<div key={value} className={`flex items-center ${ratingCount === 0 ? 'opacity-30' : ''}`}>
								<Rating value={value} readOnly icon={<StarIcon className="w-7 h-7 mr-1" />} emptyIcon={<StarIcon className="opacity-50 w-7 h-7 mr-1" />} />
								<p className="ml-3">
									<span className="font-bold mr-2">{ratingCount}</span>
									{ratingCount === 1 ? 'Student' : 'Studenten'}
								</p>
							</div>
						)
					})}
				</div>
			)}
		</SinglePagePdfRender>
	)
}
