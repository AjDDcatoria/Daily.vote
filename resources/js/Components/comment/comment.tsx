import React, { FC } from "react";
import { ComponentProps } from "../../Types/component";
import Avatar from "../ui/avatar";

const Container: FC<ComponentProps> = ({ children, className, ...props }) => {
    return (
        <div
            {...props}
            className={`${className} border border-gray-400/20 rounded h-full min-h-[400px] p-3 flex flex-col overflow-y-auto`}
        >
            {children}
        </div>
    );
};

const Box: FC<ComponentProps> = ({ children, className, ...props }) => {
    return (
        <div className="flex h-full flex-col pt-3">
            <div
                {...props}
                className={`${className} flex flex-col gap-2 max-h-[450px] overflow-y-auto pr-20`}
            >
                {children}
            </div>
        </div>
    );
};

const Message: FC<{ className?: string; comment: any }> = ({
    className,
    comment,
    ...props
}) => {
    return (
        <div {...props} className="flex gap-2 h-full select-none">
            <div>
                <div className="avatar placeholder">
                    <Avatar
                        src={comment.user.avatar}
                        alt={comment.user.username}
                    />
                </div>
            </div>
            <div className="h-full">
                <div className="w-full leading-[14px] pt-1">
                    <div className="text-[15px] text-gray-100 h-fit">
                        {comment.user.username}
                    </div>
                    <div className="h-fit text-lg">{comment.comment}</div>
                </div>
            </div>
        </div>
    );
};

export default {
    Container,
    Box,
    Message,
};
