<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'uuid' => (string)Str::uuid(), // Generate a unique UUID for each user
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('password'), // Use a default password for all test users
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null, // Set to null for active users, modify as needed
        ];
    }

    /**
     * Indicate that the user is soft deleted.
     *
     * @return static
     */
    public function trashed()
    {
        return $this->state(fn () => [
            'deleted_at' => now(),
        ]);
    }
}
