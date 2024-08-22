import React from "react";

type AvatarType = {
    src: string | null;
    alt: string;
};

export default function Avatar({ src, alt }: AvatarType) {
    return (
        <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-11 rounded-full">
                {src ? (
                    <img src={src} />
                ) : (
                    <span className="text-xl">{alt.substring(0, 2)}</span>
                )}
            </div>
        </div>
    );
}
