import React, { ReactNode } from "react";

type ContainerTypes = {
    children: ReactNode;
};

export default function Container({ children }: ContainerTypes) {
    return <div className="flex justify-center h-screen">{children}</div>;
}
