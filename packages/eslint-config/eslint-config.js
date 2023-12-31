module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: [
    'node_modules/',
    '**/node_modules/',
    '/**/node_modules/*',
    'out/',
    'dist/',
    'build/',
  ],
  rules: {
    // eslint
    'no-empty': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-unsafe-optional-chaining': 'warn',
    'no-useless-catch': 'warn',
    'no-useless-escape': 'warn',
    'object-shorthand': ['warn', 'always'],
    'prefer-const': 'warn',

    // typescript
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',

    // monaco-graphql/monaco-editor
    // https://github.com/graphql/graphiql/tree/main/packages/monaco-graphql#avoid-bundle-all-monaco-editors-languages
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        name: 'monaco-editor/esm/vs/editor/editor.api',
        message:
          '`monaco-editor` imports all languages; use `monaco-graphql/esm/monaco-editor` instead to import only `json` and `graphql` languages',
      },
    ],
  },
};
