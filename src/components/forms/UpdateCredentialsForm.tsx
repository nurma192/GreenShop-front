import MyButton from "../ui/MyButton";
import {SubmitHandler, useForm} from "react-hook-form";
import {MyInput} from "../ui/MyInput";
import {UpdateCredentialsBody, useUpdateProfile} from "../../api/updateCredentialsApi";
import {CircularProgress} from "@nextui-org/react";
import React, {useState} from "react";
import {IUser} from "../../models/IUser";
import MyImage from "../ui/MyImage";
import {MyPasswordInput} from "../ui/MyPasswordInput";

type UpdateCredentialFormBody = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    currentPassword: string;
    password: string;
}

interface Props {
    userData: IUser
}

function UpdateCredentialsForm({userData}: Props) {
    const [imagePreviews, setImagePreviews] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
            setImagePreviews(URL.createObjectURL(e.target.files[0]));
        }
    };

    const deleteImage = (index: number) => {
        setImage(null);
        setImagePreviews(null);
    };

    const {handleSubmit, control, formState: {errors}, watch} = useForm<UpdateCredentialFormBody>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
        }
    });
    const {mutate: updateCredentials, isLoading: isLoadingCredentials} = useUpdateProfile()

    const submitForm: SubmitHandler<UpdateCredentialFormBody> = (data) => {
        console.log(data)
        const credentials: UpdateCredentialsBody = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            currentPassword: data.currentPassword,
            profilePicture: image!
        }
        updateCredentials(credentials)
    }

    return (
        <form className="w-full flex flex-col" onSubmit={handleSubmit(submitForm)}>
            <div className="w-full grid grid-cols-2 gap-7 ">
                <MyInput name={`firstName`}
                         label={'First Name'}
                         control={control}
                         required={"First Name is required"}
                />
                <MyInput name={`lastName`}
                         label={`Last Name`}
                         control={control}
                         required={"Last Name is required"}
                />
                <MyInput name={`email`}
                         label={`Email`}
                         required={"Email is required"}
                         control={control}
                />
                <MyInput name={`phoneNumber`}
                         label={`Phone Number`}
                         control={control}
                />
                <div className="flex flex-col gap-2">
                    <MyPasswordInput
                        name={'currentPassword'}
                        label={'Current Password'}
                        control={control}
                    />
                    <MyPasswordInput
                        name={'password'}
                        label={'Password'}
                        control={control}
                        validate={(value) =>
                            value === watch('password') || 'Passwords do not match'
                        }
                    />
                </div>
                <div className="flex flex-col">
                    <div className="">
                        {
                            imagePreviews ? (
                                <img
                                    className="w-[100px] aspect-square"
                                    src={imagePreviews}
                                    alt="Preview"
                                />
                            ) : userData.photo_url ? (
                                <MyImage
                                    className="w-[100px] aspect-square"
                                    src={`${userData.photo_url}`}
                                />
                            ) : (
                                <img
                                    className="w-[100px] aspect-square"
                                    src="/icons/addPhoto-scelet.svg"
                                    alt="Add Photo"
                                />
                            )
                        }
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2"
                        disabled={!!image}
                    />
                </div>
            </div>
            <MyButton
                type={`submit`}
                color={`primary`}
                className={`px-5 py-2 mt-4 ml-auto`}
                disabled={isLoadingCredentials}
            >Change Info</MyButton>
            {(isLoadingCredentials)
                && <CircularProgress
			        color={'primary'}
					size={"lg"}
					label="Updating..."
				/>}
        </form>
    )
}

export default UpdateCredentialsForm;
