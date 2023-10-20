module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.js'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "prettier/prettier": ["error", { "endOfLine": "auto", "indent": 'off' }],
    'linebreak-style': ["error", "windows"],
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "no-console": "warn",
    "new-cap": "off",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "max-len": ["error", { "code": 80, "ignoreStrings": true }],
    'camelcase': ['warn', { "properties": "always" }],
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],

  },
}
