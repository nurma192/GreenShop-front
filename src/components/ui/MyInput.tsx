
import {Input} from "@nextui-org/react";
import {Control, useController} from "react-hook-form";
import React from "react";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    control: Control<any>;
    required?: string;
    validate?: (value: any) => string | boolean;
    endContent?: JSX.Element;
    isRequired?: boolean;
    labelPlacement?: "inside" | "outside" | "outside-left" | undefined;
}

export const MyInput: React.FC<Props> = ({
                                             name,
                                             label,
                                             placeholder,
                                             type = "text",
                                             control,
                                             required = '',
                                             endContent,
                                             validate,
                                             isRequired,
                                             labelPlacement
                                         }
) => {

    const {field, fieldState: {invalid}, formState: {errors}} = useController({
        name,
        control,
        rules: {
            required,
            validate
        }
    })

    return (
        <Input
            id={name}
            label={label}
            type={type}
            labelPlacement={labelPlacement}
            isRequired={!!required || isRequired}
            placeholder={placeholder}
            value={field.value}
            name={field.name}
            isInvalid={invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={`${errors[name]?.message ?? ''}`}
            classNames={{
                inputWrapper: `rounded border border-neural-700 bg-white`,
                input: `${type === 'password' && 'tracking-widest'}`
            }}
            className={``}
            endContent={endContent}
        />
    );
}
