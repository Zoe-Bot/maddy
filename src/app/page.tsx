import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Chip } from '../components/ui/Chip'
import { routes } from '../services/routes'
import { getSlideSets } from '../services/slideSet'

export default async function SlidesOverview() {
	const slideSets = await getSlideSets()

	return (
		<main className="container py-6">
			<h1 className="font-bold text-xl md:text-3xl mb-3 md:mb-6">Foliensatzübersicht</h1>

			<div className="space-y-6 mb-8 md:mb-10">
				{slideSets.map((slideSet) => (
					<Link className="flex items-center justify-between" href={routes.slideDecks.single(slideSet.id)} key={slideSet.id}>
						<div>
							<h2 className="text-primary-600 text-lg md:text-xl font-bold">{slideSet.name}</h2>
							<p className="text-gray-800 mb-1">{slideSet.description}</p>
							<p className="text-gray-400 text-sm">{slideSet.uploadDate.toLocaleDateString()}</p>
						</div>

						<div className="flex items-center gap-2 min-w-fit">
							<Chip color="primary">8 ?</Chip>
							<Chip color="red">10 x</Chip>
							<ChevronRightIcon className="w-8 h-8 text-gray-400 ml-5" />
						</div>
					</Link>
				))}
			</div>

			<div className="text-center">
				<p>
					Das sind <span className="font-bold">{slideSets.length} Folien</span> mit ingesamt <Chip color="primary">8 ?</Chip> Fragen und <Chip color="red">10 x</Chip> nicht verstanden.
				</p>
			</div>
		</main>
	)
}
