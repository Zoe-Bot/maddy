import { HeartIcon } from '@heroicons/react/20/solid'

export const Footer: React.FC = () => {
	return (
		<div className="border-t-8 border-primary-600 py-4 mt-auto">
			<footer className="container text-center">
				<p>
					&copy; {new Date().getFullYear()} Maddy. Designed und Entwickelt mit <HeartIcon className="text-primary-500 inline w-5 h-5" /> von Joy.
				</p>
			</footer>
		</div>
	)
}
