<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RegisterController extends Controller
{
    /**
     * Show the register form.
     *
     * Displays the login page to the user.
     *
     * @return Inertia::render
     */
    public function index()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle user registration and login.
     *
     * This method validates the registration form input, creates a new user record,
     * - Validates the input from the request
     * - Redirects to the home route upon successful registration
     *
     * @param \Illuminate\Http\Request $request The request instance containing the registration data.
     *
     * @return to_route Redirect to home Redirects to the home page on successful registration and login.
     * @return Errors back to the registration form with validation errors if the input is invalid.
     */

    public function store(Request $request)
    {
        // Validate the input data
        $validator = Validator::make($request->all(),[
            'username' => 'required|string|min:2',
            'email'    => 'required|unique:users|email',
            'password' => 'required|string|min:8'
        ]);

        if($validator->fails())
        {
            // Redirect back with validation errors
            return back()->withErrors($validator->errors());
        }

        // Create a new user with the validated data
        $user = User::create([
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password)
        ]);

        // Authenticate new User
        Auth::login($user);

        // Redirect to Home page
        return to_route('home');
    }
}