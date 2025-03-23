Middleware в Next.js и Interceptors в Axios — это два разных механизма, которые используются для обработки запросов и ответов, но они работают в разных контекстах и решают разные задачи. Давайте разберем их подробно и сравним.

---

## **1. Middleware в Next.js**

### **Что это?**

Middleware в Next.js — это функция, которая выполняется **на сервере** перед обработкой запроса. Она позволяет перехватывать запросы и выполнять дополнительные действия, такие как:

- Редиректы.
- Проверка аутентификации.
- Модификация заголовков.
- Логирование.

### **Где используется?**

Middleware работает на уровне сервера и применяется ко всем запросам, которые поступают в Next.js-приложение.

### **Пример Middleware:**

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

    // Добавление кастомного заголовка
    const response = NextResponse.next()
    response.headers.set('x-custom-header', 'hello-from-middleware')

    return response
}
```

### **Как это работает:**

- Middleware выполняется перед обработкой запроса.
- Может изменять запрос (например, выполнять редирект) или ответ (например, добавлять заголовки).

---

## **2. Interceptors в Axios**

### **Что это?**

Interceptors в Axios — это функции, которые перехватывают **HTTP-запросы и ответы** на уровне клиента. Они позволяют:

- Модифицировать запросы перед отправкой.
- Обрабатывать ответы перед их использованием в коде.
- Логировать запросы и ответы.
- Обрабатывать ошибки.

### **Где используется?**

Interceptors работают на уровне клиента и применяются только к запросам, которые отправляются через Axios.

### **Пример Interceptors:**

```javascript
import axios from 'axios'

// Перехватчик для запросов
axios.interceptors.request.use(
    config => {
        console.log('Request Interceptor:', config)
        // Добавление токена в заголовок
        config.headers.Authorization = 'Bearer token'
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

// Перехватчик для ответов
axios.interceptors.response.use(
    response => {
        console.log('Response Interceptor:', response)
        return response
    },
    error => {
        console.error('Response Error Interceptor:', error)
        return Promise.reject(error)
    },
)

// Пример запроса
axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(response => console.log(response.data))
    .catch(error => console.error(error))
```

### **Как это работает:**

- Interceptors перехватывают запросы и ответы перед их обработкой.
- Могут изменять конфигурацию запроса или обрабатывать ошибки.

---

## **3. Сравнение Middleware и Interceptors**

| Характеристика            | Middleware в Next.js                                   | Interceptors в Axios                                     |
| ------------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| **Где работает**          | На сервере                                             | На клиенте                                               |
| **Контекст**              | Обрабатывает все запросы к серверу                     | Обрабатывает только запросы Axios                        |
| **Использование**         | Для редиректов, аутентификации, модификации заголовков | Для модификации запросов, обработки ответов, логирования |
| **Примеры использования** | Редиректы, проверка аутентификации, логирование        | Добавление токенов, обработка ошибок, логирование        |

---

## **4. Когда использовать?**

### **Middleware в Next.js:**

- Когда нужно обрабатывать запросы на уровне сервера.
- Для редиректов, проверки аутентификации, модификации заголовков.
- Для логирования всех запросов к серверу.

### **Interceptors в Axios:**

- Когда нужно обрабатывать запросы и ответы на уровне клиента.
- Для добавления токенов, обработки ошибок, логирования.
- Для модификации запросов перед отправкой.

---

## **5. Пример совместного использования**

### **Middleware в Next.js:**

```javascript
// middleware.js
import {NextResponse} from 'next/server'

export function middleware(request) {
    const url = request.nextUrl.clone()

    // Редирект для неавторизованных пользователей
    if (
        !request.cookies.get('authToken') &&
        url.pathname.startsWith('/dashboard')
    ) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}
```

### **Interceptors в Axios:**

```javascript
import axios from 'axios'

// Добавление токена в заголовок
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Обработка ошибок
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            window.location.href = '/login' // Редирект на страницу входа
        }
        return Promise.reject(error)
    },
)
```

---

## **Итог:**

- **Middleware в Next.js** работает на сервере и обрабатывает все запросы к приложению.
- **Interceptors в Axios** работают на клиенте и обрабатывают только запросы, отправленные через Axios.
- Используйте Middleware для серверной логики (редиректы, аутентификация), а Interceptors — для клиентской (добавление токенов, обработка ошибок).
