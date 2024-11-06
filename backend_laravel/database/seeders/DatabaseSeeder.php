<?php

namespace Database\Seeders;

use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        $users = User::inRandomOrder()->take(10)->get();
        $users = User::inRandomOrder()->take(10)->get();

        $users->each(function ($user) {
            $user->update([
                'email' => User::factory()->make()->email, // Generate a random email
            ]);
        });
    }
}
