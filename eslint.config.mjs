import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['**/build/*', '**/node_modules/*', '**/public/*']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: { '@typescript-eslint/no-explicit-any': 'error' }
  }
]
