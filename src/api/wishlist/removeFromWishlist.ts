import api from "../Api";
import {useMutation} from "react-query";

const removeFromWishlist = async (itemId: string) => {
    try {
        const response = await api.delete(`/wishlists/remove`,{
            data: {
                itemId
            }
        })
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Remove From Wishlist failed");
    }
}

export const useRemoveFromWishlist = () => {
    return useMutation((itemId: string) => removeFromWishlist(itemId))
}