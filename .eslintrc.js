module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    browser: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'simple-import-sort/imports': 'error',
  },
  overrides: [
    {
      files: ['*.vue'],
      extends: [
        'plugin:vue/recommended',
        'eslint:recommended',
        'prettier/vue',
        'plugin:prettier/recommended',
      ],
      plugins: [],
      parserOptions: {
        parser: 'babel-eslint',
      },
      rules: {
        'vue/no-v-html': 'off',
        'vue/v-slot-style': 'error',
        'vue/valid-v-slot': 'off',
      },
    },
  ],
};
