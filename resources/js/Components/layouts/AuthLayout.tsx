import { MouseEvent, ReactNode } from "react";
import Button from "../ui/button";
import { Toaster } from "sonner";
import Title from "../ui/title";
import { useForm } from "@inertiajs/react";
import { FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

interface AuthLayoutTypes {
    children: ReactNode;
    processing?: boolean;
}

/**
 * Layout component for authentication pages.
 *
 * This component provides a consistent layout for authentication pages, including
 * social login buttons and a section for additional content (like login forms).
 * It also handles the redirection for social login providers.
 *
 * @param {AuthLayoutTypes} props The component props.
 * @param {ReactNode} props.children The content to be displayed within the layout.
 * @param {boolean} [props.processing=false] Optional flag indicating if a processing state is active.
 */
export default function AuthLayout({ children, processing }: AuthLayoutTypes) {
    const { post } = useForm();

    /**
     * Handle the social login button click event.
     *
     * This function extracts the provider name from the button's data attribute
     * and performs a POST request to initiate the social login process.
     *
     * @param {MouseEvent<HTMLButtonElement>} e The click event object.
     */
    const handleSocial = (e: MouseEvent<HTMLButtonElement>) => {
        const provider = e.currentTarget.getAttribute("data-provider");
        post(`/social?provider=${provider}`);
    };

    return (
        <>
            <div className="h-dvh flex justify-center items-center text-center">
                <div className="flex gap-2 flex-col max-w-96 w-full">
                    <Title size="lg" className="mb-5" />
                    <div className="flex gap-2 pr-2">
                        {["Google", "Github"].map((provider, index) => {
                            const icons = [
                                <FcGoogle size={17} />,
                                <FiGithub size={17} />,
                            ];
                            return (
                                <Button
                                    key={provider}
                                    variant="active"
                                    className="rounded-md w-1/2"
                                    disabled={processing}
                                    data-provider={`${provider.toLowerCase()}`}
                                    onClick={handleSocial}
                                >
                                    {icons[index]}
                                    {provider}
                                </Button>
                            );
                        })}
                    </div>
                    <div className="relative text-gray-600 text-sm flex gap-2 items-center before:w-1/2 before:border-gray-800 before:border after:border-gray-800 after:w-1/2 after:border">
                        OR
                    </div>
                    <div>{children}</div>
                </div>
            </div>
            <Toaster position="top-right" richColors />
        </>
    );
}
