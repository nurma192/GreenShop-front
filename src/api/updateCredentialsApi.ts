
import {useMutation} from "react-query";
import {RegisterResponse} from "../models/response/RegisterResponse";
import api from "./Api";

export type UpdateCredentialsBody = {
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    currentPassword?: string,
    phoneNumber?: string,
    profilePicture?: File
}

const updateProfile = async (data: UpdateCredentialsBody) => {
    console.log(data)
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
    if (data.profilePicture) {
        console.log("Profile picture:", data.profilePicture);
        formData.append("profilePicture", data.profilePicture);
    }
    if (data.password) formData.append("password", data.password);
    if (data.currentPassword) formData.append("currentPassword", data.currentPassword);


    try {
        const response = await api.put(`/users/update-profile`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Register failed");
    }
}

export const useUpdateProfile = () => {
    return useMutation((data: UpdateCredentialsBody) => updateProfile(data))
}