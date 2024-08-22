import { FC } from "react";
import { ComponentProps, OptionTypes } from "../../Types/component";

const Container: FC<ComponentProps> = ({ children, className, ...props }) => {
    return (
        <div className="flex">
            <ul
                {...props}
                className="text-gray-50 font-semibold text-xl flex flex-col py-2 select-none w-full"
            >
                {children}
            </ul>
        </div>
    );
};

interface VoteListTypes {
    op: OptionTypes;
    className?: string;
    onClick?: () => void;
}

const List: FC<VoteListTypes> = ({ className, op, ...props }) => {
    return (
        <li
            {...props}
            className="min-h-[70px] flex flex-col cursor-pointer w-full"
        >
            <div className="w-full h-full flex items-center text-wrap">
                {op.name.length < 22
                    ? op.name
                    : `${op.name.substring(0, 22)} . . .`}
            </div>
            <div className="w-full flex gap-2 items-center">
                <progress
                    className="progress max-w-[400px] w-full"
                    value={op.votes_count}
                    max="10"
                />
                <span className="text-gray-400 font-thin text-nowrap">
                    {op.votes_count} votes
                </span>
            </div>
        </li>
    );
};

export default {
    Container,
    List,
};
