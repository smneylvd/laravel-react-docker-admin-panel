<?php

namespace App\Services;

use App\Models\User;
use App\Transformers\UserTransformer;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserService
{
    public function index(
        $filters = [],
        $orderBy = 'created_at',
        $direction = 'desc',
        $paginate = true,
        $page = 1,
        $perPage = 12
    )
    {
        $items = User::query()
            ->where(function ($q) use ($filters) {
                if ($uuid = Arr::get($filters, 'uuid')) {
                    $q->where('uuid', 'like', "%$uuid%");
                }
                if ($firstName = Arr::get($filters, 'first_name')) {
                    $q->where('first_name', 'like', "%$firstName%");
                }
                if ($lastName = Arr::get($filters, 'last_name')) {
                    $q->where('last_name', 'like', "%$lastName%");
                }
                if ($email = Arr::get($filters, 'email')) {
                    $q->where('email', 'like', "%$email%");
                }
            })
            ->orderBy($orderBy, $direction);
        if ($paginate) {
            $items = $items->paginate(perPage: $perPage, page: $page);
        } else {
            $items = $items->get();
        }
        return $items;
    }

    public function update(User $user, array $body)
    {
        $validator = Validator::make($body, [
            'first_name' => '',
            'last_name' => '',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')
                    ->where(function ($q) {
                        $q->where('deleted_at', '=', null);
                    })
                    ->ignore($user->uuid, 'uuid'),
            ],
        ]);

        if ($validator->errors()->count() > 0) {
            throw new HttpException(400, implode(', ', $validator->errors()->all()));
        }

        $user->email = Arr::get($body, 'email');
        $user->first_name = Arr::get($body, 'first_name');
        $user->last_name = Arr::get($body, 'last_name');

        $password = Arr::get($body, 'password');
        if ($password) {
            $user->password = Hash::make($password);
        }
        $user->save();
        return $user;
    }

    public function view($uuid)
    {
        return User::query()->where('uuid', $uuid)->firstOrFail();
    }

    public function delete(User $user)
    {
        $user->deleted_at = Carbon::now();
        $user->save();
        return true;
    }

    public function restore(User $user)
    {
        $user->deleted_at = null;
        $user->save();
        return $user;
    }
}
