<?php

namespace App\Http\Controllers;

use App\Models\WaitlistEntry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WaitlistController extends Controller
{
    public const USE_CASES = ['meeting', 'lecture', 'video', 'interview', 'other'];

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email:rfc', 'max:255'],
            'use_case' => ['nullable', 'string', 'in:'.implode(',', self::USE_CASES)],
            'locale' => ['nullable', 'string', 'in:vi,en'],
        ]);

        $data['email'] = mb_strtolower(trim($data['email']));

        // Idempotent: signing up twice is not an error and does not leak who is registered.
        $entry = WaitlistEntry::firstOrCreate(
            ['email' => $data['email']],
            ['use_case' => $data['use_case'] ?? null, 'locale' => $data['locale'] ?? 'vi'],
        );

        return response()->json(
            ['message' => 'ok'],
            $entry->wasRecentlyCreated ? 201 : 200,
        );
    }
}
