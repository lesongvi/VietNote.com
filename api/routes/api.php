<?php

use App\Http\Controllers\WaitlistController;
use Illuminate\Support\Facades\Route;

Route::post('/waitlist', [WaitlistController::class, 'store'])
    ->middleware('throttle:10,1');
