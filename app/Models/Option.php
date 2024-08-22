<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Option extends Model
{
    use HasFactory;

    protected $fillable = ['name','poll_id'];

    public function poll():BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

    public function createOptions($poll,$request):Void
    {
        foreach($request->options as $option)
        {
            $this->create([
                'poll_id' => $poll->id,
                'name' => $option['value']
            ]);
        }
    }

    public function votes():HasMany
    {
        return $this->hasMany(Vote::class);
    }
}