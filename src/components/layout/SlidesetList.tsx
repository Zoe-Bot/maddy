import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { routes } from '../../services/routes'
import { getSlideSets } from '../../services/slideSet'
import { Chip } from '../ui/Chip'
import { SlideSetListMenu } from '../ui/SlideSetListMenu'

type Props = {
	isAdmin?: boolean
}

export const SlideSetList: React.FC<Props> = async ({ isAdmin }) => {
	const slideSets = await getSlideSets()

	return (
		<>
			<div className="space-y-6 mb-8 md:mb-10">
				{slideSets.map((slideSet) => (
					<div className="flex flex-row items-center justify-between" key={slideSet.id}>
						<Link className="flex items-center justify-between w-full" href={isAdmin ? routes.admin.slideDecks.single(slideSet.id) : routes.slideDecks.single(slideSet.id)}>
							<div>
								<h2 className="text-primary-600 text-lg md:text-xl font-bold">{slideSet.name}</h2>
								<p className="text-gray-800 mb-1">{slideSet.description}</p>
								<p className="text-gray-400 text-sm">{slideSet.uploadDate.toLocaleDateString()}</p>
							</div>

							<div className="flex items-center gap-2 min-w-fit">
								<Chip color="primary">8 ?</Chip>
								<Chip color="red">10 x</Chip>

								{!isAdmin && <ChevronRightIcon className="w-8 h-8 text-gray-400 ml-5" />}
							</div>
						</Link>

						{isAdmin && <SlideSetListMenu />}
					</div>
				))}
			</div>

			<div className="text-center">
				<p>
					Das sind <span className="font-bold">{slideSets.length} Folien</span> mit ingesamt <Chip color="primary">8 ?</Chip> Fragen und <Chip color="red">10 x</Chip> nicht verstanden.
				</p>
			</div>
		</>
	)
}
