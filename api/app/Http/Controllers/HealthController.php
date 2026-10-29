<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Events\DiagnosingHealth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Event;
use Throwable;

class HealthController extends Controller
{
    public function __invoke(): JsonResponse
    {
        try {
            Event::dispatch(new DiagnosingHealth);
        } catch (Throwable $e) {
            report($e);

            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 503);
        }

        return response()->json(['status' => 'ok']);
    }
}
