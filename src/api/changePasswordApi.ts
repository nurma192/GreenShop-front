import {useMutation} from "react-query";
import {useAuth} from "../hooks/useAuth";

export type ChangePasswordBody = {
    currentPassword: string;
    newPassword: string;
}

const changePassword = async (data: ChangePasswordBody, token: string): Promise<any> => {
    const url = `${process.env.REACT_APP_API_URL}/api/profile/changepassword`;

    const response = await fetch(url, {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        })
    })

    const json = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to fetch update Password ${json.message ?? response.statusText}`);
    }

    return json
}

export const useChangePassword = () => {
    const {token} = useAuth()
    return useMutation((data: ChangePasswordBody) => changePassword(data, token))
}