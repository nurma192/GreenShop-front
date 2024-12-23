import api from "../Api";
import {useMutation} from "react-query";

const addWishlist = async (itemId: string) => {
    try {
        const response = await api.post(`/wishlists/add`,{
            itemId
        })
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Add Wishlist failed");
    }
}

export const useAddWishlist = () => {
    return useMutation((itemId: string) => addWishlist(itemId))
}