module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // 'react-app',
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    // "plugin:import/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  rules: {
    // // 상대 경로 사용 제한
    // "no-restricted-imports": [
    //   "error",
    //   {
    //     patterns: [".*"],
    //   },
    // ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // 라이브러리 패키지 구문을 제외하고는 확장자 사용
    "import/extensions": ["error", "ignorePackages"],
  },
  settings: {
    // "import/parsers": {
    //   "@typescript-eslint/parser": [".ts", ".tsx"],
    // },
    "import/resolver": {
      typescript: {
        // "alwaysTryTypes": true,
        project: "./tsconfig.json",
      },
    },
  },
};
