<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware([AuthMiddleware::class])->group(function () {
    Route::get('profile', [AuthController::class, 'profile']);  // or UserController::class if intended

    Route::post('logout', [AuthController::class, 'logout']);

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/{uuid}', [UserController::class, 'view'])->name('view');  // Use 'uuid' consistently
        Route::post('/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}', [UserController::class, 'delete'])->name('delete');
        Route::get('/{user}/restore', [UserController::class, 'restore'])->name('restore');
    });
});
