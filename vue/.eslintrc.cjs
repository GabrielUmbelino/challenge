/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/base', '@vue/eslint-config-typescript'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts'
        }
      }
    ]
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
