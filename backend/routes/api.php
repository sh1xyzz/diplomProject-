<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\register;
use App\Http\Controllers\Auth\login;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UploadController;

Route::post('/register', [register::class, 'register']);
Route::post('/login', [login::class, 'login']);

Route::post('/courses', [CourseController::class, 'store']);
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);
Route::put('/courses/{id}', [CourseController::class, 'update']);

Route::post('/upload-avatar', [UserController::class, 'uploadAvatar']);
Route::get('/upload-avatar', [UserController::class, 'uploadAvatar']);

Route::get('/tags', [TagController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/user/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::post('/messages/{id}/reply', [MessageController::class, 'reply']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
});

Route::get('/users', [UserController::class, 'index']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);