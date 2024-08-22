import { useForm } from "@inertiajs/react";
import HomeLayout from "../Components/layouts/HomeLayout";
import Card from "../Components/ui/card";
import { HomePropsTypes } from "../Types/component";
import Label from "../Components/ui/label";

/**
 * Home component for displaying active and past polls.
 *
 * @param {HomePropsTypes} - Contains user and poll data.
 */
export default function Home({ user, poll }: HomePropsTypes) {
    const { currentPoll, pastPoll } = poll;
    const { get } = useForm();

    const handleView = (id: string) => {
        get(`/poll?view=${id}`);
    };

    return (
        <HomeLayout user={user}>
            <div className="flex-1">
                <div className="flex flex-col gap-3 h-full">
                    <div>
                        <Label.Title className="text-green-500">
                            Active Votes <span className="text-4xl">📣</span>
                        </Label.Title>
                        {currentPoll.length ? (
                            <div className="min-h-20 h-full grid mt-4 pb-5">
                                {currentPoll.map((poll) => {
                                    return (
                                        <Card
                                            {...poll}
                                            key={poll.id}
                                            current={true}
                                            onClick={() => handleView(poll.id)}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex items-center h-full">
                                <label className="text-xl text-gray-100 font-semibold">
                                    No vote yet{" "}
                                    <span className="text-xl">😅</span>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="py-9 mt-2">
                        <Label.Title className="text-red-400">
                            Past Votes <span className="text-3xl">☠️</span>
                        </Label.Title>
                        <div className="h-full py-4 flex-wrap gap-3 grid">
                            {pastPoll.map((poll) => {
                                return (
                                    <Card
                                        {...poll}
                                        key={poll.id}
                                        onClick={() => handleView(poll.id)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
