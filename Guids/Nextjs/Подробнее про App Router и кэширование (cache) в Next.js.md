### Подробнее про App Router и кэширование (cache) в Next.js

В Next.js 13+ с использованием **App Router** кэширование данных стало более гибким и мощным благодаря интеграции с `fetch` API. В App Router кэширование управляется через параметры `fetch`, такие как `cache` и `next.revalidate`. Это позволяет легко настраивать статическую генерацию (SSG), серверный рендеринг (SSR) и инкрементальную статическую регенерацию (ISR).

---

## **1. Основные параметры кэширования в App Router**

### **a. `cache: 'force-cache'`**

- Используется для **статической генерации (SSG)**.
- Данные кэшируются на этапе сборки и не изменяются до следующей сборки.
- Пример:

    ```jsx
    // app/page.js
    export default async function Home() {
        const res = await fetch('https://api.example.com/data', {
            cache: 'force-cache',
        })
        const data = await res.json()

        return (
            <div>
                <h1>Home Page</h1>
                <p>Data: {data}</p>
            </div>
        )
    }
    ```

### **b. `cache: 'no-store'`**

- Используется для **серверного рендеринга (SSR)**.
- Данные не кэшируются и запрашиваются при каждом запросе.
- Пример:

    ```jsx
    // app/about/page.js
    export default async function About() {
        const res = await fetch('https://api.example.com/data', {
            cache: 'no-store',
        })
        const data = await res.json()

        return (
            <div>
                <h1>About Page</h1>
                <p>Data: {data}</p>
            </div>
        )
    }
    ```

### **c. `next.revalidate`**

- Используется для **инкрементальной статической регенерации (ISR)**.
- Позволяет обновлять статические данные через определенный интервал времени (в секундах).
- Пример:

    ```jsx
    // app/blog/page.js
    export default async function Blog() {
        const res = await fetch('https://api.example.com/posts', {
            next: {revalidate: 60},
        })
        const posts = await res.json()

        return (
            <div>
                <h1>Blog Posts</h1>
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
    ```

    В этом примере данные будут обновляться каждые 60 секунд.

---

## **2. Кэширование на уровне маршрутов**

В App Router кэширование можно настраивать на уровне отдельных маршрутов или страниц. Это позволяет гибко управлять производительностью и актуальностью данных.

### **a. Статическая генерация (SSG)**

- По умолчанию, если используется `fetch` с `cache: 'force-cache'`, страница будет сгенерирована статически.
- Пример:

    ```jsx
    // app/products/page.js
    export default async function Products() {
        const res = await fetch('https://api.example.com/products', {
            cache: 'force-cache',
        })
        const products = await res.json()

        return (
            <div>
                <h1>Products</h1>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
    ```

### **b. Серверный рендеринг (SSR)**

- Если используется `fetch` с `cache: 'no-store'`, страница будет рендериться на сервере при каждом запросе.
- Пример:

    ```jsx
    // app/users/page.js
    export default async function Users() {
        const res = await fetch('https://api.example.com/users', {
            cache: 'no-store',
        })
        const users = await res.json()

        return (
            <div>
                <h1>Users</h1>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
    ```

### **c. Инкрементальная статическая регенерация (ISR)**

- Если используется `fetch` с `next.revalidate`, страница будет статически сгенерирована, но данные будут обновляться через указанный интервал.
- Пример:

    ```jsx
    // app/news/page.js
    export default async function News() {
        const res = await fetch('https://api.example.com/news', {
            next: {revalidate: 120},
        })
        const news = await res.json()

        return (
            <div>
                <h1>News</h1>
                <ul>
                    {news.map(item => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
    ```

    В этом примере данные будут обновляться каждые 120 секунд.

---

## **3. Кэширование на уровне компонентов**

В App Router можно кэшировать данные на уровне отдельных компонентов, что позволяет более точно управлять производительностью.

### **a. Кэширование данных в компоненте**

- Пример:

    ```jsx
    // app/components/FeaturedProducts.js
    export default async function FeaturedProducts() {
        const res = await fetch('https://api.example.com/featured-products', {
            cache: 'force-cache',
        })
        const products = await res.json()

        return (
            <div>
                <h2>Featured Products</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
    ```

### **b. Динамическое кэширование**

- Можно динамически выбирать стратегию кэширования в зависимости от условий.
- Пример:

    ```jsx
    // app/components/ProductList.js
    export default async function ProductList({isFeatured}) {
        const res = await fetch(
            isFeatured
                ? 'https://api.example.com/featured-products'
                : 'https://api.example.com/products',
            {cache: isFeatured ? 'force-cache' : 'no-store'},
        )
        const products = await res.json()

        return (
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        )
    }
    ```

---

## **4. Преимущества кэширования в App Router**

- **Гибкость**: Можно легко переключаться между SSG, SSR и ISR.
- **Производительность**: Кэширование данных уменьшает нагрузку на сервер и ускоряет загрузку страниц.
- **Простота**: Настройка кэширования через параметры `fetch` делает код более читаемым и поддерживаемым.

---

## **5. Когда использовать разные стратегии кэширования?**

- **SSG (`cache: 'force-cache'`)**: Для страниц, которые редко обновляются (например, блоги, каталоги товаров).
- **SSR (`cache: 'no-store'`)**: Для страниц, которые должны отображать актуальные данные при каждом запросе (например, панели управления).
- **ISR (`next.revalidate`)**: Для страниц, которые должны обновляться периодически (например, новости, акции).

---

## **Итог**

App Router в Next.js предоставляет мощные инструменты для управления кэшированием данных. Используя параметры `fetch`, такие как `cache` и `next.revalidate`, вы можете легко настраивать SSG, SSR и ISR, что позволяет создавать высокопроизводительные и масштабируемые приложения.
