import {useQuery} from 'react-query';
import {useCustomParams} from "../hooks/useCustomParams";
import api from "./Api";
import {GetItemsResponse} from "../models/response/GetItemsResponse";

export const getAllItemsApi = async (page: string,
                                     category: string,
                                     size: string,
                                     sortBy: string,
                                     priceRange: number[],
                                     type: string,
                                     query: string
) => {
    const params = new URLSearchParams({
        page,
        category,
        size,
        query,
        sortBy: `${sortBy}${(type === 'new') ? '+new-arrivals' : ''}`,
        minPrice: priceRange[0].toString(),
        maxPrice: priceRange[1].toString(),
    });
    try {
        const response = await api.get<GetItemsResponse>(`/items?${params.toString()}`);
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Get All Items failed");
    }
};

export const useGetAllItems = () => {
    const customParams = useCustomParams()

    return useQuery<GetItemsResponse>('allItems', () => getAllItemsApi(
        customParams.getPageFromParam().toString(),
        customParams.getCategoryFromParam(),
        customParams.getSizeFromParam(),
        customParams.getSortTypeFromParam(),
        customParams.getPriceRangeFromParam(),
        customParams.getTypeFromParam(),
        customParams.getQueryFromParam(),

    ));
};
