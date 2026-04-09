import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/lib/cn'
import { Spinner } from '@/shared/ui/Spinner'

import s from './Button.module.scss'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    isLoading?: boolean
    loadingText?: string
    spinnerColor?: 'dark' | 'light'
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        type = 'button',
        disabled,
        isLoading = false,
        loadingText = 'Loading...',
        spinnerColor = 'light',
        children,
        ...restProps
    } = props

    return (
        <button type={type} className={cn(s.root, className)} disabled={disabled || isLoading} {...restProps}>
            {isLoading ? (
                <span className={s.loadingContent}>
                    <Spinner size="sm" color={spinnerColor} />
                    {loadingText}
                </span>
            ) : (
                children
            )}
        </button>
    )
}
