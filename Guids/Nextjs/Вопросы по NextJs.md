## **Базовые вопросы**

1. **Что такое Next.js и чем он отличается от React?**

    - Next.js — это фреймворк, построенный на React, который предоставляет встроенную поддержку SSR, SSG, маршрутизации, оптимизации изображений и многого другого.

2. **Какие преимущества Next.js перед обычным React?**

    - SSR, SSG, встроенная маршрутизация, оптимизация изображений, API Routes, поддержка TypeScript "из коробки".

3. **Что такое Server-Side Rendering (SSR) и Static Site Generation (SSG)?**

    - SSR: HTML генерируется на сервере при каждом запросе.
    - SSG: HTML генерируется на этапе сборки.

4. **Как работает маршрутизация в Next.js?**

    - В Page Router маршруты определяются структурой файлов в папке `pages`.
    - В App Router маршруты определяются структурой файлов в папке `app`.

5. **Как создать динамический маршрут в Next.js?**

    - В Page Router: `pages/posts/[id].js`.
    - В App Router: `app/posts/[id]/page.js`.

6. **Что такое `getStaticProps` и `getServerSideProps`?**

    - `getStaticProps`: Используется для SSG, данные загружаются на этапе сборки.
    - `getServerSideProps`: Используется для SSR, данные загружаются при каждом запросе.

7. **Как работает `getStaticPaths`?**

    - Используется для генерации статических путей для динамических маршрутов.

8. **Что такое API Routes в Next.js?**
    - API Routes позволяют создавать API прямо в Next.js. Файлы в `pages/api` становятся конечными точками API.

---

## **Продвинутые вопросы**

1. [**Что такое Incremental Static Regeneration (ISR)?**](./ISR.md)

    - ISR позволяет обновлять статически сгенерированные страницы через определенный интервал времени.

2. [**Как работает кэширование в Next.js?**](./Как%20работает%20кэширование%20в%20Next.js.md)

    - В App Router кэширование управляется через параметры `fetch`, такие как `cache` и `next.revalidate`.

3. [**Что такое `generateStaticParams` в App Router?**](./generateStaticParams.md)

    - Функция, которая заменяет `getStaticPaths` и используется для генерации статических путей для динамических маршрутов.

4. [**Как работает регидрация (Rehydration) в Next.js?**](<./Регидрация%20(Rehydration)%20в%20Next.js.md>)

    - Процесс, при котором React "оживляет" статически сгенерированный HTML, добавляя к нему интерактивность.

5. [**Как избежать ошибок синхронизации данных между сервером и клиентом?**](./Проблемы,%20возникающие%20при%20отсутствии%20синхронизации.md)

    - Использовать единый источник данных, избегать различий в рендеринге, передавать начальное состояние с сервера.

6. [**Что такое Middleware в Next.js?**](./Middleware.md)

    - Middleware позволяет выполнять код перед обработкой запроса, например, для аутентификации или редиректов.

7. [**Как оптимизировать изображения в Next.js?**](./Image.md)

    - Использовать встроенный компонент `<Image>`, который автоматически оптимизирует изображения.

8. **Как работает `next/link` и `next/router`?**

    - `next/link`: Используется для клиентской навигации между страницами.
    - `next/router`: Позволяет программно управлять маршрутизацией.

9. **Как настроить SEO в Next.js?**

    - Использовать компонент `<Head>` для управления мета-тегами.

10. [**Как работает `next/dynamic`?**](<./Dynamic(Lazy).md>)
    - Позволяет лениво загружать компоненты, что полезно для уменьшения размера начального бандла.

---

## **Вопросы по App Router (Next.js 13+)**

1. [**Что такое Server Components и Client Components?**](./Server%20Components%20и%20Client%20Components.md)

    - Server Components: Рендерятся на сервере и не имеют состояния.
    - Client Components: Рендерятся на клиенте и могут использовать состояние и эффекты.

2. **Как загружать данные в Server Components?**

    - Использовать `async/await` напрямую в компоненте.

3. [**Как использовать `generateStaticParams` в App Router?**](./generateStaticParams.md)

    - Функция, которая возвращает массив параметров для генерации статических путей.

4. **Как работает кэширование в App Router?**

    - Через параметры `fetch`, такие как `cache` и `next.revalidate`.

5. **Как настроить инкрементальную статическую регенерацию (ISR) в App Router?**

    - Использовать `fetch` с параметром `next.revalidate`.

---

## **Практические задачи**

### **1. Создайте страницу с SSR, которая загружает данные из API.**

#### **Page Router (с использованием `getServerSideProps`):**

```javascript
// pages/ssr-page.js
export default function SSRPage({data}) {
    return (
        <div>
            <h1>SSR Page</h1>
            <p>Data from API:</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return {props: {data}}
}
```

#### **App Router (с использованием `fetch` с `cache: 'no-store'`):**

```javascript
// app/ssr-page/page.js
export default async function SSRPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'no-store', // Отключаем кэширование для SSR
    })
    const data = await res.json()

    return (
        <div>
            <h1>SSR Page</h1>
            <p>Data from API:</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
```

---

### **2. Создайте страницу с SSG, которая загружает данные из API.**

#### **Page Router (с использованием `getStaticProps`):**

```javascript
// pages/ssg-page.js
export default function SSGPage({data}) {
    return (
        <div>
            <h1>SSG Page</h1>
            <p>Data from API:</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return {props: {data}}
}
```

#### **App Router (с использованием `fetch` с `cache: 'force-cache'`):**

```javascript
// app/ssg-page/page.js
export default async function SSGPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'force-cache', // Используем кэширование для SSG
    })
    const data = await res.json()

    return (
        <div>
            <h1>SSG Page</h1>
            <p>Data from API:</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
```

---

### **3. Создайте динамический маршрут с ISR.**

#### **Page Router (с использованием `getStaticPaths` и `getStaticProps`):**

```javascript
// pages/posts/[id].js
export default function Post({post}) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    const paths = posts.map(post => ({params: {id: post.id.toString()}}))
    return {paths, fallback: 'blocking'}
}

export async function getStaticProps({params}) {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    )
    const post = await res.json()
    return {props: {post}, revalidate: 60} // ISR с интервалом 60 секунд
}
```

#### **App Router (с использованием `generateStaticParams` и `fetch` с `next.revalidate`):**

```javascript
// app/posts/[id]/page.js
export default function Post({ params }) {
  return (
    <div>
      <h1>{params.post.title}</h1>
      <p>{params.post.body}</p>
    </div>
  );
}

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return posts.map((post) => ({ id: post.id.toString() }));
}

export async function getPostData(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 }, // ISR с интервалом 60 секунд
  });
  return res.json();
}

export default async function Post({ params }) {
  const post = await getPostData(params.id);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
```

---

### **4. Оптимизируйте изображения на странице.**

#### **Использование компонента `<Image>`:**

```javascript
// pages/optimized-image.js или app/optimized-image/page.js
import Image from 'next/image'

export default function OptimizedImagePage() {
    return (
        <div>
            <h1>Optimized Image</h1>
            <Image
                src="/example.jpg" // Путь к изображению в папке `public`
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

### **5. Создайте API Route, который возвращает JSON.**

#### **Page Router (в папке `pages/api`):**

```javascript
// pages/api/hello.js
export default function handler(req, res) {
    res.status(200).json({message: 'Hello from API!'})
}
```

#### **App Router (в папке `app/api`):**

```javascript
// app/api/hello/route.js
export async function GET() {
    return new Response(JSON.stringify({message: 'Hello from API!'}), {
        headers: {'Content-Type': 'application/json'},
    })
}
```

---

### **6. Настройте Middleware для редиректа.**

#### **Пример Middleware для редиректа:**

```javascript
// middleware.js
import {NextResponse} from 'next/server'

export function middleware(request) {
    const url = request.nextUrl.clone()

    // Редирект с `/old-page` на `/new-page`
    if (url.pathname === '/old-page') {
        url.pathname = '/new-page'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}
```

---

## **Вопросы на понимание архитектуры**

1. [**Как бы вы организовали структуру проекта в Next.js?**](./Структура%20проекта%20в%20Next.md)

    - Обсуждение организации папок, разделения на модули, использования Server и Client Components.

2. [**Как бы вы реализовали аутентификацию в Next.js?**](./Aутентификация%20в%20Next.md)

    - Использование Middleware, API Routes, JWT, сессий.

3. [**Как бы вы оптимизировали производительность приложения на Next.js?**](./Оптимизация%20производительности%20приложения%20на%20Next.md)

    - Использование SSG, ISR, оптимизация изображений, ленивая загрузка компонентов.

4. [**Как бы вы реализовали многоязычную поддержку в Next.js?**](./Многоязычная%20поддержка%20в%20Next.md)
    - Использование `next-i18next` или кастомного решения с контекстом.
