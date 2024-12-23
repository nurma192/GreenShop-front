import {useMutation} from "react-query";
import api from "../Api";
import {SendVerifyMessageResponse} from "../../models/response/SendVerifyMessageResponse";

const sendVerifyMessageToEmail = async (data: SendVerifyMessageResponse) => {
    try {
        const res = await api.post(`/users/verify-email?redirect_url=${data.redirect_url}`, {email: data.email})
        return res.data
    } catch (err: any) {
        throw new Error(err?.response?.data?.detail || 'Verify Email Error')
    }

}

export const useSendVerifyMessage = () => {
    return useMutation((data: SendVerifyMessageResponse) => sendVerifyMessageToEmail(data), {
        onSuccess: data => {
            console.log(data)
        }
    });
}