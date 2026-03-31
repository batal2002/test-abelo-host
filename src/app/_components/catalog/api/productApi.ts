import { api } from '@/api/api'

import { ProductList } from '../model/types'

export const getProducts = async (limit: number, skip: number): Promise<ProductList> => {
    const { data } = await api.get<ProductList>('/products', {
        params: { limit, skip, select: ['id', 'title', 'category', 'images', 'price'] },
    })
    return data
}
