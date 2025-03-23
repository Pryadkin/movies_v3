Реализация аутентификации в Next.js с использованием **App Router** (Next.js 13+) требует учета новых возможностей, таких как Server Components, Client Components и Middleware. Мы будем использовать **JWT (JSON Web Tokens)** для аутентификации и **Middleware** для защиты маршрутов. Также рассмотрим использование **сессий** через библиотеку `next-auth`.

---

## **1. Общий план реализации**

1. **Регистрация и вход:**

    - Пользователь регистрируется или входит в систему.
    - Сервер генерирует JWT и возвращает его клиенту.
    - JWT сохраняется в cookies.

2. **Защита маршрутов:**

    - Middleware проверяет наличие и валидность JWT.
    - Если JWT отсутствует или невалиден, пользователь перенаправляется на страницу входа.

3. **API Routes:**

    - API-роуты для регистрации, входа и выхода.
    - API-роуты для защищенных данных, которые проверяют JWT.

4. **Сессии (опционально):**
    - Использование библиотеки `next-auth` для управления сессиями.

---

## **2. Реализация**

### **Шаг 1: Настройка API Routes**

#### **Регистрация и вход**

Создайте API-роуты для регистрации и входа в папке `app/api`.

```javascript
// app/api/auth/register/route.js
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {NextResponse} from 'next/server'

import {createUser} from '@/lib/db'

export async function POST(request) {
    const {email, password} = await request.json()

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10)

    // Создание пользователя в базе данных
    const user = await createUser({email, password: hashedPassword})

    // Генерация JWT
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })

    // Возврат JWT клиенту
    const response = NextResponse.json({
        message: 'User registered successfully',
    })
    response.cookies.set('token', token, {httpOnly: true, path: '/'})

    return response
}
```

```javascript
// app/api/auth/login/route.js
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {NextResponse} from 'next/server'

import {getUserByEmail} from '@/lib/db'

export async function POST(request) {
    const {email, password} = await request.json()

    // Поиск пользователя в базе данных
    const user = await getUserByEmail(email)
    if (!user) {
        return NextResponse.json(
            {message: 'Invalid credentials'},
            {status: 401},
        )
    }

    // Проверка пароля
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        return NextResponse.json(
            {message: 'Invalid credentials'},
            {status: 401},
        )
    }

    // Генерация JWT
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })

    // Возврат JWT клиенту
    const response = NextResponse.json({message: 'Login successful'})
    response.cookies.set('token', token, {httpOnly: true, path: '/'})

    return response
}
```

---

### **Шаг 2: Middleware для защиты маршрутов**

Middleware будет проверять наличие и валидность JWT перед обработкой запроса.

```javascript
// middleware.js
import jwt from 'jsonwebtoken'
import {NextResponse} from 'next/server'

export function middleware(request) {
    const token = request.cookies.get('token')

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return NextResponse.next()
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/dashboard/:path*'], // Защищенные маршруты
}
```

---

### **Шаг 3: Защищенные API Routes**

API-роуты для защищенных данных также должны проверять JWT.

```javascript
// app/api/protected/route.js
import jwt from 'jsonwebtoken'
import {NextResponse} from 'next/server'

export async function GET(request) {
    const token = request.cookies.get('token')

    if (!token) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return NextResponse.json({
            message: 'Protected data',
            userId: decoded.userId,
        })
    } catch (error) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401})
    }
}
```

---

### **Шаг 4: Сессии (опционально)**

Если вы хотите использовать сессии, можно интегрировать библиотеку `next-auth`.

#### **Установка `next-auth`:**

```bash
npm install next-auth
```

#### **Настройка `next-auth`:**

```javascript
// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export const {handlers, auth, signIn, signOut} = NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            authorize: async credentials => {
                const user = await getUserByEmail(credentials.email)
                if (
                    user &&
                    (await bcrypt.compare(credentials.password, user.password))
                ) {
                    return {id: user.id, email: user.email}
                }
                return null
            },
        }),
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session(session, token) {
            session.userId = token.id
            return session
        },
    },
})
```

---

### **Шаг 5: Использование аутентификации на клиенте**

#### **Пример страницы входа:**

```javascript
// app/login/page.js
'use client'

import {useRouter} from 'next/navigation'
import {useState} from 'react'

// app/login/page.js

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        })

        if (response.ok) {
            router.push('/dashboard')
        } else {
            alert('Login failed')
        }
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

## **3. Итог**

- **Регистрация и вход:** Используйте API Routes для обработки регистрации и входа, генерируйте JWT и сохраняйте его в cookies.
- **Защита маршрутов:** Используйте Middleware для проверки JWT и защиты маршрутов.
- **Защищенные API Routes:** Проверяйте JWT в API-роутах для защищенных данных.
- **Сессии (опционально):** Используйте `next-auth` для управления сессиями.

Такой подход обеспечивает безопасную и масштабируемую аутентификацию в Next.js с использованием App Router.
