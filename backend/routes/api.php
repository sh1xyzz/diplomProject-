<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\register;
use App\Http\Controllers\Auth\login;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MessageController;


Route::post('/register', [register::class, 'register']);
Route::post('/login', [login::class, 'login']);

Route::post('/courses', [CourseController::class, 'store']);
Route::get('/courses', [CourseController::class, 'index']);

Route::get('/tags', [TagController::class,'index']);

Route::post('/messages', [MessageController::class, 'store']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

