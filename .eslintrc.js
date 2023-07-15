module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // 'plugin:vue/base',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  "plugins": [
    "vue"
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    eqeqeq: 'off',
    'no-mixed-operators': 'off'
  },
  globals: {
    dd: 'readonly'
  }
}
