В Next.js приложении с использованием **Feature-Sliced Design (FSD)**, `Header` (или навигационная панель) обычно размещается в слое **widgets**, так как это компонент, который объединяет несколько фич и сущностей. Однако, его точное расположение зависит от того, как он используется в вашем приложении.

---

### Варианты размещения `Header`

#### 1. **В `widgets/header/`** (рекомендуется)

Если `Header` используется на всех или большинстве страниц, его лучше разместить в слое `widgets`, так как это композиционный компонент.

```plaintext
src/
├── widgets/
│   ├── header/
│   │   ├── Header.tsx          # Основной компонент
│   │   ├── Navbar.tsx          # Навигационная панель
│   │   ├── UserMenu.tsx        # Меню пользователя
│   │   └── index.ts            # Экспорт компонентов
```

Пример `Header.tsx`:

```tsx
import {Navbar} from './Navbar'
import {UserMenu} from './UserMenu'

export const Header = () => {
    return (
        <header>
            <Navbar />
            <UserMenu />
        </header>
    )
}
```

#### 2. **В `shared/ui/`** (альтернатива)

Если `Header` — это глобальный компонент, который не зависит от конкретных фич, его можно разместить в `shared/ui`.

```plaintext
src/
├── shared/
│   ├── ui/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── UserMenu.tsx
```

#### 3. **В `features/layout/`** (если используется в рамках фичи)

Если `Header` специфичен для определённой фичи (например, админ-панели), его можно разместить в соответствующей фиче.

```plaintext
src/
├── features/
│   ├── layout/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── UserMenu.tsx
```

---

### Где использовать `Header`?

#### 1. **В корневом `layout.tsx`**

Если `Header` должен отображаться на всех страницах, его можно добавить в корневой `layout.tsx`.

```tsx
import {Header} from '@/widgets/header'

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>
            </body>
        </html>
    )
}
```

#### 2. **В отдельных макетах**

Если `Header` нужен только на определённых страницах, его можно добавить в макет для этих страниц.

```tsx
import {Header} from '@/widgets/header'

export default function MainLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    )
}
```

---

### Пример структуры `Header`

#### 1. **`Navbar.tsx`**

```tsx
import Link from 'next/link'

export const Navbar = () => {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/movies">Movies</Link>
            <Link href="/about">About</Link>
        </nav>
    )
}
```

#### 2. **`UserMenu.tsx`**

```tsx
import {useSession} from 'next-auth/react'

export const UserMenu = () => {
    const {data: session} = useSession()

    return (
        <div>
            {session ? (
                <p>Welcome, {session.user?.name}</p>
            ) : (
                <a href="/login">Login</a>
            )}
        </div>
    )
}
```

#### 3. **`Header.tsx`**

```tsx
import {Navbar} from './Navbar'
import {UserMenu} from './UserMenu'

export const Header = () => {
    return (
        <header>
            <Navbar />
            <UserMenu />
        </header>
    )
}
```

---

### Преимущества размещения в `widgets`

1. **Изоляция**:

    - `Header` не зависит от конкретных фич, что делает его более универсальным.

2. **Переиспользование**:

    - Его можно использовать на разных страницах и в разных макетах.

3. **Масштабируемость**:
    - Если `Header` станет сложнее, его можно разбить на подкомпоненты (например, `Navbar`, `UserMenu`).

---

### Итог

- Разместите `Header` в `widgets/header/`, если он используется на всех или большинстве страниц.
- Используйте его в корневом `layout.tsx` или в отдельных макетах.
- Разделите `Header` на подкомпоненты (`Navbar`, `UserMenu`), чтобы упростить поддержку и тестирование.
