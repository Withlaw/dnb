module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // "react-app",
    "eslint:recommended",
    // "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "*.config.*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
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
    // var 키워드 사용 금지
    "no-var": "error",
    // 사용하지 않은 변수 금지
    "no-unused-vars": "warn",
    // 여러 줄 공백 금지
    "no-multiple-empty-lines": "error",
    // 동등 연산자 금지 -> 일치 연산자 사용
    eqeqeq: "error",
    // 콘솔 로그 경고
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
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
