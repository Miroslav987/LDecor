/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly', // Пример глобальной переменной
        document: 'readonly',
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'redux-saga': require('eslint-plugin-redux-saga'),
    },
    rules: {
      // Стандартные правила из eslint:recommended
      'no-unused-vars': ['warn'],
      'no-console': 'warn',
      'eqeqeq': 'warn',
      'curly': 'warn',
      'indent': ['warn', 2],
      'semi': ['warn', 'always'],
      // Правила для React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      // Правила для @typescript-eslint
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Правила для react-hooks
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      // Правила для redux-saga
      'redux-saga/yield-effects': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
