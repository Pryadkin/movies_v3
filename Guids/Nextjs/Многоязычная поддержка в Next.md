Реализация многоязычной поддержки в Next.js с использованием **App Router** (Next.js 13+) требует учета новых возможностей, таких как Server Components, Client Components и Middleware. Мы будем использовать библиотеку `next-intl` для управления переводами и маршрутизацией.

---

## **1. Установка необходимых пакетов**

Для начала установите необходимые пакеты:

```bash
npm install next-intl
```

---

## **2. Настройка структуры проекта**

Создайте структуру проекта для поддержки нескольких языков:

```
my-next-app/
├── app/
│   ├── [locale]/              # Динамический сегмент для локали
│   │   ├── layout.tsx         # Лэйаут для всех страниц
│   │   ├── page.tsx           # Главная страница
│   │   └── about/             # Страница "О нас"
│   │       └── page.tsx
│   └── layout.tsx             # Глобальный лэйаут
├── messages/                  # Файлы с переводами
│   ├── en.json
│   └── ru.json
├── middleware.ts              # Middleware для обработки локали
└── next.config.js             # Конфигурация Next.js
```

---

## **3. Настройка Middleware**

Middleware будет определять локаль пользователя и перенаправлять на соответствующий маршрут.

```javascript
// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
    locales: ['en', 'ru'], // Поддерживаемые локали
    defaultLocale: 'en', // Локаль по умолчанию
})

export const config = {
    matcher: ['/', '/(ru|en)/:path*'], // Применять Middleware только к этим путям
}
```

---

## **4. Настройка глобального лэйаута**

Глобальный лэйаут будет оборачивать все страницы и предоставлять доступ к локали.

```javascript
// app/layout.tsx
import {NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'

export default async function RootLayout({children, params: {locale}}) {
    let messages
    try {
        messages = (await import(`../../messages/${locale}.json`)).default
    } catch (error) {
        notFound()
    }

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                >
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
```

---

## **5. Настройка лэйаута для локали**

Лэйаут для локали будет оборачивать все страницы внутри конкретной локали.

```javascript
// app/[locale]/layout.tsx
export default function LocaleLayout({children}) {
    return <div>{children}</div>
}
```

---

## **6. Создание страниц**

Создайте страницы для каждой локали. Например, главная страница и страница "О нас".

#### **Главная страница:**

```javascript
// app/[locale]/page.tsx
import {useTranslations} from 'next-intl'

export default function Home() {
    const t = useTranslations('Home')

    return (
        <div>
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
        </div>
    )
}
```

#### **Страница "О нас":**

```javascript
// app/[locale]/about/page.tsx
import {useTranslations} from 'next-intl'

export default function About() {
    const t = useTranslations('About')

    return (
        <div>
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
        </div>
    )
}
```

---

## **7. Создание файлов с переводами**

Создайте файлы с переводами для каждой локали.

#### **Файл `messages/en.json`:**

```json
{
    "Home": {
        "title": "Welcome to the Home Page",
        "description": "This is the home page in English."
    },
    "About": {
        "title": "About Us",
        "description": "This is the about page in English."
    }
}
```

#### **Файл `messages/ru.json`:**

```json
{
    "Home": {
        "title": "Добро пожаловать на главную страницу",
        "description": "Это главная страница на русском."
    },
    "About": {
        "title": "О нас",
        "description": "Это страница о нас на русском."
    }
}
```

---

## **8. Настройка переключения языка**

Добавьте возможность переключения языка на странице.

```javascript
// app/[locale]/layout.tsx
import {useTranslations} from 'next-intl'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

export default function LocaleLayout({children, params: {locale}}) {
    const router = useRouter()
    const t = useTranslations('Common')

    const changeLocale = newLocale => {
        router.push(`/${newLocale}`)
    }

    return (
        <div>
            <nav>
                <Link href="/">{t('home')}</Link>
                <Link href="/about">{t('about')}</Link>
                <button onClick={() => changeLocale('en')}>English</button>
                <button onClick={() => changeLocale('ru')}>Русский</button>
            </nav>
            {children}
        </div>
    )
}
```

---

## **9. Настройка `next.config.js`**

Настройте `next.config.js` для поддержки интернационализации.

```javascript
// next.config.js
const withNextIntl = require('next-intl/plugin')()

module.exports = withNextIntl({
    // Другие настройки Next.js
})
```

---

## **10. Пример использования**

Теперь ваше приложение поддерживает несколько языков. Например:

- **Английский:** `/en` и `/en/about`
- **Русский:** `/ru` и `/ru/about`

---

## **Итог:**

1. **Middleware:** Определяет локаль пользователя и перенаправляет на соответствующий маршрут.
2. **Глобальный лэйаут:** Оборачивает все страницы и предоставляет доступ к локали.
3. **Лэйаут для локали:** Оборачивает все страницы внутри конкретной локали.
4. **Страницы:** Используют `useTranslations` для получения переводов.
5. **Файлы с переводами:** Хранят переводы для каждой локали.
6. **Переключение языка:** Позволяет пользователю выбирать язык.

Такой подход обеспечивает гибкую и масштабируемую поддержку многоязычности в Next.js с использованием App Router.
