export const routes = {
	slideDecks: {
		overview: '/',
		single: (id: number) => `/${id}`,
		statistics: (id: string) => `/${id}/statistics`,
	},
	admin: {
		slideDecks: {
			overview: '/',
			single: (id: string) => `/${id}`,
			statistics: (id: string) => `/${id}/statistics`,
		},
		statistics: '/admin/statistics',
	},
	login: '/login',
}
