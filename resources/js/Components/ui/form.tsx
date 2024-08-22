import { FC, FormHTMLAttributes, ReactNode } from "react";

interface FormType extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
    className?: string;
}

export const Form: FC<FormType> = ({ children, className, ...props }) => {
    return (
        <form {...props} className={`${className} flex flex-col`}>
            {children}
        </form>
    );
};
