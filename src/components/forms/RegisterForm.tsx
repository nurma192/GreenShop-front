import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import MyButton from "../ui/MyButton";
import {useRegister} from "../../api/auth/registerApi";
import {useSendVerifyMessage} from "../../api/auth/sendVerifyMessage";
import {MyInput} from "../ui/MyInput";
import {MyPasswordInput} from "../ui/MyPasswordInput";
import {RegisterResponse} from "../../models/response/RegisterResponse";
import {toast} from "sonner";

function RegisterForm() {
    const [registerFormError, setRegisterFormError] = useState<string>('');
    const {handleSubmit, control, watch} = useForm<RegisterResponse>()

    const {mutate: register, isLoading: registerLoading, ...registerQuery} = useRegister()
    const {mutate: sendVerifyMessage, isLoading: sendVerifyMessageLoading, ...sendCodeQuery} = useSendVerifyMessage()

    const onSubmitRegister: SubmitHandler<RegisterResponse> = async (data) => {
        register(data, {
            onError: (error) => {
                if (error instanceof Error) {
                    setRegisterFormError(error.message || 'An error occurred during registration.');
                } else {
                    setRegisterFormError('An unknown error occurred.');
                }
            },
            onSuccess: () => {
                sendVerifyMessage({email: data.email, redirect_url: "http://localhost:3000/verify"})
                toast.success("Successfully registered, we send email message that verify your account")
            }
        })
        ;
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitRegister)} className="flex flex-col gap-2">
                <MyInput
                    name={'email'}
                    label={'Email'}
                    type="email"
                    control={control}
                />
                <MyInput
                    name={'firstName'}
                    type="text"
                    label={'First Name'}
                    required="Name is required"
                    control={control}
                />
                <MyInput
                    name={'lastName'}
                    type="text"
                    label={'Last Name'}
                    required="Surname is required"
                    control={control}
                />
                <MyPasswordInput
                    name={'password'}
                    label={'Password'}
                    required="Password is required"
                    control={control}
                />
                <MyPasswordInput
                    name={'passwordConfirm'}
                    label={'Confirm Password'}
                    required="Password is required"
                    control={control}
                    validate={(value) =>
                        value === watch('password') || 'Passwords do not match'
                    }
                />
                {registerFormError && <span className="text-red-500 text-sm">{registerFormError}</span>}
                {registerQuery.isError && (registerQuery.error instanceof Error) &&
					<span className="text-red-500 text-sm">{registerQuery.error.message}</span>}
                {sendCodeQuery.isError && (sendCodeQuery.error instanceof Error) &&
					<span className="text-red-500 text-sm">{sendCodeQuery.error.message}</span>}
                <MyButton
                    className="w-full mb-4 py-2"
                    color="primary"
                    type="submit"
                    disabled={registerLoading}
                >
                    Register
                </MyButton>
            </form>
        </>
    );
}

export default RegisterForm;
