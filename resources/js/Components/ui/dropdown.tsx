import { FC } from "react";
import { ComponentProps } from "../../Types/component";

export const Dropdown: FC<ComponentProps> = ({ children, className }) => {
    return (
        <div className={`dropdown dropdown-end ${className}`}>{children}</div>
    );
};

export const Trigger: FC<ComponentProps> = ({ children, className }) => {
    return (
        <div tabIndex={0} role="button" className={`${className}`}>
            {children}
        </div>
    );
};

export const Group: FC<ComponentProps> = ({ children, className }) => {
    return (
        <ul
            tabIndex={0}
            className={`${className} dropdown-content menu bg-base-100 rounded z-[1] w-52 p-2 shadow border border-gray-400/20 translate-y-3`}
        >
            {children}
        </ul>
    );
};

interface ListProps extends ComponentProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const List: FC<ListProps> = ({
    children,
    onClick,
    className,
    ...props
}) => {
    return (
        <li className={className} {...props}>
            <div
                onClick={onClick}
                className="flex items-center justify-between w-full"
            >
                {children}
            </div>
        </li>
    );
};
