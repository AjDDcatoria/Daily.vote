import { useEffect, useState } from "react";
import Label from "../ui/label";
import HomeLayout from "./HomeLayout";
import { PollTypes } from "../../Types/component";
import { UserTypes } from "../../Types/user";
import { formatTimeDifference } from "../../Utils/date";

interface PollComponentProps {
    poll: PollTypes;
    user: UserTypes;
    children?: React.ReactNode;
}

const PollComponent: React.FC<PollComponentProps> = ({
    poll,
    user,
    children,
}) => {
    const [timeLeft, setTimeLeft] = useState<string>("");

    useEffect(() => {
        const updateTimeLeft = () => {
            const formattedTime = formatTimeDifference(poll.expired);
            setTimeLeft(formattedTime);
        };

        updateTimeLeft();

        const intervalId = setInterval(updateTimeLeft, 1000);

        return () => clearInterval(intervalId);
    }, [poll.created_at]);

    return (
        <HomeLayout user={user}>
            <div className="w-full h-full flex flex-col gap-4 pb-10">
                <div className="flex flex-col gap-3">
                    <div>
                        <div>
                            <Label.Title className="text-gray-100">
                                {poll.name}
                            </Label.Title>
                        </div>
                        <div className="text-lg">
                            <span>{poll.description}</span>
                        </div>
                    </div>
                    <div>
                        <Label.Title className="text-gray-500">
                            {timeLeft}
                        </Label.Title>
                    </div>
                </div>
                <div className="h-full">{children}</div>
            </div>
        </HomeLayout>
    );
};

export default PollComponent;
