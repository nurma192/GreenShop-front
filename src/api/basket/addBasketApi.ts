import {useMutation} from "react-query";
import api from "../Api";
import {AddBasketResponse} from "../../models/response/AddBasketResponse";

const addBasket = async (data: AddBasketResponse) => {
    try {
        const response = await api.post(`/baskets/add`, {
            itemId: data.itemId,
            quantity: data.quantity,
        })
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Add Basket failed");
    }
}

export const useAddBasket = () => {
    return useMutation((data: AddBasketResponse) => addBasket(data))
}