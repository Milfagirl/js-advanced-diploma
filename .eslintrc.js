module.exports = {
  extends: 'airbnb-base',
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  rules: {
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
    'import/prefer-default-export': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
    ],
    'no-plusplus': 'off',
    'no-console': 'off',
  },
};
