import { cn } from '@/shared/lib/cn'

import s from './Spinner.module.scss'

interface Props {
    className?: string
    color?: 'dark' | 'light'
    size?: 'sm' | 'md' | 'lg'
}

export const Spinner = (props: Props) => {
    const { className, color = 'dark', size = 'md' } = props

    const composedClassName = cn(s.spinner, s[color], s[size], className)

    return <span className={composedClassName} />
}
