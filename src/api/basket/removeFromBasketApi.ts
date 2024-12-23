import {useMutation} from "react-query";
import api from "../Api";
import {Basket} from "../../models/basket";


const removeFromBasket = async (itemId: string) => {
    try {
        const response = await api.delete<Basket>(`/baskets/remove`, {
            data:{itemId}
        })
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Remove From Basket failed");
    }
}

export const useRemoveFromBasket = () => {
    return useMutation((itemId: string) => removeFromBasket(itemId))
}