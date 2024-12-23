import {Category} from "../Category";

export interface GetItemResponse {
    _id: string,
    images: string[],
    title: string,
    shortDescription: string,
    cost: number,
    size: string,
    sku: string,
    categories: Category[]
    tags: string[],
    productDescription: string,
    // relatedProducts: [],
    reviewsCount: number,
    averageRating: number
}
