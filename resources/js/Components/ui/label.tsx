import { FC } from "react";
import { ComponentProps } from "../../Types/component";

const Input: FC<ComponentProps> = ({ children, className, ...props }) => {
    return (
        <label
            {...props}
            className={`${className} input input-bordered flex items-center gap-2`}
        >
            {children}
        </label>
    );
};

const FormControll: FC<ComponentProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <label {...props} className="form-control w-full">
            {children}
        </label>
    );
};

const Text: FC<ComponentProps> = ({ children, className, ...props }) => {
    return (
        <div className={`${className} label`} {...props}>
            <label className="label-text text-xl text-gray-100">
                {children}
            </label>
        </div>
    );
};

const Title: FC<ComponentProps> = ({ children, className, ...props }) => {
    return (
        <label {...props} className={`${className} text-3xl  font-bold`}>
            {children}
        </label>
    );
};

export default {
    FormControll,
    Input,
    Text,
    Title,
};
