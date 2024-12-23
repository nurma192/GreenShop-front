import React from 'react';
import {Button} from "@nextui-org/react";

interface Props {
    children?: React.ReactNode;
    color?: "primary" | "transparent" | "danger";
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    icon?: JSX.Element;
}

function MyButton({children, color = "primary", className, type = "button", onClick, disabled, icon}: Props) {
    let colorClassName = ""
    if (color === "primary") {
        colorClassName = ` text-white bg-primary`
    } else if (color === "transparent") {
        colorClassName = ` text-black bg-transparent border border-primary text-primary hover:bg-primary hover:bg-opacity-10`
    } else if (color === "danger") {
        colorClassName = ` text-red-500 bg-transparent border border-transparent border-red-500 hover:bg-red-500 hover:text-white`
    }
    return (
        <Button
            className={`${className} h-auto w-auto min-w-min rounded transition ${colorClassName} disabled:cursor-not-allowed`}
            type={type}
            onClick={() => onClick && onClick()}
            disabled={disabled}
        >
            <div className={`m-0 gap-2 flex items-center`}>
                {icon}
                {children}
            </div>
        </Button>
    );
}

export default MyButton;
