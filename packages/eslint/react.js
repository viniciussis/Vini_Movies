import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import baseEslint from './base';
import globals from 'globals';

/** @type {import("eslint").ConfigData[]} */
export default [
  ...baseEslint,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
