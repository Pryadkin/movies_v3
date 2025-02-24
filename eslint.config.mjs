import {FlatCompat} from '@eslint/eslintrc'
import {dirname} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    // Подключаем конфигурации Next.js
    ...compat.extends('next/core-web-vitals', 'next/typescript'),

    // Подключаем Prettier
    ...compat.extends('plugin:prettier/recommended'),

    // Дополнительные правила для TypeScript
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },

    // Дополнительные правила для React
    {
        files: ['**/*.jsx', '**/*.tsx'],
        rules: {
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react/react-in-jsx-scope': 'off',
        },
    },

    // Общие правила для всех файлов
    {
        rules: {
            'no-console': 'warn',
            'no-unused-vars': 'warn',
            'no-undef': 'error',
        },
    },
]

export default eslintConfig
