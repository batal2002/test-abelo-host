import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { Spinner } from '@/components/ui/Spinner'

import { Product } from './model/types'
import s from './ProductCard.module.scss'

interface Props extends Product {
    priority?: boolean
    withButton?: boolean
}

export const ProductCard = (props: Props) => {
    const { images, title, category, price, priority, withButton } = props
    const [isImageLoading, setIsImageLoading] = useState(true)

    return (
        <div className={s.card}>
            <div className={s.image}>
                {isImageLoading && (
                    <div className={s.loader}>
                        <Spinner />
                    </div>
                )}
                <Image
                    src={images[0]}
                    alt={title}
                    priority={priority}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                />
            </div>

            <h4 className={s.title}>{title}</h4>
            <span className={s.category}>{category}</span>
            <div className={s.root}>
                <span className={s.price}>${price}</span>
                {withButton && <Button>Add to cart</Button>}
            </div>
        </div>
    )
}
