<?php

namespace App\Providers;

use App\Models\Poll;
use App\Policies\PollPolicy;
use App\Policies\VotePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Poll::class, VotePolicy::class);
    }
}