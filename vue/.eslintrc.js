module.exports = {
  root: true,
  env: {
    browser: true,
    'es6': true,
    'node': true
  },
  plugins: [
    'vue'
  ],
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    'parser': 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
