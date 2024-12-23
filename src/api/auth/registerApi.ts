import {useMutation} from "react-query";
import api from "../Api";
import {RegisterResponse} from "../../models/response/RegisterResponse";

const register = async (data: RegisterResponse) => {
    try {
        const response = await api.post<RegisterResponse>(`/users/sign-up`, {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
        })
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Register failed");
    }
}

export const useRegister = () => {
    return useMutation((data: RegisterResponse) => register(data))
}