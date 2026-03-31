import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import noRelativeImport from 'eslint-plugin-no-relative-import-paths'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            prettier,
            importPlugin,
            'unused-imports': unusedImports,
            'simple-import-sort': simpleImportSort,
            'no-relative-import-paths': noRelativeImport,
        },
        rules: {
            'prettier/prettier': 'error',
            'no-console': 'warn',

            'unused-imports/no-unused-imports': 'warn',
            'import/extensions': [
                'warn',
                {
                    js: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                    css: 'always',
                    svg: 'always',
                    webp: 'always',
                },
            ],
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',

            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-empty-object-type': 'warn',
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            '@typescript-eslint/no-restricted-types': [
                'error',
                {
                    types: {
                        FC: 'Не используй FC, это устаревший тип и он бесполезен.',
                        'React.FC': 'Не используй React.FC, это устаревший тип и он бесполезен.',
                    },
                },
            ],
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
        },
    },
    prettierConfig,
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'next-auth.d.ts']),
])

export default eslintConfig
