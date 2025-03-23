Оптимизация производительности приложения на Next.js с использованием **App Router** (Next.js 13+) включает в себя множество аспектов, таких как кэширование, ленивая загрузка, оптимизация изображений, использование Server Components и другие техники. Давайте разберем их подробно с примерами.

---

## **1. Использование Server Components**

Server Components позволяют выполнять рендеринг на сервере, что уменьшает объем JavaScript, отправляемого на клиент. Это улучшает производительность и уменьшает время загрузки.

### **Пример:**

```javascript
// app/page.js
export default async function Home() {
    const data = await fetchDataFromAPI() // Данные загружаются на сервере

    return (
        <div>
            <h1>Home Page</h1>
            <p>{data.message}</p>
        </div>
    )
}
```

---

## **2. Ленивая загрузка компонентов**

Ленивая загрузка позволяет загружать компоненты только тогда, когда они нужны. Это уменьшает размер начального бандла.

### **Пример:**

```javascript
// app/lazy-component.js
'use client'

import dynamic from 'next/dynamic'

// app/lazy-component.js

// app/lazy-component.js

const LazyComponent = dynamic(() => import('../components/LazyComponent'), {
    loading: () => <p>Loading...</p>,
})

export default function Page() {
    return (
        <div>
            <h1>Lazy Loaded Component</h1>
            <LazyComponent />
        </div>
    )
}
```

---

## **3. Оптимизация изображений**

Next.js предоставляет встроенный компонент `<Image>`, который автоматически оптимизирует изображения.

### **Пример:**

```javascript
// app/image-page.js
import Image from 'next/image'

export default function ImagePage() {
    return (
        <div>
            <h1>Optimized Image</h1>
            <Image
                src="/example.jpg"
                alt="Example Image"
                width={800}
                height={600}
                priority // Предзагрузка для критических изображений
            />
        </div>
    )
}
```

---

## **4. Кэширование данных**

Кэширование данных уменьшает количество запросов к серверу и ускоряет загрузку страниц.

### **Пример с `fetch` и кэшированием:**

```javascript
// app/cached-page.js
export default async function CachedPage() {
    const data = await fetch('https://api.example.com/data', {
        next: {revalidate: 60}, // Перегенерировать данные каждые 60 секунд
    }).then(res => res.json())

    return (
        <div>
            <h1>Cached Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
```

---

## **5. Использование `React.memo` и `useMemo`**

`React.memo` и `useMemo` помогают избежать лишних ререндеров компонентов.

### **Пример:**

```javascript
// app/memo-component.js
'use client'

import {useMemo} from 'react'

// app/memo-component.js

// app/memo-component.js

export default function MemoComponent({items}) {
    const sortedItems = useMemo(() => {
        return items.sort((a, b) => a.value - b.value)
    }, [items])

    return (
        <div>
            <h1>Memoized Component</h1>
            <ul>
                {sortedItems.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}
```

---

## **6. Использование `next/dynamic` для ленивой загрузки библиотек**

Ленивая загрузка библиотек уменьшает размер начального бандла.

### **Пример:**

```javascript
// app/dynamic-library.js
'use client'

import dynamic from 'next/dynamic'

// app/dynamic-library.js

// app/dynamic-library.js

const HeavyLibrary = dynamic(() => import('heavy-library'), {
    ssr: false, // Отключаем SSR для библиотеки
})

export default function DynamicLibraryPage() {
    return (
        <div>
            <h1>Dynamic Library</h1>
            <HeavyLibrary />
        </div>
    )
}
```

---

## **7. Оптимизация API Routes**

API Routes можно оптимизировать, используя кэширование и минимизируя количество запросов.

### **Пример:**

```javascript
// app/api/optimized-route/route.js
import {NextResponse} from 'next/server'

export async function GET() {
    const data = await fetchDataWithCache() // Используем кэшированные данные
    return NextResponse.json(data)
}
```

---

## **8. Использование `next/font` для оптимизации шрифтов**

`next/font` автоматически оптимизирует шрифты, уменьшая время загрузки.

### **Пример:**

```javascript
// app/font-page.js
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export default function FontPage() {
    return (
        <div className={inter.className}>
            <h1>Optimized Font</h1>
            <p>This text uses an optimized font.</p>
        </div>
    )
}
```

---

## **9. Использование `next/script` для оптимизации скриптов**

`next/script` позволяет управлять загрузкой сторонних скриптов.

### **Пример:**

```javascript
// app/script-page.js
import Script from 'next/script'

export default function ScriptPage() {
    return (
        <div>
            <h1>Optimized Script</h1>
            <Script
                src="https://example.com/script.js"
                strategy="lazyOnload" // Скрипт загружается после загрузки страницы
            />
        </div>
    )
}
```

---

## **10. Использование `next/link` для клиентской навигации**

`next/link` обеспечивает быструю клиентскую навигацию без полной перезагрузки страницы.

### **Пример:**

```javascript
// app/link-page.js
import Link from 'next/link'

export default function LinkPage() {
    return (
        <div>
            <h1>Client-Side Navigation</h1>
            <Link href="/another-page">Go to Another Page</Link>
        </div>
    )
}
```

---

## **11. Использование `next/headers` для управления заголовками**

`next/headers` позволяет управлять HTTP-заголовками, что может улучшить производительность.

### **Пример:**

```javascript
// app/headers-page.js
import {headers} from 'next/headers'

export default function HeadersPage() {
    const headersList = headers()
    const userAgent = headersList.get('user-agent')

    return (
        <div>
            <h1>Headers</h1>
            <p>User Agent: {userAgent}</p>
        </div>
    )
}
```

---

## **12. Использование `next/cache` для кэширования данных**

`next/cache` позволяет кэшировать данные на уровне сервера.

### **Пример:**

```javascript
// app/cached-data-page.js
import {cache} from 'next/cache'

const getCachedData = cache(async () => {
    const data = await fetchDataFromAPI()
    return data
})

export default async function CachedDataPage() {
    const data = await getCachedData()

    return (
        <div>
            <h1>Cached Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
```

---

## **Итог:**

1. **Server Components:** Используйте для рендеринга на сервере.
2. **Ленивая загрузка:** Уменьшайте размер начального бандла.
3. **Оптимизация изображений:** Используйте компонент `<Image>`.
4. **Кэширование данных:** Уменьшайте количество запросов к серверу.
5. **React.memo и useMemo:** Избегайте лишних ререндеров.
6. **next/dynamic:** Лениво загружайте библиотеки.
7. **Оптимизация API Routes:** Используйте кэширование.
8. **next/font:** Оптимизируйте шрифты.
9. **next/script:** Управляйте загрузкой скриптов.
10. **next/link:** Обеспечивайте быструю клиентскую навигацию.
11. **next/headers:** Управляйте HTTP-заголовками.
12. **next/cache:** Кэшируйте данные на уровне сервера.

Эти техники помогут вам значительно улучшить производительность вашего Next.js-приложения.
