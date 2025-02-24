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

    // Дополнительные правила для TypeScript
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn', // Предупреждение при неиспользуемых переменных
            '@typescript-eslint/no-explicit-any': 'warn', // Предупреждение при использовании `any`
        },
    },

    // Дополнительные правила для React
    {
        files: ['**/*.jsx', '**/*.tsx'],
        rules: {
            'react/jsx-uses-react': 'error', // Обнаружение использования React
            'react/jsx-uses-vars': 'error', // Обнаружение неиспользуемых переменных в JSX
            'react/react-in-jsx-scope': 'off', // Не требуется в React 17+
        },
    },

    // Общие правила для всех файлов
    {
        rules: {
            'no-console': 'warn', // Предупреждение при использовании console.log
            'no-unused-vars': 'warn', // Предупреждение при неиспользуемых переменных
            'no-undef': 'error', // Ошибка при использовании необъявленных переменных
        },
    },
]

export default eslintConfig
