const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  env: {
    node: true,
    es6: true,
    mocha: true,
  },

  plugin: ['prettier', 'extra-rules'],
  extends: ['airbnb', 'prettier'],
  rules: {
    'array-callback-return': 'error',
    'class-methods-use-this': 'off',
    complexity: ['error', { max: 10 }],
    'extra-rules/no-commented-out-code': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'max-params': ['error', { max: 7 }],
    'max-statements': ['error', { max: 100 }],
    'max-lines': ['error', { max: 1000 }],
    'max-len': 0,
    'no-undef': 'error',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unused-expressions': 0,
    'object-shorthand': ['warn', 'properties'],
    'prettier/prettier': 'error',
  },
};
