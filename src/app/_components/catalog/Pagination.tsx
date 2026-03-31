'use client'

import { cn } from '@/lib/cn'

import s from './Pagination.module.scss'

export interface PaginationProps {
    page: number
    total: number
    pageSize: number
    onPageChange: (page: number) => void
    disabled?: boolean
    className?: string
    preloadPage?: number
}

function getVisiblePages(current: number, totalPages: number): Array<number | 'ellipsis'> {
    if (totalPages <= 0) {
        return []
    }
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const items: Array<number | 'ellipsis'> = [1]
    const pushEllipsis = () => {
        if (items[items.length - 1] !== 'ellipsis') {
            items.push('ellipsis')
        }
    }

    const left = Math.max(2, current - 1)
    const right = Math.min(totalPages - 1, current + 1)

    if (left > 2) {
        pushEllipsis()
    }
    for (let i = left; i <= right; i += 1) {
        items.push(i)
    }
    if (right < totalPages - 1) {
        pushEllipsis()
    }
    if (totalPages > 1) {
        items.push(totalPages)
    }

    return items
}

export const Pagination = (props: PaginationProps) => {
    const { page, total, pageSize, onPageChange, disabled = false, preloadPage } = props

    const totalPages = Math.max(1, Math.ceil(total / pageSize))

    if (total <= 0 || totalPages <= 1) {
        return null
    }

    const visibles = getVisiblePages(page, totalPages)
    const isPrevDisabled = disabled || page <= 1
    const isNextDisabled = disabled || page >= totalPages

    return (
        <nav className={s.root}>
            <button
                type="button"
                className={`${s.btn} ${s.prev}`}
                disabled={isPrevDisabled}
                onClick={() => onPageChange(page - 1)}
            >
                Back
            </button>

            <div className={s.pages}>
                {visibles.map((item, index) =>
                    item === 'ellipsis' ? (
                        <span key={`e-${index}`} className={s.ellipsis}>
                            …
                        </span>
                    ) : (
                        <button
                            type="button"
                            key={item}
                            className={cn(
                                s.btn,
                                item === page ? s.active : null,
                                item === preloadPage && preloadPage !== page ? s.preload : null,
                            )}
                            onClick={() => onPageChange(item)}
                            disabled={disabled && item !== page}
                        >
                            {item}
                        </button>
                    ),
                )}
            </div>

            <button
                type="button"
                className={`${s.btn} ${s.next}`}
                disabled={isNextDisabled}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </button>
        </nav>
    )
}
