import { FormEvent, useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { v4 as uuid } from "uuid";
import { useForm } from "@inertiajs/react";
import Button from "../Components/ui/button";
import HomeLayout from "../Components/layouts/HomeLayout";
import { MdOutlineAdd, MdOutlineDeleteOutline } from "react-icons/md";
import { UserTypes } from "../Types/user";
import Label from "../Components/ui/label";
import { Form } from "../Components/ui/form";
import { Input } from "../Components/ui/input";

/**
 * Create component for managing and submitting poll data.
 *
 * @param {UserTypes} user - The user information passed to the component.
 */
type UserType = {
    user: UserTypes;
};

export default function Create({ ...props }: UserType) {
    const [option, setOption] = useState<string>("");
    const [options, setOptions] = useState<{ id: string; value: string }[]>([]);

    // Form handling using Inertia useForm hook
    const { data, setData, post, errors, clearErrors, processing } = useForm({
        name: "",
        description: "",
        options: [],
    });

    /**
     * Effect to handle and display form validation errors.
     * Clears errors from the state after displaying them.
     */
    useEffect(() => {
        if (errors.name || errors.description || errors.options) {
            Object.keys(errors).forEach((key) => {
                toast.error(errors[key]);
            });
            clearErrors();
        }
    }, [errors, clearErrors]);

    /**
     * Adds a new option to the list of options.
     * Updates both local state and form data.
     */
    const addOption = useCallback(() => {
        const trimmedOption = option.trim();

        if (!trimmedOption) {
            toast.warning("Empty option is not allowed");
            return;
        }

        const newOption = { id: uuid(), value: trimmedOption };
        const updatedOptions = [...options, newOption];

        setOptions(updatedOptions);
        setData("options", updatedOptions);
        setOption("");
    }, [option, options, setData]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/create");
    };

    /**
     * Deletes an option from the list by its id.
     * Updates both local state and form data.
     *
     * @param {string} id - The id of the option to be deleted.
     */
    const onDeleteOption = (id: string) => {
        const updatedOptions = options.filter((opt) => opt.id !== id);
        setOptions(updatedOptions);
        setData("options", updatedOptions);
    };
    return (
        <HomeLayout user={props.user}>
            <Form className="gap-3 flex-1" onSubmit={onSubmit}>
                <Label.FormControll>
                    <Label.Text className="label">
                        <span>Title </span>
                    </Label.Text>
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Vote for the."
                        variant="outline"
                    />
                </Label.FormControll>
                <Label.FormControll>
                    <Label.Text>
                        <span>Description</span>
                    </Label.Text>
                    <Input
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        placeholder="(Optional) your vote description."
                        variant="outline"
                    />
                </Label.FormControll>
                <Label.FormControll>
                    <Label.Text>
                        <div>Vote Options </div>
                        <div className="text-gray-400 text-sm">
                            You cannot edit your vote options. Please
                            double-check 📌.
                        </div>
                    </Label.Text>
                    <div className="join gap-1">
                        <Input
                            value={option}
                            placeholder="Press Enter to add options."
                            variant="outline"
                            className="join-item"
                            onChange={(e) => setOption(e.target.value)}
                        />
                        <Button
                            className="join-item rounded"
                            variant="outline"
                            type="button"
                            onClick={addOption}
                        >
                            <MdOutlineAdd size={20} />
                        </Button>
                    </div>
                </Label.FormControll>
                <div className="min-h-10 flex items-center text-lg text-gray-50">
                    <ul className="w-full">
                        {options.map((opt) => (
                            <li
                                key={opt.id}
                                className="w-full h-12 flex items-center justify-between px-2"
                            >
                                <div>{opt.value}</div>
                                <MdOutlineDeleteOutline
                                    size={25}
                                    cursor={"pointer"}
                                    onClick={() => onDeleteOption(opt.id)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={processing}
                    className="text-lg"
                >
                    Create
                </Button>
            </Form>
            <Toaster richColors position="top-center" />
        </HomeLayout>
    );
}
