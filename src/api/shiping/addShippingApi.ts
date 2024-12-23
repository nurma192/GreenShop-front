import {useMutation} from "react-query";
import api from "../Api";

export type addShippingResponse = {
    name: string,
    firstName: string,
    lastName: string,
    country: string,
    town: string,
    street: string,
    apartment: string,
    state: string,
    zip: string,
    emailAddress: string,
    phoneNumber: string
}

const addShipping = async (data: addShippingResponse) => {
    try {
        const {
            name,
            firstName,
            lastName,
            country,
            town,
            street,
            apartment,
            state,
            zip,
            emailAddress,
            phoneNumber
        } = data
        const response = await api.post(`/addresses/shipping`, {
            name,
            firstName,
            lastName,
            country,
            town,
            street,
            apartment,
            state,
            zip,
            emailAddress,
            phoneNumber
        })
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Add Shipping failed");
    }
}

export const useAddShipping = () => {
    return useMutation((data: addShippingResponse) => addShipping(data))
}