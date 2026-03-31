export interface Product {
    id: number
    title: string
    category: string
    price: number
    images: Array<string>
}

export interface ProductList {
    limit: number
    total: number
    skip: number
    products: Array<Product>
}
