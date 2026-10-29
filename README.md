# VietNote

AI note-taker for Vietnamese meetings, lectures and videos. **Status: in progress** — this repo currently holds the "coming soon" landing page and the waitlist API.

| Dir    | Stack            | Purpose                                  |
| ------ | ---------------- | ---------------------------------------- |
| `web/` | Nuxt 3           | Landing page (vi/en) + waitlist form     |
| `api/` | Laravel 12 (PHP 8.2+) | `POST /api/waitlist` (SQLite by default) |

## Run locally

```bash
# API → http://localhost:8000
cd api && composer install && cp -n .env.example .env && php artisan key:generate \
  && touch database/database.sqlite && php artisan migrate && php artisan serve

# Web → http://localhost:3000
cd web && npm install && cp -n .env.example .env && npm run dev
```

Tests: `cd api && php artisan test`.

## Deploy notes

- Web: `npm run generate` outputs a static site (`web/.output/public`); set `NUXT_PUBLIC_API_BASE` at build time.
- API: set `APP_ENV=production`, `APP_DEBUG=false`, a real DB, and `CORS_ALLOWED_ORIGINS` to your web origin(s).
- Export signups: `php artisan tinker --execute='echo App\Models\WaitlistEntry::pluck("email")->implode("\n");'`
