import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsconfig from '@typescript-eslint/parser';
import baseEslint from './base';
import globals from 'globals';

/** @type {import("eslint").ConfigData[]} */
export default [
  ...baseEslint,
  {
    files: ['**/*'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsconfig,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          legacyDecorators: true,
        },
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-process-exit': 'off',
    },
  },
];
