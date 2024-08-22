import { FormEvent, useEffect } from "react";
import AuthLayout from "../../Components/layouts/AuthLayout";
import Label from "../../Components/ui/label";
import EmailIcon from "../../Components/svgs/EmailIcon";
import PasswordIcon from "../../Components/svgs/PasswordIcon";
import Button from "../../Components/ui/button";
import UserIcon from "../../Components/svgs/UserIcon";
import { Link, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Form } from "../../Components/ui/form";
import { Input } from "../../Components/ui/input";

type FormFields = "username" | "email" | "password";

/**
 *  Regisger component for user Registration
 */
export default function Register() {
    // Form handling using Inertia useForm hook
    const { post, processing, errors, setData, clearErrors } = useForm({
        username: "",
        email: "",
        password: "",
    });

    /**
     * Handles form submission.
     *
     * @param {FormEvent} e - The form submit event.
     */
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/register");
    };

    /**
     * Effect hook to handle and display form validation errors.
     * This effect will show errors as toast notifications and clear them from the state.
     */
    useEffect(() => {
        if (errors.username || errors.email || errors.password || errors[0]) {
            Object.keys(errors).forEach((key) => {
                toast.error(errors[key]);
            });
            clearErrors();
        }
    }, [errors, clearErrors]);

    return (
        <AuthLayout processing={processing}>
            <Form onSubmit={onSubmit} className=" gap-2 w-full mb-5">
                {["Username", "Email", "Password"].map((input, index) => {
                    const icons = [
                        <UserIcon />,
                        <EmailIcon />,
                        <PasswordIcon />,
                    ];
                    return (
                        <Label.Input key={index}>
                            {icons[index]}
                            <Input
                                type={input.toLowerCase()}
                                placeholder={input}
                                variant="grow"
                                required
                                onChange={(e) =>
                                    setData(
                                        input.toLowerCase() as FormFields,
                                        e.target.value
                                    )
                                }
                            />
                        </Label.Input>
                    );
                })}
                <Button type="submit" variant="primary" disabled={processing}>
                    REGISTER
                </Button>
            </Form>
            <Link href="/login" className="link link-hover">
                Already registered?
            </Link>
        </AuthLayout>
    );
}
