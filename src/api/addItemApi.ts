import {useMutation} from "react-query";
import {AddItemFormBody} from "../pages/AddItem";
import {useNavigate} from "react-router-dom";
import api from "./Api";

const appendField = (formData: FormData, key: string, value: string | File | (string | File)[]) => {
    if (Array.isArray(value)) {
        value.forEach(item => formData.append(key, item));
    } else {
        formData.append(key, value);
    }
};


export const addItem = async (data: AddItemFormBody): Promise<any> => {
    const formData = new FormData();
    console.log(data);

    appendField(formData, 'title', data.title);
    appendField(formData, 'shortDescription', data.shortDescription);
    appendField(formData, 'cost', data.cost);
    appendField(formData, 'size', data.size);
    appendField(formData, 'categories', [...data.categories]);
    appendField(formData, 'productDescription', data.productDescription);
    appendField(formData, 'images', data.images || []);

    console.log("formData", formData);

    try {
        const res = await api.post("/items", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "addItem failed");
    }


    // toast.promise(json, {
    //     loading: 'Loading...',
    //     success: (data) => {
    //         return `Item "${data.name}" has been added successfully.`;
    //     },
    //     error: (error) => {
    //         return error.message || 'Failed to add item';
    //     },
    // });

}

export const useAddItem = () => {
    const navigate = useNavigate();

    return useMutation((data: AddItemFormBody) => addItem(data), {
        onSuccess: () => {
            navigate('/')
        },
    });
};
