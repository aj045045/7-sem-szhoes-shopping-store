/**
 * The interface that is used for the product detail
 * 
 * @field id - The unique identifier
 * @field name - The name of the product
 * @field title - The title of the product
 * @field image - The image of the product
 * @field price - The price of the product
 * @field link - The link of product detail
 * @field Old Price - The old price before discount
 * @field percentage - The Discount
 * @field rate - The average rating of the product
 */
export interface ProductInterface {
    id: number;
    name: string;
    title?: string;
    image: string;
    price: number;
    link: string;
    oldPrice?: number;
    percentage?: number;
    rate: number;
}

export interface ProductDetailInterface {
    products: ProductInterface[],
    title: string
}