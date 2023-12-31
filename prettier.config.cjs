/** @type {import('prettier').Config} */
module.exports = {
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],
	printWidth: 80,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: true,
	jsxBracketSameLine: true,
	arrowParens: 'avoid',
	endOfLine: 'auto',
	importOrder: ['^@/(.*)$', '^[./]'],
	importOrderSeparation: true,
};
