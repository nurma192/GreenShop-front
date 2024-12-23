import {useQuery} from 'react-query';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../store/userSlice";
import {IUser} from "../models/IUser";
import api from "./Api";

export const getUserData = async (): Promise<IUser> => {
    try {
        const response = await api.get<IUser>(`/users/me`)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Register failed");
    }

};

export const useUserData = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return useQuery<IUser>('iUser', () => getUserData(), {
        onError: (err: any) => {
            if (err.message === '401') {
                navigate('/login');
            }
        },
        onSuccess: (data) => {
            dispatch(setUser(data))
        }
    });
};
