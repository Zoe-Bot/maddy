export const routes = {
	slideDecks: {
		overview: '/',
		single: (id: number, page?: number) => {
			if (!page) {
				return `/${id}?page=1`
			}

			return `/${id}?page=${page}`
		},
		statistics: (id: number) => `/${id}/statistics`,
	},
	admin: {
		slideDecks: {
			overview: '/',
			single: (id: number, page?: number) => {
				if (!page) {
					return `/admin/${id}?page=1`
				}

				return `/admin/${id}?page=${page}`
			},
			statistics: (id: string) => `/${id}/statistics`,
		},
		statistics: '/admin/statistics',
	},
	login: '/login',
}
