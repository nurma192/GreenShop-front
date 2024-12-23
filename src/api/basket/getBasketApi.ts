import { useQuery} from "react-query";
import api from "../Api";
import {Basket} from "../../models/basket";

const getBasket = async () => {
    try {
        const response = await api.get<Basket>(`/baskets`)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Get Basket failed");
    }
}

export const useGetBasket = () => {
    return useQuery<Basket>(
        'basket',
        getBasket
    );
}