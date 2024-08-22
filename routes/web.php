<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\VoteController;
use App\Models\Poll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/',[HomeController::class,'index'])->name('home');

Route::get('/poll',[PollController::class,'viewPoll']);

Route::middleware('auth')->group(function(){
    Route::get('/create',[PollController::class,'index'])->name('create');

    Route::post('/create',[PollController::class,'create']);

    Route::post('/vote',[VoteController::class,'addVote']);

    Route::post('/comment',[VoteController::class,'addComment']);

    Route::post('/logout',[LoginController::class,'destroy'])->name('logout');
});

Route::middleware('guest')->group(function(){
    Route::get('/login',[LoginController::class,'index'])->name('login');

    Route::post('/login',[LoginController::class,'create'])->name('auth.login');

    // todo Socialite Provider
    Route::post('/social',function(Request $request){
        $provider = $request->query('provider');
    })->name('social');

    Route::get('/register',[RegisterController::class,'index'])->name('register');

    Route::post('register',[RegisterController::class,'store'])->name('auth.register');
});