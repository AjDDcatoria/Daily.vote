import { Link } from "@inertiajs/react";

interface TitleProps {
    className?: string;
    size?: "sm" | "lg";
}

const TextSize = {
    sm: "text-4xl font-bold",
    lg: "text-5xl font-extrabold",
};

const SpanSize = {
    lg: "text-2xl",
    sm: "text-lg",
};

export default function Title({ className, size }: TitleProps) {
    return (
        <Link href="/" className={`${className}`}>
            <h2 className={`${TextSize[size]} text-gray-200 `}>
                Daily
                <span className={`${SpanSize[size]} text-gray-300`}>.vote</span>
            </h2>
        </Link>
    );
}
