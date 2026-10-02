<?php

use App\Http\Controllers\PermissionController;
use Illuminate\Support\Facades\Route;
use Spatie\Activitylog\Models\Activity;

Route::get("activitylog", function () {
   return Activity::all()->last();
});

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('permissions', PermissionController::class);
});

require __DIR__ . '/settings.php';
