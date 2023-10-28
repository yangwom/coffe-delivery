type image_default = {
    id: number,
    img: string,
}

export type product = {
    id: number,
    created_at: string,
    product_name: string,
    categoria: string,
    quantity: number,
    description: string,
    product_price: number,
    image: string
    image_default?: image_default
}