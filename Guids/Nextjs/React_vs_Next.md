### Отличия Next.js от React с примерами кода

**React** — это библиотека для создания пользовательских интерфейсов, а **Next.js** — это фреймворк, построенный на основе React, который добавляет множество дополнительных возможностей, таких как серверный рендеринг (SSR), статическая генерация (SSG), маршрутизация на уровне файловой системы и многое другое. Ниже приведены основные отличия и примеры кода.

---

## **1. Рендеринг**

### **React**

- React работает на стороне клиента (CSR — Client-Side Rendering). Это означает, что весь JavaScript загружается в браузер, и рендеринг происходит на стороне клиента.
- Пример:

    ```jsx
    // App.js
    import React from 'react'

    function App() {
        return (
            <div>
                <h1>Hello, React!</h1>
            </div>
        )
    }

    export default App
    ```

    В этом примере весь HTML генерируется в браузере после загрузки JavaScript.

---

### **Next.js**

- Next.js поддерживает несколько режимов рендеринга:

    - **SSR (Server-Side Rendering)**: HTML генерируется на сервере при каждом запросе.
    - **SSG (Static Site Generation)**: HTML генерируется на этапе сборки.
    - **CSR (Client-Side Rendering)**: Как в React, но с дополнительными возможностями.

- Пример SSR:

    ```jsx
    // pages/index.js
    export default function Home({data}) {
        return (
            <div>
                <h1>Hello, Next.js!</h1>
                <p>Data: {data}</p>
            </div>
        )
    }

    export async function getServerSideProps() {
        // Данные загружаются на сервере при каждом запросе
        const res = await fetch('https://api.example.com/data')
        const data = await res.json()

        return {
            props: {
                data,
            },
        }
    }
    ```

- Пример SSG:

    ```jsx
    // pages/about.js
    export default function About({data}) {
        return (
            <div>
                <h1>About Page</h1>
                <p>Data: {data}</p>
            </div>
        )
    }

    export async function getStaticProps() {
        // Данные загружаются на этапе сборки
        const res = await fetch('https://api.example.com/data')
        const data = await res.json()

        return {
            props: {
                data,
            },
        }
    }
    ```

---

## **2. Маршрутизация**

### **React**

- В React маршрутизация обычно настраивается с помощью библиотеки `react-router-dom`.
- Пример:

    ```jsx
    // App.js
    import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'

    import About from './About'
    import Home from './Home'

    function App() {
        return (
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/about"
                        element={<About />}
                    />
                </Routes>
            </Router>
        )
    }

    export default App
    ```

---

### **Next.js**

- В Next.js маршрутизация основана на файловой системе. Каждый файл в папке `pages` автоматически становится маршрутом.
- Пример:

    ```jsx
    // pages/index.js
    export default function Home() {
      return <h1>Home Page</h1>;
    }

    // pages/about.js
    export default function About() {
      return <h1>About Page</h1>;
    }
    ```

    - Файл `pages/index.js` соответствует маршруту `/`.
    - Файл `pages/about.js` соответствует маршруту `/about`.

---

## **3. API Routes**

### **React**

- В React для создания API требуется отдельный сервер (например, на Express.js).
- Пример:

    ```javascript
    // server.js
    const express = require('express')
    const app = express()

    app.get('/api/data', (req, res) => {
        res.json({message: 'Hello from API!'})
    })

    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
    ```

---

### **Next.js**

- Next.js предоставляет встроенную поддержку API Routes. Вы можете создавать API прямо в папке `pages/api`.
- Пример:
    ```javascript
    // pages/api/hello.js
    export default function handler(req, res) {
        res.status(200).json({message: 'Hello from Next.js API!'})
    }
    ```
    - Этот API будет доступен по адресу `/api/hello`.

---

## **4. Оптимизация изображений**

### **React**

- В React вам нужно вручную оптимизировать изображения или использовать сторонние библиотеки, такие как `react-lazy-load-image-component`.
- Пример:

    ```jsx
    import React from 'react'
    import {LazyLoadImage} from 'react-lazy-load-image-component'

    function ImageComponent() {
        return (
            <LazyLoadImage
                src="/image.jpg"
                alt="Example"
                effect="blur"
            />
        )
    }

    export default ImageComponent
    ```

---

### **Next.js**

- Next.js предоставляет встроенный компонент `<Image>`, который автоматически оптимизирует изображения.
- Пример:

    ```jsx
    import Image from 'next/image'

    function ImageComponent() {
        return (
            <Image
                src="/image.jpg"
                alt="Example"
                width={500}
                height={300}
                layout="responsive"
            />
        )
    }

    export default ImageComponent
    ```

---

## **5. SEO**

### **React**

- В React SEO требует дополнительных усилий, таких как использование `react-helmet` для управления мета-тегами.
- Пример:

    ```jsx
    import React from 'react'
    import {Helmet} from 'react-helmet'

    function Home() {
        return (
            <div>
                <Helmet>
                    <title>Home Page</title>
                    <meta
                        name="description"
                        content="This is the home page"
                    />
                </Helmet>
                <h1>Home Page</h1>
            </div>
        )
    }

    export default Home
    ```

---

### **Next.js**

- Next.js упрощает SEO благодаря поддержке SSR и SSG. Вы можете легко добавлять мета-теги.
- Пример:

    ```jsx
    import Head from 'next/head'

    export default function Home() {
        return (
            <div>
                <Head>
                    <title>Home Page</title>
                    <meta
                        name="description"
                        content="This is the home page"
                    />
                </Head>
                <h1>Home Page</h1>
            </div>
        )
    }
    ```

---

## **6. Поддержка TypeScript**

### **React**

- В React TypeScript нужно настраивать вручную (например, через `create-react-app` с флагом `--template typescript`).
- Пример:
    ```bash
    npx create-react-app my-app --template typescript
    ```

---

### **Next.js**

- Next.js имеет встроенную поддержку TypeScript. Достаточно создать файл `tsconfig.json`, и Next.js автоматически настроит TypeScript.
- Пример:
    ```bash
    npx create-next-app@latest --typescript
    ```

---

## **Итог**

- **React** — это библиотека, которая предоставляет базовые возможности для создания UI. Она требует дополнительных инструментов для маршрутизации, SSR, SEO и т.д.
- **Next.js** — это фреймворк, который расширяет React, добавляя встроенную поддержку SSR, SSG, маршрутизации, API Routes, оптимизации изображений и многого другого.

Если вам нужен быстрый старт и мощные возможности "из коробки", Next.js — отличный выбор. Если же вы хотите полный контроль над архитектурой, React может быть предпочтительнее.
