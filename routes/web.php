<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => redirect()->route('users'));
Route::get('/users', [UserController::class, 'fetchUsers'])->name('users');