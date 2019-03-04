module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  parser: "babel-eslint",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "indent": [2, 4],
    "max-len": [1, 250],
    "react/jsx-indent-props": [1, 4],
    "react/jsx-indent": [1, 4],
    "react/prop-types": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "no-return-assign": 0,
    "linebreak-style": 0,
    "import/prefer-default-export": ["off"],
    "react/jsx-filename-extension": [1, { "extensions": [".jsx"] }],
    "react/forbid-prop-types": 0,
    "jsx-a11y/label-has-for": [2, { "allowChildren": true }],
    "react/prefer-stateless-function": [2, { "ignorePureComponents": true }]
  },
};
