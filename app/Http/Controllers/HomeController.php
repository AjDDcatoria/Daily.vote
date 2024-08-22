<?php

namespace App\Http\Controllers;

use App\Models\Poll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with current and past polls.
     *
     * Retrieves and categorizes polls based on their expiration date.
     * Fetches current polls that have not expired and past polls that have expired.
     * Also retrieves the currently authenticated user.
     *
     * @return Inertia::render
     */
    public function index()
    {
        // Fetch polls that have not expired (current polls)
        $currentPoll = Poll::with('user')
                            ->whereDate('expired', '>', now())
                            ->get();

        // Fetch polls that have expired (past polls)
        $pastPoll = Poll::with('user')
                          ->whereDate('expired', '<=', now())
                          ->get();

        $user = Auth::user();

        // Render the 'Home' view with the current and past polls and user information
        return Inertia::render('Home',[
            'ok' => true,
            'user' => $user,
            'poll' => [
                'currentPoll' => $currentPoll,
                'pastPoll' => $pastPoll
            ]
        ]);
    }
}