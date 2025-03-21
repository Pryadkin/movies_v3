module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true, // Добавляем поддержку Jest
    },
    extends: [
        'next', // Подключаем конфигурацию Next.js
        'next/core-web-vitals', // Подключаем конфигурацию для Core Web Vitals
        'plugin:@typescript-eslint/recommended', // Подключаем рекомендации для TypeScript
        'plugin:prettier/recommended', // Подключаем Prettier
    ],
    parser: '@typescript-eslint/parser', // Используем парсер TypeScript
    parserOptions: {
        ecmaFeatures: {
            jsx: true, // Включаем поддержку JSX
        },
        ecmaVersion: 'latest', // Используем последнюю версию ECMAScript
        sourceType: 'module', // Используем модули
    },
    plugins: ['@typescript-eslint', 'react'], // Подключаем плагины
    rules: {
        // Общие правила
        'no-console': 'warn', // Предупреждение при использовании console.log
        'no-unused-vars': 'warn', // Предупреждение при неиспользуемых переменных
        'no-undef': 'error', // Ошибка при использовании необъявленных переменных

        // Правила для TypeScript
        '@typescript-eslint/no-unused-vars': 'warn', // Предупреждение при неиспользуемых переменных в TypeScript
        '@typescript-eslint/no-explicit-any': 'warn', // Предупреждение при использовании any

        // Правила для React
        'react/jsx-uses-react': 'error', // Ошибка, если React не используется в JSX
        'react/jsx-uses-vars': 'error', // Ошибка, если переменные JSX не используются
        'react/react-in-jsx-scope': 'off', // Отключаем правило, так как React 17+ не требует импорта React
    },
    overrides: [
        // Переопределения для тестов Jest
        {
            files: [
                '**/*.test.ts',
                '**/*.test.tsx',
                '**/*.spec.ts',
                '**/*.spec.tsx',
            ],
            rules: {
                'no-console': 'off', // Отключаем правило для тестов
                '@typescript-eslint/no-unused-vars': 'off', // Отключаем для тестов
                '@typescript-eslint/no-explicit-any': 'off', // Отключаем для тестов
            },
        },
        // Игнорирование файлов .yml
        {
            files: ['**/*.yml'],
            rules: {
                'no-undef': 'off', // Отключаем правило для файлов .yml
            },
        },
    ],
    ignorePatterns: [
        // Игнорируем тестовые файлы
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
    ],
}
