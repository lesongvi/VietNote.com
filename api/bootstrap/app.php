<?php

use App\Http\Controllers\HealthController;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        then: function () {
            // Laravel's built-in health route renders a Blade page; this one answers in JSON.
            Route::middleware('api')->get('/up', HealthController::class);
        },
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->preventRequestsDuringMaintenance(except: ['up']);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // API-only application: every error answers in JSON, never an HTML page.
        $exceptions->shouldRenderJsonWhen(fn () => true);
    })->create();
