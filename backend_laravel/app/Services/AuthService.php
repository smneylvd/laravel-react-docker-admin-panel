<?php

namespace App\Services;

use App\Models\User;
use App\Transformers\UserTransformer;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public static function register($data): array
    {
        $validator = Validator::make($data, [
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->errors()->count() > 0) {
            throw new HttpException(400, implode(', ', $validator->errors()->all()));
        }

        $user = User::create([
            'first_name' => Arr::get($data, 'first_name'),
            'last_name' => Arr::get($data, 'last_name'),
            'email' => Arr::get($data, 'email'),
            'password' => Hash::make(Arr::get($data, 'password')),
        ]);

        $token = JWTAuth::fromUser($user);
        $transformer = new UserTransformer();
        $data = $transformer->transformItem($user);

        return array_merge($data, ['token' => $token]);
    }

    public static function login($data)
    {
        $validator = Validator::make($data, [
            'email' => 'required|exists:users',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            throw new HttpException(400, $validator->errors()->first());
        }

        $email = Arr::get($data, 'email');
        $password = Arr::get($data, 'password');
        $credentials = ['email' => $email, 'password' => $password];
        if (!JWTAuth::attempt($credentials)) {
            throw new HttpException(401, 'Invalid credentials');
        }

        // Get the authenticated user.
        $user = auth()->user();
        $token = JWTAuth::fromUser($user);

        $transformer = new UserTransformer();
        $data = $transformer->transformItem($user);
        return array_merge($data, ['token' => $token]);

    }

    // Get authenticated user
    public static function getUser()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $token = JWTAuth::fromUser($user);

        $transformer = new UserTransformer();
        $data = $transformer->transformItem($user);
        return array_merge($data, ['token' => $token]);
    }

    // User logout
    public static function logout()
    {
        return JWTAuth::invalidate(JWTAuth::getToken());
    }
}
