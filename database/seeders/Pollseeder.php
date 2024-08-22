<?php

namespace Database\Seeders;

use App\Models\Option;
use App\Models\Poll;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Pollseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Poll::factory(20)
        ->has(Option::factory()->count(3), 'options')
        ->create();
    }
}