import { Spinner } from '@/components/ui/Spinner'

import s from './PageLoader.module.scss'

interface Props {
    className?: string
}

export const PageLoader = (props: Props) => {
    const { className } = props

    return (
        <div className={className ? `${s.root} ${className}` : s.root}>
            <Spinner size={'lg'} />
        </div>
    )
}
