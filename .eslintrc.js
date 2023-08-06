module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      ts: true,
    },
    sourceType: "module",
    // project: ["./tsconfig.json"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    tsconfigRootDir: __dirname,
    root: true,
  },
  plugins: ["@typescript-eslint", "jest", "import"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "no-undef": "off",
    "import/extensions": ["warn", "never"],
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
  },
};
