### Как оптимизировать изображения в Next.js?

Next.js предоставляет встроенные инструменты для оптимизации изображений, которые позволяют автоматически сжимать, изменять размер и доставлять изображения в современных форматах (например, WebP). Это улучшает производительность и скорость загрузки страниц.

---

### **1. Встроенный компонент `<Image>`**

Next.js предоставляет компонент `<Image>`, который автоматически оптимизирует изображения. Он поддерживает:

- Ленивую загрузку (lazy loading).
- Автоматическое преобразование в современные форматы (WebP, AVIF).
- Изменение размера под разные устройства (responsive images).
- Предзагрузку критических изображений.

---

### **2. Оптимизация изображений в Page Router**

В Page Router используется компонент `<Image>` из пакета `next/image`.

#### **Пример использования `<Image>` в Page Router:**

```javascript
// pages/index.js
import Image from 'next/image'

export default function Home() {
    return (
        <div>
            <h1>Optimized Image in Page Router</h1>
            <Image
                src="/photo.jpg" // Путь к изображению в папке `public`
                alt="Description of the image"
                width={800} // Ширина изображения
                height={600} // Высота изображения
                layout="responsive" // Адаптивный режим
                priority // Предзагрузка для критических изображений
            />
        </div>
    )
}
```

#### **Параметры компонента `<Image>`:**

- `src`: Путь к изображению (относительно папки `public` или абсолютный URL).
- `alt`: Альтернативный текст для изображения.
- `width` и `height`: Размеры изображения.
- `layout`: Режим отображения (`responsive`, `fixed`, `intrinsic`, `fill`).
- `priority`: Предзагрузка изображения (для критических изображений).

---

### **3. Оптимизация изображений в App Router**

В App Router компонент `<Image>` используется аналогично, но с некоторыми улучшениями.

#### **Пример использования `<Image>` в App Router:**

```javascript
// app/page.js
import Image from 'next/image'

export default function Home() {
    return (
        <div>
            <h1>Optimized Image in App Router</h1>
            <Image
                src="/photo.jpg" // Путь к изображению в папке `public`
                alt="Description of the image"
                width={800} // Ширина изображения
                height={600} // Высота изображения
                priority // Предзагрузка для критических изображений
            />
        </div>
    )
}
```

#### **Особенности App Router:**

- В App Router можно использовать `<Image>` без указания `layout`, так как он автоматически адаптируется.
- Поддержка современных форматов (WebP, AVIF) включена по умолчанию.

---

### **4. Использование внешних изображений**

Если изображения хранятся на внешнем сервере (например, CDN), нужно настроить домен в `next.config.js`.

#### **Пример настройки внешних изображений:**

```javascript
// next.config.js
module.exports = {
    images: {
        domains: ['example.com'], // Разрешенные домены для изображений
    },
}
```

#### **Пример использования внешнего изображения:**

```javascript
// pages/index.js или app/page.js
import Image from 'next/image'

export default function Home() {
    return (
        <div>
            <h1>External Image</h1>
            <Image
                src="https://example.com/photo.jpg"
                alt="Description of the image"
                width={800}
                height={600}
                priority
            />
        </div>
    )
}
```

---

### **5. Ленивая загрузка изображений**

Ленивая загрузка (lazy loading) позволяет загружать изображения только тогда, когда они появляются в области видимости.

#### **Пример ленивой загрузки:**

```javascript
// pages/index.js или app/page.js
import Image from 'next/image'

export default function Home() {
    return (
        <div>
            <h1>Lazy Loaded Image</h1>
            <Image
                src="/photo.jpg"
                alt="Description of the image"
                width={800}
                height={600}
                loading="lazy" // Ленивая загрузка
            />
        </div>
    )
}
```

---

### **6. Использование `next/image` с `sizes` для адаптивных изображений**

Параметр `sizes` позволяет указать, как изображение должно масштабироваться на разных устройствах.

#### **Пример с `sizes`:**

```javascript
// pages/index.js или app/page.js
import Image from 'next/image'

export default function Home() {
    return (
        <div>
            <h1>Responsive Image with Sizes</h1>
            <Image
                src="/photo.jpg"
                alt="Description of the image"
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 50vw" // Адаптивные размеры
            />
        </div>
    )
}
```

---

### **7. Примеры для Page Router и App Router**

#### **Page Router:**

```javascript
// pages/index.js
import Image from 'next/image'

export default function Home() {
    return (
        <div>
            <h1>Optimized Image in Page Router</h1>
            <Image
                src="/photo.jpg"
                alt="Description of the image"
                width={800}
                height={600}
                layout="responsive"
                priority
            />
        </div>
    )
}
```

#### **App Router:**

```javascript
// app/page.js
import Image from 'next/image'

export default function Home() {
    return (
        <div>
            <h1>Optimized Image in App Router</h1>
            <Image
                src="/photo.jpg"
                alt="Description of the image"
                width={800}
                height={600}
                priority
            />
        </div>
    )
}
```

---

### **8. Преимущества использования `<Image>`**

- **Автоматическая оптимизация:** Изображения сжимаются и преобразуются в современные форматы.
- **Адаптивность:** Изображения автоматически подстраиваются под размеры экрана.
- **Ленивая загрузка:** Улучшает производительность, загружая изображения только при необходимости.
- **Поддержка современных форматов:** WebP, AVIF и другие.

---

### **Итог:**

- Используйте компонент `<Image>` для оптимизации изображений в Next.js.
- В **Page Router** и **App Router** компонент работает аналогично, но в App Router есть дополнительные улучшения.
- Настройте `next.config.js` для работы с внешними изображениями.
- Используйте параметры `priority`, `loading`, `sizes` для тонкой настройки.
