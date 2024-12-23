import React, {forwardRef} from 'react';
import {Textarea, TextAreaProps} from "@nextui-org/react";
import {Control, useController} from "react-hook-form";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    control: Control<any>;
    required?: string;
    validate?: (value: any) => string | boolean;
    endContent?: JSX.Element;
}

export const MyTextarea: React.FC<Props> = ({
                                             name,
                                             label,
                                             placeholder,
                                             control,
                                             required = '',
                                             endContent,
                                             validate
                                         }
) => {
    const {field, fieldState: {invalid}, formState:{errors}} = useController({
        name,
        control,
        rules:{
            required,
            validate
        }

    })
    return (
        <Textarea
            id={name}
            label={label}
            placeholder={placeholder}
            value={field.value}
            name={field.name}
            isInvalid={invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={`${errors[name]?.message ?? ''}`}
            classNames={{
                inputWrapper: "border border-neutral-200 bg-white rounded",
            }}
            endContent={endContent}
        />
    );
}

export default MyTextarea;
