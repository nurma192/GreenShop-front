import {GetItemResponse} from "./response/GetItemResponse";

export interface Basket {
    _id: string,
    user: string,
    items: {
        item: GetItemResponse ,
        quantity: number,
        _id: string
    }[],
    createdAt?: string,
    updatedAt?: string,
}