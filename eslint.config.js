import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
  rules: {
    'no-console': 'off', // CLI 도구이므로 console 사용 허용
    'ts/explicit-function-return-type': 'off',
    'ts/no-explicit-any': 'warn',
  },
})
