import Label from "../Components/ui/label";
import PollLayout from "../Components/layouts/PollLayout";
import Vote from "../Components/vote/vote";
import Comment from "../Components/comment/comment";
import { router, useForm } from "@inertiajs/react";
import { OptionTypes, PollTypes } from "../Types/component";
import { UserTypes } from "../Types/user";
import { toast, Toaster } from "sonner";
import { KeyboardEvent } from "react";

interface PollProps {
    poll: PollTypes;
    user: UserTypes;
}

type Error = {
    message: string;
};

export default function Poll({ poll, user }: PollProps) {
    const { options } = poll;
    const { post, setData, data } = useForm({
        comment: "",
    });

    const handleVote = ({ ...op }: OptionTypes) => {
        router.post("/vote", op, {
            onSuccess: () => {
                toast.success(`Successful vote for ${op.name}`);
            },
            onError: ({ message }: Error) => {
                toast.error(message);
            },
        });
    };

    const handleComment = (e: KeyboardEvent) => {
        data.comment = data.comment.trim();
        if (e.key === "Enter" && data.comment.length) {
            post(`/comment?poll_id=${poll.id}`, {
                onSuccess: () => {
                    setData("comment", "");
                },
                onError: ({ message }: Error) => {
                    toast.error(message);
                },
            });
        }
    };

    return (
        <PollLayout poll={poll} user={user}>
            {user ? (
                <div className="w-full flex gap-3 flex-wrap justify-between h-full lg:flex-nowrap">
                    <div className="flex flex-col gap-5 w-full">
                        <div>
                            <Label.Title className="text-gray-300">
                                Votes
                            </Label.Title>
                        </div>
                        <Vote.Container>
                            {options.map((op) => {
                                return (
                                    <Vote.List
                                        op={op}
                                        key={op.id}
                                        onClick={() => handleVote(op)}
                                    />
                                );
                            })}
                        </Vote.Container>
                    </div>
                    <div className="w-full">
                        <div>
                            <Label.Title className="text-gray-300">
                                Comment
                            </Label.Title>
                        </div>
                        <Comment.Container className="h-full flex flex-col">
                            <div>
                                <input
                                    type="text"
                                    value={data.comment}
                                    required
                                    onKeyDown={handleComment}
                                    placeholder="Comment"
                                    className="input input-bordered w-full bg-transparent text-gray-200"
                                    onChange={(e) =>
                                        setData("comment", e.target.value)
                                    }
                                />
                            </div>
                            {poll.comments.length ? (
                                <Comment.Box>
                                    {poll.comments.length &&
                                        poll.comments.map((comment, index) => {
                                            return (
                                                <Comment.Message
                                                    key={index}
                                                    comment={comment}
                                                />
                                            );
                                        })}
                                </Comment.Box>
                            ) : (
                                <div className="h-full flex items-center justify-center text-4xl font-bold text-gray-600">
                                    No comment yet
                                </div>
                            )}
                        </Comment.Container>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-600/5 h-full rounded flex justify-center items-center">
                    <h2 className="text-4xl font-bold text-yellow-400/90">
                        You need to Login<span>😅</span>
                    </h2>
                </div>
            )}
            <Toaster richColors position="top-center" />
        </PollLayout>
    );
}
