import {GetItemResponse} from "./response/GetItemResponse";

export type WishlistResponse = {
    items: {
        item: GetItemResponse,
        _id: string
    }[]
}