type Props = {
	headline: string
	symbol: '?' | 'x' | '?x'
	totalCount: number
}

export const StatisticCardSum: React.FC<Props> = ({ headline, symbol, totalCount }) => {
	const isSymbolQuestion = symbol === '?' || symbol === '?x'
	const isSymbolCross = symbol === 'x' || symbol === '?x'
	const isSymbolBoth = symbol === '?x'

	return (
		<div className="bg-gray-100 gap-2 p-6">
			<p className="font-bold text-sm md:text-base mb-1">{headline}</p>
			<div className="flex items-center gap-2">
				{isSymbolQuestion && <span className="text-primary-600 text-opacity-50 text-lg md:text-2xl font-bold">?</span>}
				{isSymbolCross && <span className="text-red-600 text-opacity-50 text-lg md:text-2xl font-bold">x</span>}
				<p className={`font-bold text-${isSymbolBoth ? 'black' : isSymbolQuestion ? 'primary-600' : 'red-600'} text-xl md:text-3xl`}>{totalCount}</p>
			</div>
		</div>
	)
}
