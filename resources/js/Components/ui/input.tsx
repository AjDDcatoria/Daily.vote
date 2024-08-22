import React, { ForwardedRef, InputHTMLAttributes } from "react";

interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    variant?: "outline" | "grow";
}

const Variants = (variant: string): string => {
    const variants = {
        outline: "input input-bordered w-full input-primary",
        grow: "grow",
    };

    return variants[variant] || "";
};

export const Input = React.forwardRef<HTMLInputElement, InputTypes>(
    ({ className, variant, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
        return (
            <input
                {...props}
                ref={ref}
                className={`${className} ${Variants(variant)}`}
            />
        );
    }
);
