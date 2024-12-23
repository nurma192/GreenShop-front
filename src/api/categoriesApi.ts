import {useQuery} from "react-query";
import api from "./Api";
import {Category} from "../models/Category";

export const getCategories = async (): Promise<{categories: Category[]}> => {
    try {
        const res = await api.get<{categories: Category[]}>(`/categories`);
        console.log(res.data)
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Register failed");
    }
}

export const useCategoriesData = () => {
    return useQuery<{categories: Category[]}>('categories', () => getCategories());
};
