### Рендеринг в Next.js: Page Router vs App Router

Next.js предлагает два подхода к маршрутизации и рендерингу: **Page Router** (традиционный) и **App Router** (новый, начиная с Next.js 13). Оба подхода поддерживают различные методы рендеринга, такие как **SSR (Server-Side Rendering)**, **SSG (Static Site Generation)** и **CSR (Client-Side Rendering)**.

---

## **1. Page Router (Традиционный подход)**

Page Router — это классический подход в Next.js, где маршруты определяются структурой файлов в папке `pages`. Каждый файл в этой папке автоматически становится маршрутом.

### **Примеры рендеринга в Page Router**

#### **a. Статическая генерация (SSG)**
- HTML генерируется на этапе сборки.
- Используется функция `getStaticProps`.

```jsx
// pages/index.js
export default function Home({ data }) {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Data: {data}</p>
    </div>
  );
}

export async function getStaticProps() {
  // Данные загружаются на этапе сборки
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
```

#### **b. Серверный рендеринг (SSR)**
- HTML генерируется на сервере при каждом запросе.
- Используется функция `getServerSideProps`.

```jsx
// pages/about.js
export default function About({ data }) {
  return (
    <div>
      <h1>About Page</h1>
      <p>Data: {data}</p>
    </div>
  );
}

export async function getServerSideProps() {
  // Данные загружаются на сервере при каждом запросе
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
```

#### **c. Клиентский рендеринг (CSR)**
- HTML генерируется на стороне клиента.
- Используется `useEffect` для загрузки данных.

```jsx
// pages/contact.js
import { useEffect, useState } from 'react';

export default function Contact() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Contact Page</h1>
      <p>Data: {data ? data : 'Loading...'}</p>
    </div>
  );
}
```

---

## **2. App Router (Новый подход, Next.js 13+)**

App Router — это новый подход, основанный на структуре папки `app`. Он предоставляет более гибкую и мощную систему маршрутизации, а также улучшенную поддержку React Server Components.

### **Примеры рендеринга в App Router**

#### **a. Статическая генерация (SSG)**
- Используется `fetch` с опцией `{ cache: 'force-cache' }` или `generateStaticParams`.

```jsx
// app/page.js
export default async function Home() {
  const res = await fetch('https://api.example.com/data', { cache: 'force-cache' });
  const data = await res.json();

  return (
    <div>
      <h1>Home Page</h1>
      <p>Data: {data}</p>
    </div>
  );
}
```

#### **b. Серверный рендеринг (SSR)**
- Используется `fetch` с опцией `{ cache: 'no-store' }`.

```jsx
// app/about/page.js
export default async function About() {
  const res = await fetch('https://api.example.com/data', { cache: 'no-store' });
  const data = await res.json();

  return (
    <div>
      <h1>About Page</h1>
      <p>Data: {data}</p>
    </div>
  );
}
```

#### **c. Клиентский рендеринг (CSR)**
- Используется `useEffect` или клиентские компоненты.

```jsx
// app/contact/page.js
'use client'; // Указываем, что это клиентский компонент

import { useEffect, useState } from 'react';

export default function Contact() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Contact Page</h1>
      <p>Data: {data ? data : 'Loading...'}</p>
    </div>
  );
}
```

---

## **3. Отличия Page Router и App Router**

### **Page Router**
- Маршруты определяются структурой файлов в папке `pages`.
- Поддерживает SSR, SSG и CSR через функции `getServerSideProps`, `getStaticProps` и `useEffect`.
- Прост в использовании, но менее гибок в плане организации кода.

### **App Router**
- Маршруты определяются структурой файлов в папке `app`.
- Использует React Server Components по умолчанию, что позволяет разделять серверный и клиентский код.
- Поддерживает SSR, SSG и CSR через `fetch` с опциями `cache`.
- Более гибкий и мощный, но требует большего понимания работы с серверными компонентами.

---

## **4. Когда использовать Page Router или App Router?**

- **Page Router**:
  - Подходит для небольших проектов или если вы уже используете Next.js и не хотите переписывать код.
  - Прост в использовании и хорошо документирован.

- **App Router**:
  - Подходит для новых проектов, где важны производительность и гибкость.
  - Позволяет использовать React Server Components для улучшения производительности.
  - Рекомендуется для крупных проектов с сложной структурой маршрутов.

---

## **Итог**
- **Page Router** — это классический подход, который хорошо подходит для большинства проектов.
- **App Router** — это новый подход, который предоставляет больше возможностей для оптимизации и организации кода.

Выбор между ними зависит от ваших требований и уровня сложности проекта. Если вы начинаете новый проект, App Router может быть предпочтительнее благодаря своей гибкости и поддержке React Server Components.