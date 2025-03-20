import {render, screen} from '@testing-library/react'
import React from 'react'

import {Button, buttonVariants} from './button'
// Импортируем компонент
import {cn} from '@/shared/utils'

// Импортируем утилиту cn

describe('Button component', () => {
    // 1. Тест на рендеринг кнопки с дефолтными пропсами
    it('renders with default props', () => {
        render(<Button>Click me</Button>)

        const button = screen.getByRole('button', {name: /click me/i})

        // Проверяем, что кнопка рендерится
        expect(button).toBeInTheDocument()

        // Проверяем, что кнопка имеет дефолтные классы
        expect(button).toHaveClass(
            cn(buttonVariants({variant: 'default', size: 'default'})),
        )
    })

    // 2. Тест на рендеринг кнопки с разными вариантами (variant)
    it('renders with different variants', () => {
        const {rerender} = render(<Button variant="destructive">Delete</Button>)

        // Проверяем классы для destructive варианта
        let button = screen.getByRole('button', {name: /delete/i})
        expect(button).toHaveClass(cn(buttonVariants({variant: 'destructive'})))

        // Перерендерим с другим вариантом
        rerender(<Button variant="outline">Outline</Button>)
        button = screen.getByRole('button', {name: /outline/i})
        expect(button).toHaveClass(cn(buttonVariants({variant: 'outline'})))
    })

    // 3. Тест на рендеринг кнопки с разными размерами (size)
    it('renders with different sizes', () => {
        const {rerender} = render(<Button size="sm">Small</Button>)

        // Проверяем классы для sm размера
        let button = screen.getByRole('button', {name: /small/i})
        expect(button).toHaveClass(cn(buttonVariants({size: 'sm'})))

        // Перерендерим с другим размером
        rerender(<Button size="lg">Large</Button>)
        button = screen.getByRole('button', {name: /large/i})
        expect(button).toHaveClass(cn(buttonVariants({size: 'lg'})))
    })

    // 4. Тест на рендеринг кнопки как Slot (asChild = true)
    it('renders as Slot when asChild is true', () => {
        render(
            <Button asChild>
                <a href="/">Link</a>
            </Button>,
        )

        // Проверяем, что рендерится ссылка, а не кнопка
        const link = screen.getByRole('link', {name: /link/i})
        expect(link).toBeInTheDocument()
        expect(link).toHaveClass(
            cn(buttonVariants({variant: 'default', size: 'default'})),
        )
    })

    // 5. Тест на disabled состояние
    it('renders as disabled', () => {
        render(<Button disabled>Disabled</Button>)

        const button = screen.getByRole('button', {name: /disabled/i})

        // Проверяем, что кнопка disabled
        expect(button).toBeDisabled()
        // expect(button).toHaveClass('opacity-50')
        // expect(button).toHaveClass('pointer-events-none')
    })
})
