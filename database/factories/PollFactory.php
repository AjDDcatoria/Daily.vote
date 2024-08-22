<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Poll>
 */
class PollFactory extends Factory
{
    protected $model = \App\Models\Poll::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isFutureDate = $this->faker->boolean;

        $expiredDate = $isFutureDate
        ? $this->faker->dateTimeBetween('now', '+1 day')->format('Y-m-d') // One day ahead
        : $this->faker->dateTimeBetween('-6 months', 'now')->format('Y-m-d'); // 6 months ago

        return [
            'id' => (string) Str::uuid(),
            'user_id' => \App\Models\User::factory(),
            'name' => $this->faker->sentence,
            'description' => $this->faker->optional()->paragraph,
            'theme' => $this->faker->randomElement(['yellow', 'blue', 'green', 'purple', 'red']),
            'icon' => $this->faker->randomElement(['🥳', '🤔', '🎷', '📸', '👽', '👀', '🍻', '🎨', '👻', '🤖', '👑']),
            'expired' => $expiredDate,
        ];
    }
}