### **Что такое кастомные матчеры?**

Кастомные матчеры (custom matchers) — это дополнительные функции, которые расширяют стандартные возможности тестирования. Они упрощают написание тестов, делая их более читаемыми и выразительными. В контексте `@testing-library/jest-dom`, кастомные матчеры добавляют методы для проверки состояния DOM-элементов.

---

### **Пример кастомных матчеров из `@testing-library/jest-dom`**

Библиотека `@testing-library/jest-dom` предоставляет множество полезных матчеров, таких как:

- **`.toBeInTheDocument()`** — проверяет, что элемент присутствует в DOM.
- **`.toBeVisible()`** — проверяет, что элемент видим на странице.
- **`.toHaveTextContent()`** — проверяет, что элемент содержит определённый текст.
- **`.toHaveClass()`** — проверяет, что элемент имеет определённый CSS-класс.
- **`.toBeDisabled()`** — проверяет, что элемент заблокирован (disabled).
- **`.toHaveValue()`** — проверяет, что элемент (например, input) имеет определённое значение.

---

### **Как работать с кастомными матчерами?**

#### **1. Установка `@testing-library/jest-dom`**

Убедитесь, что библиотека установлена:

```bash
yarn add -D @testing-library/jest-dom
```

#### **2. Настройка Jest**

Создайте файл `jest.setup.ts` (или `jest.setup.js`) и добавьте туда импорт:

```typescript
import '@testing-library/jest-dom'
```

Затем укажите этот файл в конфигурации Jest (в `jest.config.ts` или `jest.config.js`):

```typescript
export default {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
```

#### **3. Пример использования матчеров**

Допустим, у вас есть компонент:

```jsx
function Greeting() {
    return <div data-testid="greeting">Hello, world!</div>
}
```

Напишем тест для этого компонента:

```typescript
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('Проверка текста в компоненте', () => {
  render(<Greeting />);

  // Используем кастомные матчеры
  const greetingElement = screen.getByTestId('greeting');

  // Проверяем, что элемент присутствует в DOM
  expect(greetingElement).toBeInTheDocument();

  // Проверяем, что элемент содержит текст "Hello, world!"
  expect(greetingElement).toHaveTextContent('Hello, world!');

  // Проверяем, что элемент видим
  expect(greetingElement).toBeVisible();
});
```

---

### **Примеры других матчеров**

1. **`.toHaveClass()`**:
   Проверяет, что элемент имеет определённый CSS-класс.

    ```typescript
    expect(element).toHaveClass('active')
    ```

2. **`.toBeDisabled()`**:
   Проверяет, что элемент заблокирован.

    ```typescript
    expect(buttonElement).toBeDisabled()
    ```

3. **`.toHaveValue()`**:
   Проверяет значение элемента (например, input).

    ```typescript
    expect(inputElement).toHaveValue('John Doe')
    ```

4. **`.toBeChecked()`**:
   Проверяет, что чекбокс или радио-кнопка выбраны.

    ```typescript
    expect(checkboxElement).toBeChecked()
    ```

---

### **Преимущества кастомных матчеров**

1. **Улучшенная читаемость**:
   Тесты становятся более понятными и выразительными. Например:

    ```typescript
    expect(element).toBeInTheDocument()
    ```

    читается лучше, чем:

    ```typescript
    expect(document.contains(element)).toBe(true)
    ```

2. **Упрощение тестов**:
   Кастомные матчеры избавляют от необходимости писать сложные проверки вручную.

3. **Единый стиль**:
   Использование матчеров из `@testing-library/jest-dom` делает тесты более согласованными.

---

### **Итог**

Кастомные матчеры из `@testing-library/jest-dom` — это мощный инструмент для тестирования React-компонентов. Они делают тесты более читаемыми, выразительными и простыми в написании. Убедитесь, что вы правильно настроили `jest.setup.ts`, и используйте матчеры для проверки состояния DOM-элементов. 😊
