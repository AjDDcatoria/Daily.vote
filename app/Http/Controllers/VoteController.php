<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Poll;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class VoteController extends Controller
{
    protected $voteModel,$commentModel;

    public function __construct(Vote $voteModel,Comment $commentModel)
    {
        $this->voteModel = $voteModel;
        $this->commentModel = $commentModel;
    }

    public function addVote(Request $request)
    {
        $poll = Poll::where('id',$request->poll_id)->first();

        if($poll->expired <= now()->toDateString())
        {
            return back()->withErrors(['message'=>'The poll has expired.']);
        }

        if(Gate::allows('hasVoted',$poll))
        {
            return back()->withErrors(['message'=>'You already voted this poll.']);
        }

        $this->voteModel->voteTo($request);

        return back()->with(['message' => 'Successful voted!!']);
    }

    public function addComment(Request $request){
        $poll_id = $request->query('poll_id');

        if(! $poll_id)
        {
            return back()->withErrors(['message' => "Something went wrong. Please Try again."]);
        }

        $this->commentModel->createComment($request,$poll_id);

        return back()->with(['messages' => 'Comment created']);
    }
}