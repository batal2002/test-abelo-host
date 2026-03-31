import axios from 'axios'
import { create } from 'zustand'

import { getProducts } from '../api/productApi'
import type { Product } from './types'

type ProductStore = {
    products: Array<Product>
    total: number
    page: number
    limit: number

    loading: boolean
    isFetching: boolean
    error: string | null

    fetchProducts: (page?: number) => Promise<void>
    setPage: (page: number) => void
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    total: 0,
    page: 1,
    limit: 12,

    loading: false,
    isFetching: false,
    error: null,

    fetchProducts: async (page = 1) => {
        const { limit, products } = get()
        const skip = (page - 1) * limit

        const isFirstLoad = products.length === 0

        set({
            loading: isFirstLoad,
            isFetching: !isFirstLoad,
            error: null,
        })

        try {
            const data = await getProducts(limit, skip)

            set({
                products: data.products,
                total: data.total,
                page,
            })
        } catch (e) {
            if (axios.isAxiosError(e)) {
                set({ error: e.message })
            } else {
                set({ error: 'Unknown error' })
            }
        } finally {
            set({
                loading: false,
                isFetching: false,
            })
        }
    },

    setPage: (page) => set({ page }),
}))
