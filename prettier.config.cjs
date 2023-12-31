/** @type {import('prettier').Config} */
module.exports = {
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

	plugins: [
		'prettier-plugin-tailwindcss',
		'@trivago/prettier-plugin-sort-imports',
	],

	importOrder: ['^@/(.*)$', '^[./]'],
	importOrderSeparation: true,
};
