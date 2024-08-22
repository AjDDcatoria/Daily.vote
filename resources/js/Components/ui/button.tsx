import { ButtonHTMLAttributes } from "react";
import { ComponentProps } from "../../Types/component";

type ButtonTypes = ComponentProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: "neutral" | "active" | "outline" | "secondary" | "primary";
    };

const Vartians = (variant: string): string => {
    const variants = {
        neutral: "btn-neutral",
        active: "btn-active",
        outline: "btn-active border-indigo-400 hover:border-indigo-400",
        secondary: "btn-secondary",
        primary: "bg-primary hover:bg-primary-hover text-gray-300",
    };

    return variants[variant] || "";
};

export default function Button({
    children,
    variant,
    className,
    ...props
}: ButtonTypes) {
    return (
        <button className={`btn ${Vartians(variant)} ${className}`} {...props}>
            {children}
        </button>
    );
}
