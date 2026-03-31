import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'

import prettier from 'eslint-plugin-prettier'

import globals from 'globals'

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
                ...globals.es2025,
            },
        },
        plugins: { prettier, importPlugin },
        rules: {
            'prettier/prettier': 'error',
            'no-console': 'warn',

            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],

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
            '@typescript-eslint/no-misused-promises': [
                2,
                { checksVoidReturn: { attributes: false } },
            ],
        },
    },
    prettierConfig,
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
