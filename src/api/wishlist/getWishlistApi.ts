import { useQuery} from "react-query";
import api from "../Api";
import {WishlistResponse} from "../../models/WishlistResponse";

const getWishlist = async () => {
    try {
        const response = await api.get<WishlistResponse>(`/wishlists`)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Get Wishlist failed");
    }
}

export const useGetWishlist = () => {
    return useQuery<WishlistResponse>(
        'wishlist',
        getWishlist
    );
}