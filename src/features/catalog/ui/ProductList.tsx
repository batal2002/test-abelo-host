'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { useProductStore } from '@/features/catalog/model'
import { Button } from '@/shared/ui/Button'
import { PageLoader } from '@/shared/ui/PageLoader'

import { Pagination } from './Pagination'
import { ProductCard } from './ProductCard'
import s from './ProductList.module.scss'

export const ProductList = () => {
    const { products, fetchProducts, loading, isFetching, error, page, limit, total, setPage } = useProductStore()
    const { status } = useSession()

    const [preloadPage, setPreloadPage] = useState(page)

    useEffect(() => {
        void fetchProducts(preloadPage).then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setPage(preloadPage)
        })
    }, [fetchProducts, preloadPage, setPage])

    return (
        <div className={s.root}>
            {error && !loading && (
                <div className={s.error}>
                    <div className={s.errorTitle}>Could not load products</div>
                    <div className={s.errorText}>{error}</div>
                    <Button className={s.retry} onClick={() => setPreloadPage(page)} disabled={isFetching}>
                        Retry
                    </Button>
                </div>
            )}
            {loading ? (
                <PageLoader className={s.loader} />
            ) : (
                <div className={s.list}>
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            priority={index < 4}
                            withButton={status === 'authenticated'}
                        />
                    ))}
                </div>
            )}
            <Pagination
                page={page}
                preloadPage={preloadPage}
                total={total}
                pageSize={limit}
                disabled={isFetching}
                onPageChange={setPreloadPage}
            />
        </div>
    )
}
