<?php

namespace App\Policies;

use App\Models\Poll;
use App\Models\User;
use App\Models\Vote;

class VotePolicy
{
    /**
     * Determine if the user has already voted on the poll.
     *
     * @param User $user
     * @param Poll $poll
     * @return bool
     */
    public function hasVoted(User $user, Poll $poll)
    {
        return Vote::where('user_id', $user->id)->where('poll_id', $poll->id)->exists();
    }
}