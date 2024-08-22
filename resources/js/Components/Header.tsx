import { Dropdown, Group, List, Trigger } from "./ui/dropdown";
import { Link, useForm } from "@inertiajs/react";
import { MdOutlineAdd } from "react-icons/md";
import Title from "./ui/title";
import { FiUser } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { UserTypes } from "../Types/user";
import Avatar from "./ui/avatar";

interface HeaderTypes {
    user: UserTypes | null;
}
/**
 * Header component displaying navigation options and user actions.
 *
 * @param {HeaderTypes} user - Component props
 */
export default function Header({ user }: HeaderTypes) {
    const { post, get } = useForm();
    return (
        <header className="w-full h-10 items-center flex justify-between my-8 mt-14">
            <Title size="sm" />
            {user ? (
                <Dropdown>
                    <Trigger>
                        <Avatar src={user.avatar} alt={user.username} />
                    </Trigger>
                    <Group className="bg-base-200">
                        <List>
                            <label>Profile</label>
                            <FiUser size={20} />
                        </List>
                        <List onClick={() => get("/create")}>
                            <label>Create</label>
                            <MdOutlineAdd size={20} />
                        </List>
                        <List onClick={() => post("/logout")}>
                            <label>Logout</label>
                            <TbLogout2 size={20} />
                        </List>
                    </Group>
                </Dropdown>
            ) : (
                <Link
                    href="/login"
                    className="btn btn-primary rounded btn-sm text-lg pb-8 pt-1 px-7"
                >
                    Login
                </Link>
            )}
        </header>
    );
}
