import { SlideSetList } from '../components/layout/SlidesetList'

// Used that the page updates when a slide set is added
export const revalidate = 0
export default async function SlidesOverview() {
	return (
		<main className="container py-6">
			<h1 className="font-bold text-xl md:text-3xl mb-3 md:mb-6">Foliensatzübersicht</h1>

			<SlideSetList />
		</main>
	)
}
