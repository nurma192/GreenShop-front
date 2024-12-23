import {Item} from "../Item";

export interface GetItemsResponse {
    metadata: {
        totalItems: number,
        totalPages: number,
        currentPage: number,
        itemsPerPage: number
    },
    data: Item[]
}