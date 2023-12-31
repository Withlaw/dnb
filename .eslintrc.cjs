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
    "import/extensions": ["error", "ignorePackages"],
    "no-var": "error",
    "no-multiple-empty-lines": "error",
    eqeqeq: "error",
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "prefer-const": ["warn"],
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
