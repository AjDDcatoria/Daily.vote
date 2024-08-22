import { PollTypes } from "../../Types/component";
import Avatar from "./avatar";

export default function Card({
    theme,
    icon,
    user,
    name,
    current = false,
    ...props
}: PollTypes) {
    return (
        <div
            {...props}
            className={`card-bg-${theme} translate-x-4 translate-y-4 rounded-md container max-w-[600px]`}
        >
            <div className="card-div flex flex-col gap-3 p-4 relative text-gray-100 text-xl font-semibold border border-gray-400/30 rounded-md cursor-pointer  w-full -translate-x-4 -translate-y-4 hover:-translate-x-0 hover:-translate-y-0  hover:border-none ease-in duration-150">
                <label
                    htmlFor="icon"
                    className="absolute text-4xl -top-6 right-1"
                >
                    {icon}
                </label>
                <div className="flex gap-2 items-center">
                    <Avatar src={user.avatar} alt={user.username} />
                    <label className="text-lg font-normal">
                        {user.username}
                    </label>
                </div>
                <div>
                    {name.length > 80 ? `${name.substring(0, 90)} . . .` : name}
                </div>
                <label
                    htmlFor="expired"
                    className={`${
                        current ? "bg-green-600" : "bg-yellow-400 text-gray-800"
                    } w-fit h-fit  px-3 rounded-full text-sm  py-1 font-semibold`}
                >
                    {current ? "Active" : "Expired"}
                </label>
            </div>
        </div>
    );
}
