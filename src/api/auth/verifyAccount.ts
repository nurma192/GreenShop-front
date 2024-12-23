import {useMutation} from "react-query";
import api from "../Api";

const verifyAccount = async (token: string) => {
    try {
        const res = await api.get(`/users/verify-email?token=${token}`)
        return res.data
    } catch (err: any) {
        throw new Error(err?.response?.data?.detail || 'Verify Email Error')
    }
}

export const useVerifyAccount = () => {
    return useMutation((token: string) => verifyAccount(token));
}