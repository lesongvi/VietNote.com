<?php

namespace Tests\Feature;

use App\Models\WaitlistEntry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WaitlistTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_a_new_email(): void
    {
        $this->postJson('/v1/waitlist', ['email' => 'Hello@Example.com', 'use_case' => 'meeting'])
            ->assertCreated();

        $this->assertDatabaseHas('waitlist_entries', ['email' => 'hello@example.com', 'use_case' => 'meeting']);
    }

    public function test_duplicate_email_is_idempotent(): void
    {
        $this->postJson('/v1/waitlist', ['email' => 'a@example.com'])->assertCreated();
        $this->postJson('/v1/waitlist', ['email' => 'A@example.com'])->assertOk();

        $this->assertSame(1, WaitlistEntry::count());
    }

    public function test_it_rejects_invalid_input(): void
    {
        $this->postJson('/v1/waitlist', ['email' => 'nope'])->assertUnprocessable();
        $this->postJson('/v1/waitlist', ['email' => 'a@example.com', 'use_case' => 'x'])->assertUnprocessable();
    }
}
