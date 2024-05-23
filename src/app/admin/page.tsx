import { AdminSlideSetOverviewHeader } from '../../components/layout/header/AdminSlideSetOverviewHeader'
import { SlideSetList } from '../../components/layout/SlidesetList'

// Used that the page updates when a slide set is added
export const revalidate = 0
export default function SlideOverview() {
	return (
		<main className="container py-6">
			<AdminSlideSetOverviewHeader />

			<SlideSetList isAdmin />
		</main>
	)
}
