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

    // Правила для тестов Jest
    {
        files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        env: {
            jest: true, // Включаем глобальные переменные Jest (describe, it, expect и т.д.)
        },
        rules: {
            'no-console': 'off', // Отключаем правило для тестов, чтобы можно было использовать console.log
            '@typescript-eslint/no-unused-vars': 'off', // Отключаем для тестов, так как переменные могут быть объявлены, но не использованы
            '@typescript-eslint/no-explicit-any': 'off', // Отключаем для тестов, чтобы можно было использовать `any`
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
    // Игнорирование файлов .yml
    {
        files: ['**/*.yml'],
        excludedFiles: '**/*', // Исключаем все файлы .yml из проверки
    }
]

export default eslintConfig
