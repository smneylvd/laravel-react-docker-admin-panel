<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $req): JsonResponse
    {
        $data = AuthService::login($req->all());
        return ResponseService::send(content: $data);
    }

    public function logout(): JsonResponse
    {
        AuthService::logout();
        return ResponseService::send();
    }

    public function register(Request $req): JsonResponse
    {
        $data = AuthService::register($req->all());
        return ResponseService::send(content: $data);
    }

    public function profile(): JsonResponse
    {
        $data = AuthService::getUser();
        return ResponseService::send(content: $data);
    }
}
