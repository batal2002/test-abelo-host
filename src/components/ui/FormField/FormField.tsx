import { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

import s from './FormField.module.scss'

type FormFieldProps = {
    label: string
    error?: string
} & ComponentPropsWithoutRef<'input'>

export const FormField = (props: FormFieldProps) => {
    const { label, error, id, className, ...restProps } = props
    return (
        <label className={s.field}>
            <span className={s.label}>{label}</span>
            <input className={cn(s.input, className)} {...restProps} />
            {error && <span className={s.error}>{error}</span>}
        </label>
    )
}
