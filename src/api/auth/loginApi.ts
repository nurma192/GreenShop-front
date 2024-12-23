import {useMutation} from "react-query";
import {LoginFormBody} from "../../components/forms/LoginForm";
import {LoginResponse} from "../../models/response/AuthResponse";
import api from "../Api";
import {useNavigate} from "react-router-dom";


const login = async (data: LoginFormBody): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>(`/users/sign-in`, {
            email: data.email,
            password: data.password,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Login failed");
    }
};

export const useLogin = () => {
    return useMutation((data: LoginFormBody) => login(data), {
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
        },
    });
};
