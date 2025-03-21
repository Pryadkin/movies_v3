Для Next.js приложения с использованием **Feature-Sliced Design (FSD)** и **Server Actions**, структура проекта может выглядеть следующим образом. FSD помогает организовать код по функциональным слоям, а Server Actions позволяют выполнять серверные операции напрямую из клиентских компонентов.

---

### Структура проекта

```plaintext
src/
├── app/                          # Next.js app router
│   ├── (auth)/                   # Auth-related routes (optional)
│   ├── (main)/                   # Main layout routes
│   │   ├── layout.tsx            # Main layout
│   │   ├── page.tsx              # Main page
│   ├── api/                      # API routes (optional, если не используете Server Actions)
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
│
├── features/                     # Feature slices
│   ├── movie/                    # Movie feature
│   │   ├── api/                  # API-related logic (если не используете Server Actions)
│   │   ├── components/           # UI components
│   │   ├── model/                # Business logic, types, stores
│   │   ├── lib/                  # Utilities, helpers
│   │   └── ui/                   # UI components (альтернатива components/)
│   └── user/                     # User feature (пример)
│
├── entities/                     # Shared entities
│   ├── movie/                    # Movie entity
│   │   ├── api/                  # API-related logic (если не используете Server Actions)
│   │   ├── model/                # Types, stores
│   │   └── ui/                   # Reusable UI components
│   └── user/                     # User entity (пример)
│
├── shared/                       # Shared layer
│   ├── api/                      # API clients, interceptors
│   ├── config/                   # App configuration
│   ├── lib/                      # Utilities, helpers
│   ├── ui/                       # Global UI components (кнопки, модалки)
│   └── styles/                   # Global styles
│
├── widgets/                      # Widgets (композиция фич и entities)
│   ├── navbar/                   # Navbar widget
│   └── sidebar/                  # Sidebar widget
│
└── pages/                        # Legacy pages (если используете pages router)
```

---

### Описание слоёв

1. **`app/`**:

    - Содержит роуты Next.js (App Router).
    - Используется для страниц и макетов.
    - Если используете Server Actions, они могут быть определены здесь.

2. **`features/`**:

    - Каждая фича (например, `movie`) представляет собой самостоятельный модуль.
    - Включает:
        - `api/`: Логика API-запросов (если не используете Server Actions).
        - `components/` или `ui/`: UI-компоненты, специфичные для фичи.
        - `model/`: Бизнес-логика, типы, хранилища (например, Zustand).
        - `lib/`: Вспомогательные функции.

3. **`entities/`**:

    - Общие сущности, которые используются в нескольких фичах.
    - Например, сущность `movie` может содержать типы и базовые компоненты, которые используются в разных фичах.

4. **`shared/`**:

    - Общие утилиты, конфигурации, API-клиенты, глобальные стили и UI-компоненты.
    - Например, клиент для работы с API (`dbClient`), хелперы для форматирования дат и т.д.

5. **`widgets/`**:

    - Виджеты — это композиция фич и сущностей.
    - Например, `navbar` может использовать фичу `user` и сущность `movie`.

6. **`pages/`**:
    - Используется, если вы работаете с Pages Router (устаревший подход в Next.js 13+).

---

### Пример использования Server Actions

Server Actions позволяют выполнять серверные операции напрямую из клиентских компонентов. Например, для фичи `movie`:

#### 1. **Создание Server Action**

В файле `src/features/movie/actions.ts`:

```typescript
'use server'

import {Movie} from '@prisma/client'

import {dbClient} from '@/shared/lib/db'

export const addMovie = async (movie: Omit<Movie, 'id'>): Promise<Movie> => {
    return dbClient.movie.create({
        data: movie,
    })
}

export const deleteMovie = async (movieId: string): Promise<void> => {
    await dbClient.movie.delete({
        where: {id: movieId},
    })
}
```

#### 2. **Использование Server Action в компоненте**

В файле `src/features/movie/components/AddMovieForm.tsx`:

```tsx
'use client'

import {useForm} from 'react-hook-form'

import {addMovie} from '../actions'

export const AddMovieForm = () => {
    const {register, handleSubmit} = useForm()

    const onSubmit = async (data: any) => {
        await addMovie(data)
        alert('Movie added!')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('title')}
                placeholder="Title"
            />
            <input
                {...register('description')}
                placeholder="Description"
            />
            <button type="submit">Add Movie</button>
        </form>
    )
}
```

---

### Пример использования FSD

#### 1. **Фича `movie`**

- **`src/features/movie/model/types.ts`**:

    ```typescript
    export interface Movie {
        id: string
        title: string
        description: string
        releaseDate: Date
    }
    ```

- **`src/features/movie/components/MovieList.tsx`**:

    ```tsx
    'use client'

    import {useEffect, useState} from 'react'

    import {dbClient} from '@/shared/lib/db'

    export const MovieList = () => {
        const [movies, setMovies] = useState<Movie[]>([])

        useEffect(() => {
            const fetchMovies = async () => {
                const data = await dbClient.movie.findMany()
                setMovies(data)
            }
            fetchMovies()
        }, [])

        return (
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        )
    }
    ```

#### 2. **Сущность `movie`**

- **`src/entities/movie/ui/MovieCard.tsx`**:

    ```tsx
    import {Movie} from '../model/types'

    export const MovieCard = ({movie}: {movie: Movie}) => {
        return (
            <div>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
            </div>
        )
    }
    ```

---

### Преимущества такой структуры

1. **Модульность**:

    - Каждая фича и сущность изолирована, что упрощает поддержку и тестирование.

2. **Масштабируемость**:

    - Новые фичи и сущности добавляются без изменения существующего кода.

3. **Чистота кода**:

    - Бизнес-логика отделена от UI, а общие компоненты вынесены в `shared` и `entities`.

4. **Использование Server Actions**:
    - Упрощает выполнение серверных операций без создания отдельных API-роутов.

---

### Итог

- **FSD** помогает организовать код по функциональным слоям.
- **Server Actions** упрощают выполнение серверных операций.
- Структура проекта легко масштабируется и поддерживается.
