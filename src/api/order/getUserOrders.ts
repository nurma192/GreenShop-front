import {useQuery} from "react-query";
import api from "../Api";
import {OrderResponse} from "../../pages/MyOrdersPage";

type Response = {
    orders: OrderResponse[];
    "pagination": {
        "totalOrders": number,
        "totalPages": number,
        "currentPage": number,
        "perPage": number
    }
}

const getUserOrders = async () => {
    try {
        const response = await api.get<Response>(`/orders`);
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Get User Orders failed");
    }
}

export const useGetUserOrders = () => {
    return useQuery(['orders'], () => getUserOrders());
}
