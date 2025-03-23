### Как работает кэширование в Next.js?

Кэширование в Next.js — это механизм, который позволяет оптимизировать производительность приложения, сохраняя результаты запросов, статически сгенерированные страницы или данные, чтобы избежать повторных вычислений или запросов к серверу. В зависимости от версии Next.js (Page Router или App Router), кэширование может настраиваться по-разному.

---

### **1. Кэширование в Page Router**

В Page Router кэширование в основном управляется через функции, такие как `getStaticProps`, `getServerSideProps`, и параметры, такие как `revalidate` для Incremental Static Regeneration (ISR).

#### **Пример кэширования в Page Router:**

```javascript
// pages/index.js
export async function getStaticProps() {
    // Запрос данных с API
    const res = await fetch('https://api.example.com/data')
    const data = await res.json()

    // Возвращаем данные и настраиваем кэширование с revalidate
    return {
        props: {data},
        revalidate: 60, // Страница будет перегенерирована каждые 60 секунд
    }
}

export default function Home({data}) {
    return (
        <div>
            <h1>Data from API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
```

#### **Как это работает:**

- `getStaticProps` генерирует страницу на этапе сборки (SSG).
- Параметр `revalidate: 60` указывает, что страница будет перегенерирована каждые 60 секунд, если поступают новые запросы.
- Пока страница не перегенерирована, пользователи получают закэшированную версию.

---

### **2. Кэширование в App Router**

В App Router кэширование стало более гибким и управляется через параметры `fetch` и конфигурацию маршрутов. Например, можно использовать параметры `cache` и `next.revalidate` для управления кэшированием данных.

#### **Пример кэширования в App Router:**

```javascript
// app/page.js
export default async function Home() {
    // Запрос данных с API с настройкой кэширования
    const res = await fetch('https://api.example.com/data', {
        next: {revalidate: 60}, // Перегенерировать данные каждые 60 секунд
    })
    const data = await res.json()

    return (
        <div>
            <h1>Data from API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
```

#### **Как это работает:**

- `fetch` с параметром `next: { revalidate: 60 }` указывает, что данные будут кэшированы на 60 секунд.
- После истечения этого времени Next.js автоматически перезапросит данные и обновит кэш.
- Пока данные актуальны, пользователи получают закэшированную версию.

---

### **3. Типы кэширования в App Router**

В App Router кэширование можно разделить на несколько уровней:

#### **a. Кэширование данных (Data Cache)**

- Управляется через параметры `fetch`.
- Пример:
    ```javascript
    const res = await fetch('https://api.example.com/data', {
        cache: 'force-cache', // Использовать кэш (по умолчанию)
        next: {revalidate: 60}, // Перегенерировать данные каждые 60 секунд
    })
    ```

#### **b. Кэширование полного маршрута (Full Route Cache)**

- Страницы, сгенерированные статически (SSG), кэшируются на уровне маршрута.
- Пример:
    ```javascript
    export const revalidate = 60 // Перегенерировать страницу каждые 60 секунд
    ```

#### **c. Кэширование на уровне клиента (Client-Side Cache)**

- Используется для кэширования данных на стороне клиента, например, через `localStorage` или `sessionStorage`.
- Пример:
    ```javascript
    useEffect(() => {
        const cachedData = localStorage.getItem('myData')
        if (cachedData) {
            setData(JSON.parse(cachedData))
        } else {
            fetchData().then(data => {
                localStorage.setItem('myData', JSON.stringify(data))
                setData(data)
            })
        }
    }, [])
    ```

---

### **4. Отключение кэширования**

Иногда кэширование нужно отключить, например, для данных, которые должны быть всегда актуальными.

#### **Пример отключения кэширования в App Router:**

```javascript
const res = await fetch('https://api.example.com/data', {
    cache: 'no-store', // Не кэшировать данные
})
```

---

### **5. Примеры для Page Router и App Router**

#### **Page Router:**

```javascript
// pages/index.js
export async function getStaticProps() {
    const res = await fetch('https://api.example.com/data')
    const data = await res.json()
    return {
        props: {data},
        revalidate: 60, // Перегенерировать страницу каждые 60 секунд
    }
}

export default function Home({data}) {
    return (
        <div>
            <h1>Data from API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
```

#### **App Router:**

```javascript
// app/page.js
export default async function Home() {
    const res = await fetch('https://api.example.com/data', {
        next: {revalidate: 60}, // Перегенерировать данные каждые 60 секунд
    })
    const data = await res.json()

    return (
        <div>
            <h1>Data from API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
```

---

### **Итог:**

- В **Page Router** кэширование управляется через `getStaticProps`, `getServerSideProps` и параметр `revalidate`.
- В **App Router** кэширование стало более гибким и управляется через параметры `fetch` (например, `cache` и `next.revalidate`).
- Кэширование помогает улучшить производительность, уменьшая количество запросов к серверу и ускоряя загрузку страниц.
