import {useMutation} from "react-query";
import api from "./Api";

const addToWishlist = async (itemId: string) => {
    try {
        const response = await api.post(`/wishlist/add`, {
            itemId
        })
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Add To Wishlist failed");
    }
}

export const useAddToWishlist = () => {
    return useMutation((itemId: string) => addToWishlist(itemId))
}