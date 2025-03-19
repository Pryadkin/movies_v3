import {ReactNode} from 'react'

import {cn} from '@/shared/utils'

interface Props {
    children: ReactNode
    className: string
}

export function TypographyH1({className, children}: Props) {
    return (
        <h1
            className={cn(
                className,
                'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
            )}
        >
            {children}
        </h1>
    )
}

TypographyH1.displayName = 'H1'
