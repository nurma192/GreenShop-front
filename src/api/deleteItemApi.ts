import {useMutation} from "react-query";
import api from "./Api";
import {RegisterResponse} from "../models/response/RegisterResponse";

const deleteItem = async (id: string)=>  {
    try {
        const response = await api.delete<RegisterResponse>(`/items/${id}`)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Delete item failed");
    }
}

export const useDeleteItem = () => {
    return useMutation((id: string) => deleteItem(id))
}