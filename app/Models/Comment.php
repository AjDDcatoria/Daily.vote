<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'comment',
        'poll_id',
        'user_id'
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function polls():BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

    public function createComment($request,$poll_id)
    {
        $user = Auth::user();

        $this->create([
            'comment' => $request->comment,
            'poll_id' => $poll_id,
            'user_id' => $user->id
        ]);
    }
}