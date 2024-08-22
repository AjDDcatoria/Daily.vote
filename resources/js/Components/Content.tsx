import React, { ReactNode } from "react";

type ContentTypes = {
    children: ReactNode;
};

export default function Content({ children }: ContentTypes) {
    return <div className="flex-1 w-full mt-3">{children}</div>;
}
