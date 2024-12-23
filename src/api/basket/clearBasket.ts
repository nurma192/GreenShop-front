import {useMutation} from "react-query";
import api from "../Api";

const clearBasket = async () => {
    try {
        const response = await api.delete(`/baskets/clear`)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Clear Basket failed");
    }
}

export const useClearBasket = () => {
    return useMutation(() => clearBasket())
}