import {useQuery} from "react-query";
import api from "./Api";
import {GetItemResponse} from "../models/response/GetItemResponse";


const getItemById = async (id: string) => {
    try {
        const response = await api.get<GetItemResponse>(`/items/${id}`)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Get Item By Id failed");
    }
}

export const useGetItemById = (id: string | undefined) => {
    return useQuery<GetItemResponse>(['item', id], () => getItemById(id!), {
        enabled: !!id,
    });
}
