import { FormEvent, useEffect } from "react";
import Button from "../../Components/ui/button";
import AuthLayout from "../../Components/layouts/AuthLayout";
import EmailIcon from "../../Components/svgs/EmailIcon";
import PasswordIcon from "../../Components/svgs/PasswordIcon";
import Label from "../../Components/ui/label";
import { Link, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Form } from "../../Components/ui/form";
import { Input } from "../../Components/ui/input";

type FormFields = "email" | "password";

/**
 *  Login component for user authentication.
 */
export default function Login() {
    // Form handling using Inertia useForm hook
    const { setData, post, processing, errors, clearErrors } = useForm({
        email: "",
        password: "",
    });

    /**
     * Effect hook to handle and display form validation errors.
     * This effect will show errors as toast notifications and clear them from the state.
     */
    useEffect(() => {
        if (errors.email || errors.password || errors[0]) {
            Object.keys(errors).forEach((key) => {
                toast.error(errors[key]);
            });
            clearErrors();
        }
    }, [errors, clearErrors]);

    /**
     * Handles form submission.
     *
     * @param {FormEvent} e - The form submit event.
     */
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <AuthLayout processing={processing}>
            <Form onSubmit={onSubmit} className="gap-2 w-full mb-5">
                {["Email", "Password"].map((input, index) => {
                    const icons = [<EmailIcon />, <PasswordIcon />];
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
                    LOGIN
                </Button>
            </Form>
            <Link href="/register" className="link link-hover">
                Don't have account?
            </Link>
        </AuthLayout>
    );
}
