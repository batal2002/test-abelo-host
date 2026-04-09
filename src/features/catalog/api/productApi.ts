import { ProductList } from '@/features/catalog/model/types'
import { publicApi } from '@/shared/api/publicApi'

export const getProducts = async (limit: number, skip: number): Promise<ProductList> => {
    const { data } = await publicApi.get<ProductList>('/products', {
        params: { limit, skip, select: ['id', 'title', 'category', 'images', 'price'] },
    })
    return data
}
