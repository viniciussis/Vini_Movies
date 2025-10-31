import tsEslint from '@jungle-tasks/eslint-config/typescript';

export default [
  ...tsEslint,
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
  },
];
