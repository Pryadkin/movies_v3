Организация структуры проекта в Next.js с использованием **FSD (Feature-Sliced Design)** — это мощный подход, который помогает создавать масштабируемые и поддерживаемые приложения. FSD разделяет проект на слои и фичи, что делает код более модульным и понятным. Давайте разберем, как можно организовать проект в Next.js с использованием FSD, с примерами.

---

## **1. Основные принципы FSD**

FSD разделяет проект на несколько слоев:

1. **App**: Входная точка приложения (например, настройка роутинга, провайдеров).
2. **Pages**: Страницы приложения.
3. **Features**: Функциональные модули (например, аутентификация, профиль пользователя).
4. **Entities**: Бизнес-сущности (например, пользователь, продукт).
5. **Shared**: Общие компоненты, утилиты, стили.

---

## **2. Структура проекта с FSD**

Пример структуры проекта в Next.js с использованием FSD:

```
my-next-app/
├── app/                      # App Router (Next.js 13+)
│   ├── layout.tsx            # Глобальный лэйаут
│   ├── page.tsx              # Главная страница
│   ├── (auth)/               # Группа страниц для аутентификации
│   │   ├── login/            # Страница входа
│   │   │   └── page.tsx
│   │   └── register/         # Страница регистрации
│   │       └── page.tsx
│   └── dashboard/            # Страница dashboard
│       └── page.tsx
├── features/                 # Функциональные модули
│   ├── auth/                 # Модуль аутентификации
│   │   ├── model/            # Логика (например, стейт, API-запросы)
│   │   ├── ui/               # UI-компоненты (например, форма входа)
│   │   └── lib/              # Вспомогательные функции
│   └── profile/              # Модуль профиля пользователя
│       ├── model/
│       ├── ui/
│       └── lib/
├── entities/                 # Бизнес-сущности
│   ├── user/                 # Сущность "Пользователь"
│   │   ├── model/
│   │   ├── ui/
│   │   └── lib/
│   └── product/              # Сущность "Продукт"
│       ├── model/
│       ├── ui/
│       └── lib/
├── shared/                   # Общие ресурсы
│   ├── ui/                   # Общие UI-компоненты (например, кнопки, карточки)
│   ├── lib/                  # Общие утилиты (например, форматирование дат)
│   ├── api/                  # Общие API-запросы
│   └── config/               # Конфигурации (например, константы, настройки)
├── public/                   # Статические файлы (изображения, шрифты)
└── styles/                   # Глобальные стили
    └── globals.css           # Глобальные CSS-стили
```

---

## **3. Подробное описание слоев**

### **1. App**

Этот слой отвечает за настройку приложения, например, роутинг, провайдеры (Redux, Context), глобальные стили.

#### **Пример `app/layout.tsx`:**

```tsx
// app/layout.tsx
import {Providers} from '../shared/providers'
// Провайдеры (например, Redux, Theme)
import '../styles/globals.css'

// Глобальные стили

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
```

---

### **2. Pages**

Этот слой содержит страницы приложения. Каждая страница может использовать фичи и сущности.

#### **Пример `app/page.tsx`:**

```tsx
// app/page.tsx
import {AuthForm} from '@/features/auth/ui/AuthForm'

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <AuthForm />
        </div>
    )
}
```

---

### **3. Features**

Этот слой содержит функциональные модули, такие как аутентификация, профиль пользователя и т.д. Каждый модуль разделен на:

- **model**: Логика (стейт, API-запросы).
- **ui**: UI-компоненты.
- **lib**: Вспомогательные функции.

#### **Пример структуры модуля аутентификации:**

```
features/
└── auth/
    ├── model/
    │   ├── authSlice.ts      # Стейт аутентификации (например, Redux slice)
    │   └── authApi.ts        # API-запросы для аутентификации
    ├── ui/
    │   ├── AuthForm.tsx      # Форма входа/регистрации
    │   └── AuthButton.tsx    # Кнопка для аутентификации
    └── lib/
        └── authUtils.ts      # Вспомогательные функции (например, валидация)
```

#### **Пример `features/auth/ui/AuthForm.tsx`:**

```tsx
// features/auth/ui/AuthForm.tsx
import {useState} from 'react'

import {login} from '../model/authApi'

export function AuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        await login({email, password})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    )
}
```

---

### **4. Entities**

Этот слой содержит бизнес-сущности, такие как пользователь, продукт и т.д. Каждая сущность разделена на:

- **model**: Логика (стейт, API-запросы).
- **ui**: UI-компоненты.
- **lib**: Вспомогательные функции.

#### **Пример структуры сущности "Пользователь":**

```
entities/
└── user/
    ├── model/
    │   ├── userSlice.ts      # Стейт пользователя (например, Redux slice)
    │   └── userApi.ts        # API-запросы для пользователя
    ├── ui/
    │   ├── UserProfile.tsx   # Профиль пользователя
    │   └── UserCard.tsx      # Карточка пользователя
    └── lib/
        └── userUtils.ts      # Вспомогательные функции (например, форматирование имени)
```

---

### **5. Shared**

Этот слой содержит общие ресурсы, такие как UI-компоненты, утилиты, API-запросы и конфигурации.

#### **Пример структуры `shared`:**

```
shared/
├── ui/
│   ├── Button.tsx            # Общая кнопка
│   └── Card.tsx              # Общая карточка
├── lib/
│   ├── dateUtils.ts          # Утилиты для работы с датами
│   └── stringUtils.ts        # Утилиты для работы со строками
├── api/
│   └── baseApi.ts            # Базовый API-клиент
└── config/
    └── constants.ts          # Константы (например, API-URL)
```

#### **Пример `shared/ui/Button.tsx`:**

```tsx
// shared/ui/Button.tsx
import React from 'react'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
}

export function Button({children, onClick}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                backgroundColor: 'blue',
                color: 'white',
            }}
        >
            {children}
        </button>
    )
}
```

---

## **4. Преимущества FSD**

1. **Модульность:** Каждая фича и сущность изолирована, что упрощает поддержку и тестирование.
2. **Масштабируемость:** Новые фичи и сущности можно легко добавлять, не нарушая существующую структуру.
3. **Понятность:** Код организован логично, что упрощает его понимание для новых разработчиков.

---

## **5. Пример использования FSD в Next.js**

### **Сценарий: Аутентификация**

1. **App Layer:** Настройка провайдеров (например, Redux) в `app/layout.tsx`.
2. **Pages Layer:** Страница входа (`app/(auth)/login/page.tsx`).
3. **Features Layer:** Модуль аутентификации (`features/auth`).
4. **Entities Layer:** Сущность "Пользователь" (`entities/user`).
5. **Shared Layer:** Общие компоненты (например, кнопка в `shared/ui/Button.tsx`).

---

## **Итог:**

FSD — это мощный подход для организации проектов в Next.js. Он помогает создавать масштабируемые и поддерживаемые приложения, разделяя код на логические слои и модули. Используйте FSD, если ваш проект требует четкой структуры и планируется к масштабированию.
