<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Show the login form.
     *
     * Displays the login page to the user.
     *
     * @return Inertia::render
     */
    public function index()
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle the login request.
     *
     * Validates the login credentials and attempts to authenticate the user.
     * Redirects the user to the home page if authentication is successful.
     * Returns the user to the login form with errors if authentication fails.
     *
     * @param \Illuminate\Http\Request $request The HTTP request instance containing login credentials.
     * @return to_route Redirect to home
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email'    => 'required|email',
            'password' => 'required|string|min:8'
        ]);

        if($validator->fails())
        {
            return back()->withErrors($validator->errors());
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password]))
        {
            return to_route('home');
        }

        return back()->withErrors("Your credentials didn't match in our records.");
    }

    /**
     * Log out the user and redirect to the home page.
     *
     * Logs out the currently authenticated user and redirects to the home page.
     *
     * @return to_route Redirect to home
     */
    public function destroy()
    {
        Auth::logout();
        return to_route('home');
    }
}