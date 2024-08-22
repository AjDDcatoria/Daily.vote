<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class Poll extends Model
{
    use HasFactory,HasUuids;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'theme',
        'icon',
        'expired'
    ];

    protected $guarded = ['id'];

    /**
     * Define a relationship with the User model.
     *
     * @return BelongsTo The relationship instance.
     */
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }

    /**
     * Define a relationship with the Option model.
     *
     * @return HasMany The relationship instance.
     */
    public function options():HasMany
    {
        return $this->hasMany(Option::class,'poll_id');
    }

    public function vote():HasMany
    {
        return $this->hasMany(Vote::class);
    }

    public function comments():HasMany
    {
        return $this->hasMany(Comment::class,'poll_id','id');
    }

     /**
     * Validate input data from a request.
     *
     * @param Request $request The request instance containing input data.
     * @return array An associative array containing:
     *   - 'ok' (boolean): `true` if validation passes, `false` otherwise.
     *   - 'message': Validation errors if `ok` is `false`, or a success message if `ok` is `true`.
     */
    public function validated($request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|min:2',
            'description' => 'nullable|string|min:2',
            'options' => 'required|array|min:2',
            'options.*.value' => 'required|string'
        ]);

        if($validator->fails())
        {
            return ['ok' => false,'message'=> $validator->errors()];
        }

        return ['ok' => true,'message'=> 'Input validated'];
    }

    /**
     * Create a new poll associated with the currently authenticated user.
     *
     * This method retrieves the authenticated user and creates a poll with the following attributes:
     * - `user_id`: ID of the authenticated user.
     * - `name`: Name from the request data.
     * - `description`: Description from the request data.
     * - `theme`: Randomly selected theme.
     * - `icon`: Randomly selected icon.
     * - `expired`: Expiration date set to one day from now.
     *
     * @param Request $request The request instance containing poll data.
     * @return Poll The newly created poll instance.
     */
    public function createPoll($request)
    {
        $user = Auth::user();

        return $this->create([
            'user_id' => $user->id,
            'name' => $request->name,
            'description' => $request->description,
            'theme' => $this->getRandomTheme(),
            'icon' => $this->getRandomIcon(),
            'expired' => now()->addDay()
        ]);
    }
    /**
     * Get a random theme from a predefined list.
     *
     * @return string A randomly selected theme.
     */
    function getRandomTheme()
    {
        $themes = ['yellow', 'blue', 'green', 'purple', 'red'];
        return $themes[array_rand($themes)];
    }
    /**
     * Get a random icon from a predefined list.
     *
     * @return string A randomly selected icon.
     */
    function getRandomIcon()
    {
        $icons = ['🥳', '🤔', '🎷', '📸', '👽', '👀', '🍻', '🎨', '👻', '🤖', '👑'];
        return $icons[array_rand($icons)];
    }
}