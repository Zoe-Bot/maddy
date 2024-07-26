import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	safelist: [
		{
			pattern: /border-{primary|red|green|gray}-{600|700|800}/,
			variants: ['hover', 'focus'],
		},
		{
			pattern: /bg-{primary|red|green|gray}-{600|700|800}/,
			variants: ['hover', 'focus'],
		},
		{
			pattern: /text-{primary|red|green|gray}-{600|700|800}/,
		},
	],
	theme: {
		container: {
			center: true,
			padding: '1rem',
		},
		extend: {
			colors: {
				primary: {
					'50': '#effcfc',
					'100': '#d6f7f7',
					'200': '#b3eeee',
					'300': '#7ee0e2',
					'400': '#43c8cd',
					'500': '#27acb3',
					'600': '#25939f',
					'700': '#23707b',
					'800': '#245c66',
					'900': '#224d57',
					'950': '#12333a',
				},
				red: {
					'50': '#fef2f2',
					'100': '#fde3e3',
					'200': '#fdcbcb',
					'300': '#faa7a7',
					'400': '#f67373',
					'500': '#eb3f3f',
					'600': '#d92929',
					'700': '#b61f1f',
					'800': '#971d1d',
					'900': '#7d1f1f',
					'950': '#440b0b',
				},
			},
		},
	},
	plugins: [
		function ({ addVariant }: { addVariant: (name: string, variant: string) => void }) {
			addVariant('fullscreen', '&:fullscreen')
		},
	],
}
export default config
