### Что такое Middleware в Next.js?

Middleware в Next.js — это функция, которая выполняется **перед обработкой запроса**. Она позволяет перехватывать запросы и выполнять дополнительные действия, такие как:

- Проверка аутентификации.
- Редиректы.
- Модификация заголовков.
- Логирование.
- Работа с куками.

Middleware работает на уровне сервера и может быть использован как в **Page Router**, так и в **App Router**. Однако в App Router Middleware стал более мощным и гибким.

---

### **Как работает Middleware?**

1. **Местоположение Middleware:**

    - В **Page Router**: Middleware должен находиться в файле `_middleware.js` (или `_middleware.ts`) внутри папки `pages` или её подпапок.
    - В **App Router**: Middleware должен находиться в файле `middleware.js` (или `middleware.ts`) в корне проекта или внутри папки `app`.

2. **Логика Middleware:**

    - Middleware получает объект `request` и может возвращать `Response` или выполнять редирект.

3. **Порядок выполнения:**
    - Middleware выполняется перед рендерингом страницы или API-роута.

---

### **Примеры Middleware**

#### **1. Middleware в Page Router**

В Page Router Middleware создается в файле `_middleware.js` (или `_middleware.ts`).

##### **Пример: Проверка аутентификации и редирект**

```javascript
// pages/_middleware.js
import {NextResponse} from 'next/server'

export function middleware(request) {
    const url = request.nextUrl.clone()

    // Проверяем, авторизован ли пользователь
    const isAuthenticated = request.cookies.get('authToken')

    if (!isAuthenticated && url.pathname.startsWith('/dashboard')) {
        // Если пользователь не авторизован, перенаправляем на страницу входа
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // Если пользователь авторизован, продолжаем выполнение запроса
    return NextResponse.next()
}
```

##### **Как это работает:**

- Если пользователь пытается получить доступ к `/dashboard`, Middleware проверяет наличие куки `authToken`.
- Если куки нет, пользователь перенаправляется на `/login`.
- Если куки есть, запрос продолжает выполняться.

---

#### **2. Middleware в App Router**

В App Router Middleware создается в файле `middleware.js` (или `middleware.ts`) в корне проекта или внутри папки `app`.

##### **Пример: Логирование и модификация заголовков**

```javascript
// middleware.js
import {NextResponse} from 'next/server'

export function middleware(request) {
    const url = request.nextUrl.clone()

    // Логируем запрос
    console.log(`Request to: ${url.pathname}`)

    // Добавляем кастомный заголовок к ответу
    const response = NextResponse.next()
    response.headers.set('x-custom-header', 'hello-from-middleware')

    // Пример редиректа
    if (url.pathname === '/old-page') {
        url.pathname = '/new-page'
        return NextResponse.redirect(url)
    }

    return response
}
```

##### **Как это работает:**

- Middleware логирует каждый запрос.
- Добавляет кастомный заголовок `x-custom-header` к ответу.
- Если пользователь запрашивает `/old-page`, он перенаправляется на `/new-page`.

---

### **3. Условное выполнение Middleware**

Middleware можно настроить так, чтобы он выполнялся только для определенных путей. Это делается с помощью конфигурации `matcher`.

##### **Пример: Middleware только для API-роутов**

```javascript
// middleware.js
import {NextResponse} from 'next/server'

export function middleware(request) {
    console.log(`Middleware executed for: ${request.nextUrl.pathname}`)
    return NextResponse.next()
}

// Конфигурация matcher
export const config = {
    matcher: '/api/:path*', // Middleware будет выполняться только для API-роутов
}
```

##### **Как это работает:**

- Middleware выполняется только для запросов, начинающихся с `/api/`.

---

### **4. Работа с куками в Middleware**

Middleware может читать и изменять куки.

##### **Пример: Установка куки**

```javascript
// middleware.js
import {NextResponse} from 'next/server'

export function middleware(request) {
    const response = NextResponse.next()

    // Устанавливаем куку
    response.cookies.set('visited', 'true')

    return response
}
```

##### **Как это работает:**

- При каждом запросе Middleware устанавливает куку `visited` со значением `true`.

---

### **5. Примеры для Page Router и App Router**

#### **Page Router:**

```javascript
// pages/_middleware.js
import {NextResponse} from 'next/server'

export function middleware(request) {
    const url = request.nextUrl.clone()

    // Проверка аутентификации
    const isAuthenticated = request.cookies.get('authToken')

    if (!isAuthenticated && url.pathname.startsWith('/dashboard')) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}
```

#### **App Router:**

```javascript
// middleware.js
import {NextResponse} from 'next/server'

export function middleware(request) {
    const url = request.nextUrl.clone()

    // Логирование
    console.log(`Request to: ${url.pathname}`)

    // Редирект
    if (url.pathname === '/old-page') {
        url.pathname = '/new-page'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/:path*'], // Middleware для конкретных путей
}
```

---

### **Итог:**

- Middleware в Next.js — это мощный инструмент для перехвата запросов и выполнения дополнительной логики.
- В **Page Router** Middleware создается в файле `_middleware.js`.
- В **App Router** Middleware создается в файле `middleware.js` и поддерживает более гибкую конфигурацию.
- Middleware можно использовать для аутентификации, редиректов, логирования, работы с куками и многого другого.
