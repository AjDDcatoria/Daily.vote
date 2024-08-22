import { ReactNode } from "react";
import { UserTypes } from "./user";

export interface ComponentProps {
    children: ReactNode;
    className?: string;
}

export interface IformInput {
    name: string;
    description: string | null;
    option: { key: string; value: string }[];
}

export interface PollTypes {
    created_at: string;
    description: string | null;
    expired: string;
    icon: string;
    id: string;
    name: string;
    theme: "yellow" | "green" | "purple" | "blue";
    user: UserTypes;
    current: boolean;
    options: OptionTypes[];
    comments: Comments[];
    onClick?: () => void;
}

export interface OptionTypes {
    created_at: string;
    name: string;
    poll_id: string;
    updated_at: string;
    votes_count: number;
    id: number;
}

export interface Comments {
    comment: string;
    user: UserTypes;
    created_at: string;
    updated_at: string;
}

export interface HomePropsTypes {
    user: UserTypes | null;
    poll: {
        currentPoll: PollTypes[];
        pastPoll: PollTypes[];
    };
}
