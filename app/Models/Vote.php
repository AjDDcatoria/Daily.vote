<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'option_id',
        'poll_id'
    ];

    public function users():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function options():BelongsTo
    {
        return $this->belongsTo(Option::class);
    }

    public function poll():BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

    public function voteTo($request)
    {
        $user = Auth::user();
        $this->create([
            'user_id' => $user->id,
            'option_id' => $request->id,
            'poll_id' => $request->poll_id
        ]);
    }
}