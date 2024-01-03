/** @type {import('eslint').Config} */
module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		// "react-app",
		'eslint:recommended',
		// "plugin:@typescript-eslint/recommended",
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.*'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		project: true,
		tsconfigRootDir: __dirname,
	},
	plugins: ['react-refresh', 'import'],
	rules: {
		// // 상대 경로 사용 제한
		// "no-restricted-imports": [
		//   "error",
		//   {
		//     patterns: [".*"],
		//   },
		// ],
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'import/extensions': ['error', 'ignorePackages'],
		'no-var': 'error',
		'no-multiple-empty-lines': 'error',
		eqeqeq: 'error',
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
		'prefer-const': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-unsafe-return': 'warn',
		'@typescript-eslint/no-unsafe-assignment': 'warn',
	},
	settings: {
		// "import/parsers": {
		//   "@typescript-eslint/parser": [".ts", ".tsx"],
		// },
		'import/resolver': {
			typescript: {
				// "alwaysTryTypes": true,
				project: './tsconfig.json',
			},
		},
	},
};
