```typescript
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
```

### **Зачем нужна команда `yarn lint:types`?**

1. **Проверка типов**:

    - TypeScript проверяет, что типы данных используются корректно. Например, если вы передаёте строку туда, где ожидается число, TypeScript выдаст ошибку.

2. **Раннее обнаружение ошибок**:

    - Ошибки типов могут быть обнаружены на этапе разработки, что позволяет исправить их до запуска кода в production.

3. **Интеграция с CI/CD**:

    - Команда `yarn lint:types` может быть частью pipeline в CI/CD, чтобы гарантировать, что код проходит проверку типов перед деплоем.

4. **Улучшение качества кода**:
    - Проверка типов помогает поддерживать код в чистоте и избегать ошибок, связанных с неправильным использованием типов.

---

### **Как настроить `yarn lint:types`**

1. **Убедитесь, что TypeScript установлен**:
   Если TypeScript ещё не установлен, добавьте его в проект:

    ```bash
    yarn add -D typescript
    ```

2. **Добавьте команду в `package.json`**:
   В разделе `scripts` добавьте команду для проверки типов:

    ```json
    "scripts": {
      "lint:types": "tsc --noEmit"
    }
    ```

    - **`tsc`**: Команда для запуска TypeScript Compiler.
    - **`--noEmit`**: Флаг, который указывает TypeScript проверить типы, но не генерировать файлы (например, `.js`).

3. **Запустите проверку типов**:
   Выполните команду:

    ```bash
    yarn lint:types
    ```

    Если в вашем коде есть ошибки типов, TypeScript выдаст соответствующие сообщения.

---

### **Пример использования**

Предположим, у вас есть следующий код на TypeScript:

```typescript
// example.ts
function add(a: number, b: number): number {
    return a + b
}

add(1, '2') // Ошибка: второй аргумент должен быть числом, а не строкой
```

Если вы запустите `yarn lint:types`, TypeScript выдаст ошибку:

```
example.ts:5:7 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

---

### **Интеграция с ESLint**

Если вы используете ESLint для проверки TypeScript, можно объединить проверку типов и линтинг в одной команде. Например:

```json
"scripts": {
  "lint": "eslint . --ext .ts,.tsx",
  "lint:types": "tsc --noEmit",
  "lint:all": "yarn lint && yarn lint:types"
}
```

- **`lint`**: Запускает ESLint для проверки TypeScript и JavaScript файлов.
- **`lint:types`**: Запускает проверку типов с помощью TypeScript.
- **`lint:all`**: Запускает обе проверки (ESLint и TypeScript).

---
