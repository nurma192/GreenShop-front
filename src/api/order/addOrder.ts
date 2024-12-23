import {useMutation} from "react-query";
import api from "../Api";
import {Order} from "../../models/Order";

export type addShippingResponse = {
    shippingAddressId: string,
    items: {
        item: string,
        quantity: number
    }[]
    orderNotes: string
}

const addOrder = async (data: addShippingResponse) => {
    try {
        const {shippingAddressId, items, orderNotes} = data
        const response = await api.post<{detail:string, order:Order }>(`/orders`, {
            shippingAddressId, items, orderNotes
        })
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Add Shipping failed");
    }
}

export const useAddOrder = () => {
    return useMutation((data: addShippingResponse) => addOrder(data))
}