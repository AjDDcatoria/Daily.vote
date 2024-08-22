<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Option;
use App\Models\Poll;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PollController extends Controller
{
    protected $userModel,$pollModel,$optionModel,$voteModel;

    /**
     * PollController constructor.
     *
     * Initializes the controller with the necessary model instances.
     *
     * @param User $userModel The User model instance.
     * @param Poll $pollModel The Poll model instance.
     * @param Option $optionModel The Option model instance.
     */
    public function __construct(User $userModel,Poll $pollModel,Option $optionModel,Vote $voteModel)
    {
        $this->userModel = $userModel;
        $this->pollModel = $pollModel;
        $this->optionModel = $optionModel;
        $this->voteModel = $voteModel;
    }

    /**
     * Displays the form for creating a new poll.
     *
     * Retrieves the currently authenticated user and renders the 'Create' page.
     *
     * @return Inertia::render
     */
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('Create',['user' => $user]);
    }

    /**
     * Handles the creation of a new poll.
     *
     * Validates the input from the request, creates a new poll, and associates options with it.
     * Redirects to the home route upon successful creation.
     *
     * @param \Illuminate\Http\Request $request The request instance containing the poll data.
     * @return to_route Redirect to home
     */
    public function create(Request $request)
    {
        $validated = $this->pollModel->validated($request);

        if(! $validated['ok'])
        {
            // Redirect back with validation errors
            return back()->withErrors($validated['message']);
        }

        // Create a new poll with the validated data
        $poll = $this->pollModel->createPoll($request);

        // Create associated options for the newly created poll
        $this->optionModel->createOptions($poll,$request);

        // Redirect to the home route after successful creation
        return to_route('home');
    }

    public function viewPoll(Request $request)
    {
        $query = $request->query('view');
        $poll = $this->pollModel
            ->where('id', $query)
            ->with([
                'options' => function ($query) {
                    $query->withCount('votes');
                },
                'comments' => function($query){
                    $query->orderBy('created_at','desc')
                          ->with(['user:id,username,avatar']);
                }
            ])
            ->first();

        $user = Auth::user();

        return Inertia::render('Poll', [
            'poll' => $poll,
            'user' => $user
        ]);
    }
}