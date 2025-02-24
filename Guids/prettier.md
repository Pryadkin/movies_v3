# Добавление Prettier в конфигурацию ESLint

Чтобы добавить **Prettier** в конфигурацию ESLint, нужно выполнить несколько шагов. Prettier отвечает за форматирование кода, а ESLint — за его качество. Чтобы они работали вместе без конфликтов, нужно:

1. Установить необходимые пакеты.
2. Настроить ESLint для работы с Prettier.
3. Добавить правила Prettier в конфигурацию ESLint.

---

## 1. Установка зависимостей

Установите Prettier и плагины для интеграции с ESLint:

```bash
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

---

## 2. Добавление Prettier в конфигурацию ESLint

Обновите ваш файл `eslint.config.js`, чтобы включить поддержку Prettier. Вот как это можно сделать:

### Если вы используете `@eslint/eslintrc` (ваш текущий подход):

```javascript
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
```

### Если вы используете полностью ручную конфигурацию (мой подход):

```javascript
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default [
    // Базовая конфигурация для JavaScript
    js.configs.recommended,

    // Конфигурация для TypeScript
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },

    // Конфигурация для React
    {
        files: ['**/*.jsx', '**/*.tsx'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            ...jsxA11yPlugin.configs.recommended.rules,
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },

    // Конфигурация для импортов
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...importPlugin.configs.recommended.rules,
            'import/no-unresolved': 'error',
            'import/named': 'error',
            'import/namespace': 'error',
            'import/default': 'error',
            'import/export': 'error',
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'always',
                },
            ],
        },
    },

    // Подключаем Prettier
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            ...prettierPlugin.configs.recommended.rules,
            'prettier/prettier': 'error', // Ошибка при нарушении правил Prettier
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
```

## 3. Настройка Prettier

Создайте файл `.prettierrc` в корне вашего проекта для настройки правил форматирования. Например:

```javascript
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "arrowParens": "always"
}
```

## 4. Игнорирование файлов для Prettier

Создайте файл `.prettierignore` в корне вашего проекта, чтобы указать файлы и папки, которые Prettier должен игнорировать:

```
node_modules/
.next/
out/
```

---

## 5. Добавление скриптов в `package.json`

Добавьте скрипты для запуска ESLint и Prettier:

```javascript
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write ."
  }
}
```

## 6. Запуск ESLint и Prettier

Теперь вы можете запустить ESLint и Prettier с помощью команд:

```bash
npm run lint  # Проверка кода с ESLint
npm run format  # Форматирование кода с Prettier
```

## Итог

- Вы добавили Prettier в конфигурацию ESLint.
- Настроили правила форматирования в `.prettierrc`.
- Добавили скрипты для удобного запуска ESLint и Prettier.

Теперь ваш код будет не только проверяться на ошибки, но и автоматически форматироваться! 🚀
