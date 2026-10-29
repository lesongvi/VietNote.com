# VietNote — Product & Technical Planning

> Status: draft v1 (2026-10-29). Decisions marked **[DECIDE]** are open and need an owner. Schedule lives in [ROADMAP.md](./ROADMAP.md).

## 1. Product in one paragraph

VietNote is an AI note-taker built for Vietnamese: it captures audio (meetings, lectures, videos, voice), produces an accurate Vietnamese transcript (including Vietnamese–English code-switching), then turns it into a summary, action items, translation and a searchable "ask your notes" chat. It ships as **one account across four surfaces**: a web app, a Chrome extension, and desktop apps for macOS and Windows.

## 2. Goals and non-goals

**Goals (first 12 months)**
- Best-in-class Vietnamese transcription accuracy on real workplace audio (accents, noise, mixed English).
- Capture without a meeting bot joining the call (extension + desktop system-audio capture).
- Simple pay-per-minute pricing with local payment methods; free minutes to try.
- Trust: clear consent, data retention and deletion controls.

**Non-goals (for now)**
- Native mobile apps (web is mobile-responsive; revisit after desktop).
- Meeting-bot that joins Zoom/Meet/Teams as a participant.
- Enterprise SSO/SCIM, on-prem deployment (design for it, don't build it).
- Languages beyond Vietnamese and English.

## 3. Users and the wedge

| Segment | Job to be done | Why they pay |
| --- | --- | --- |
| Office workers / PMs / founders | Meeting minutes + action items in Vietnamese | Time saved every week |
| Students / lecturers | Lecture and video notes | Cheap, high volume, word of mouth |
| Interviewers (HR, journalists, researchers) | Accurate transcripts with speakers | Replaces manual typing |

**Wedge: Vietnamese meetings with code-switching** ("deadline", "sprint" mid-sentence). This is where generic ASR is weakest and where accuracy is easiest to demonstrate. Everything else is secondary until this is great. **[DECIDE]** confirm after the ASR benchmark (ROADMAP Phase 1).

## 4. Surfaces and what each one needs

### 4.1 Web app (the hub — build first)
- Upload audio/video (mp3, m4a, wav, mp4, webm), paste a YouTube URL, record from the microphone.
- Note view: transcript with timestamps and speaker labels, click-to-seek audio, edit transcript, summary, action items, chat, translation.
- Library: folders/tags, search (title + full-text across transcripts), trash with restore.
- Export: Markdown, PDF, DOCX, SRT/VTT; share link (read-only, revocable).
- Account: sign-in (email magic link + Google; Apple later), usage/minutes balance, top-up, invoices, data export and delete-account.
- i18n: Vietnamese (default) and English.
- Stack: Nuxt 3 (already in `web/`), served as SPA/SSR behind the Laravel API.

### 4.2 Chrome extension (second — cheapest live capture)
- Manifest V3. Capture **tab audio** (`chrome.tabCapture` + an offscreen document to hold the stream) for Google Meet, YouTube, Zoom/Teams web, Facebook video, etc., plus **microphone** (`getUserMedia`) so both sides of a call are heard.
- Side panel UI (`chrome.sidePanel`): live transcript, start/stop, mark highlights, link to full note on the web app.
- Auth: opens the web app for sign-in, receives a token via `chrome.identity` / extension messaging; token stored in `chrome.storage.session`.
- Permissions kept minimal (`tabCapture`, `offscreen`, `sidePanel`, `storage`, `activeTab`); no broad host permissions — this matters for Chrome Web Store review and user trust.
- Also works on Edge/Brave/Arc (Chromium). Firefox/Safari: out of scope.

### 4.3 macOS app
- Capture system audio + microphone **without a virtual driver**: ScreenCaptureKit audio capture (macOS 13+) or Core Audio process taps (macOS 14.2+). Needs Screen/System Audio Recording and Microphone permissions with a good first-run flow.
- Menu-bar app: start/stop, global shortcut, live transcript window, auto-detect meeting apps (Zoom, Meet in browser, Teams, Zalo) and offer to record.
- Local audio buffering and resumable upload so a dropped connection never loses a recording.
- Distribution: Developer ID signed + notarized `.dmg`, auto-update. Apple Silicon first; Intel via universal build. **[DECIDE]** Mac App Store later (sandbox limits system-audio capture).

### 4.4 Windows app
- System audio via **WASAPI loopback** + microphone capture; handles device changes and multiple output devices.
- Tray app with the same feature set as macOS. Windows 10 22H2 and 11.
- Distribution: signed installer (MSIX or NSIS), auto-update. Unsigned installers trigger SmartScreen warnings and hurt conversion — signing is a requirement, not a nice-to-have.

### 4.5 Desktop framework **[DECIDE]**
| Option | Pros | Cons |
| --- | --- | --- |
| **Tauri 2 (recommended)** | Small installers, Rust core suits audio + native modules, reuses the Vue/Nuxt UI | Smaller ecosystem; native audio modules written per OS |
| Electron | Largest ecosystem, easiest for a JS team, mature auto-update | Large bundle and memory; native audio still needs addons |
| Fully native (Swift + C#/WinUI) | Best OS integration | Two codebases and two UIs — too expensive at this stage |

Either way, system-audio capture is **native code per OS** (Swift helper on macOS, Rust/C++ WASAPI on Windows) behind one shared interface that emits 16 kHz mono PCM chunks.

## 5. Shared architecture

```
 Web app ─┐
 Extension ┼─ HTTPS / WebSocket ─▶ Laravel API ─▶ Postgres (data) ─ Redis (queue/cache)
 macOS ────┤                           │                │
 Windows ──┘                           ├─ Object storage (audio, exports; S3-compatible)
                                       ├─ ASR provider(s)  (streaming + batch)
                                       └─ LLM provider(s)  (summary, chat, translation)
```

- **API:** Laravel 12 on PHP 8.2+ (`api/`). REST + JSON for CRUD; a separate realtime path for live capture (below). Auth via Laravel Sanctum (SPA cookies for web, personal/device tokens for extension and desktop).
- **Realtime transcription:** clients stream audio chunks over WebSocket to a small **streaming gateway** that talks to the ASR provider and pushes partial/final text back. PHP is a poor fit for long-lived sockets — use a dedicated service (Node/Go, or Laravel Reverb if load stays modest). **[DECIDE]**
- **Batch pipeline (uploads and post-processing):** Laravel queue on Redis (Horizon): transcode with ffmpeg → VAD/chunking → ASR → diarization → punctuation/normalization → LLM summary/action items → embeddings for chat/search.
- **Database:** PostgreSQL (jsonb for transcript segments, `pgvector` for embeddings, built-in full-text for search). SQLite stays for local dev only.
- **Storage:** S3-compatible bucket (audio/video, exports) with per-user prefixes and signed URLs. Default retention configurable; hard delete really deletes.
- **ASR layer:** hide providers behind an interface (`transcribe(audioStream, hints) → segments`). Support at least one hosted provider and one self-hosted model (e.g. a Whisper-family model, possibly fine-tuned for Vietnamese) so cost and quality can be tuned. Custom vocabulary / glossary per user (names, jargon) is a differentiator.
- **LLM layer:** same pattern; prompts versioned and tested on a fixed Vietnamese evaluation set. Summaries must cite transcript timestamps.
- **Observability:** Sentry (all clients + API), structured logs, per-job cost and latency metrics (cost per audio minute is the key business metric).

### Core data model (draft)
`users` · `devices` · `notes` (id, owner, title, source, language, status, duration) · `recordings` (audio file refs, chunks) · `segments` (note_id, start, end, speaker, text, confidence) · `summaries` / `action_items` · `chat_messages` · `folders`/`tags` · `shares` · `wallets` + `ledger_entries` (minutes, append-only) · `payments` / `invoices` · `waitlist_entries` (exists) · `consents` / `audit_log`.

### Monorepo layout (proposed)
```
api/         Laravel API                       (exists)
web/         Nuxt: landing + web app           (landing exists)
extension/   Chrome MV3 extension              (new)
desktop/     Tauri app + native audio modules  (new)
packages/    shared TS: API client, types, UI components (new)
docs/        ADRs, API spec (OpenAPI)
```

## 6. Non-functional requirements

| Area | Target (initial) |
| --- | --- |
| Accuracy | Word error rate measured on our own Vietnamese test set; publish a number and beat the baseline provider by a meaningful margin |
| Live latency | Partial text < 1.5 s behind speech; final segment < 3 s |
| Batch speed | A 1-hour file transcribed in ≤ 10 min (p95) |
| Reliability | Recording must survive network loss (local buffer + resumable upload); no lost recordings |
| Availability | 99.5% for the API at launch; queue backlogs visible and alerting |
| Security | TLS everywhere, encryption at rest, per-user object isolation, least-privilege API tokens, rate limiting, audit log for sensitive actions |
| Privacy | Explicit consent prompt before recording; configurable retention; export + delete my data; no training on customer audio without opt-in |
| Accessibility / UX | Keyboard-navigable web UI; Vietnamese-first copy; works on a 360 px phone |
| Cost | Gross margin target ≥ 60% per paid minute after ASR + LLM + storage |

## 7. Legal, privacy and compliance
- **Vietnam personal-data rules** (Decree 13/2023 and the newer Personal Data Protection Law) apply to voice data and transcripts; get counsel to confirm obligations (consent records, data-processing impact assessment, cross-border transfer notice, hosting location). **[DECIDE]** where to host (Vietnam region vs. Singapore) — enterprise buyers will ask.
- **Recording consent:** the product must make it easy to tell other participants they are being recorded; ship a consent banner/template and log acknowledgement.
- Terms of Service, Privacy Policy, DPA template, and a sub-processor list (ASR/LLM vendors) published before public beta.
- Respect platform ToS: capture is user-initiated and local to their device; do not scrape or bypass DRM on streaming services.

## 8. Payments and pricing
- Model: **free trial minutes + prepaid minute packs** (pay-per-minute), then optional monthly plans once usage patterns are known.
- Vietnamese payment rails first: VietQR/bank transfer, MoMo, ZaloPay, VNPay or an aggregator such as PayOS; cards via Stripe or a local gateway for international users. **[DECIDE]**
- Minutes are an append-only ledger (never edit a balance), with idempotent payment webhooks, VAT e-invoices (Vietnamese e-invoice requirements — confirm with an accountant) and refunds.
- Set prices only after the cost-per-minute number from Phase 1 is known.

## 9. Distribution and accounts needed

| Item | Why | Rough cost |
| --- | --- | --- |
| Apple Developer Program | Sign + notarize macOS app | ~US$99 / year |
| Windows code-signing (EV cert or cloud signing service) | Avoid SmartScreen warnings | ~US$100–500 / year |
| Chrome Web Store developer account | Publish the extension | US$5 one-time |
| Domain + DNS/CDN (vietnote.com — owned) | Site, API, update feeds | existing |
| Cloud (compute, Postgres, Redis, object storage) | Backend | scale with usage |
| ASR + LLM API credits / GPU | Core product cost | the main variable cost |
| Email (transactional) | Auth, receipts, waitlist launch | low |
| Error tracking, analytics (privacy-friendly) | Operate the product | low |
| Legal review + accountant | Privacy, invoicing | one-off + retainer |

## 10. Team and skills
Minimum viable team: 1 full-stack (Laravel + Nuxt), 1 client/native engineer (Tauri/Rust or Swift + Windows audio, plus the extension), 1 ML/audio engineer (ASR evaluation, pipelines, prompts) — part-time at first — and a designer/PM. One strong person can cover web + extension; **desktop system-audio capture is the specialist work** and is the main hiring/outsourcing risk.

## 11. Testing and quality
- **Evaluation set:** 50+ labeled Vietnamese recordings (meetings, lectures, noisy, regional accents, code-switching); WER tracked per provider/model on every change. Treat it like a test suite.
- API: PHPUnit feature tests (exists for waitlist); contract tests from an OpenAPI spec shared with the clients.
- Clients: unit tests for audio chunking/resume logic; manual capture matrix (OS version × meeting app × output device); Playwright for web.
- Beta channel for desktop and extension (staged rollout, kill switch via remote config).

## 12. Key risks and mitigations
| Risk | Impact | Mitigation |
| --- | --- | --- |
| Vietnamese ASR quality not good enough | Product has no moat | Benchmark first; fine-tune or switch provider; custom vocabulary; human-correction loop |
| System-audio capture is fragile (OS updates, permissions, device quirks) | Support load, bad reviews | Native modules behind one interface; capture test matrix; crash reporting; clear first-run permission guide |
| ASR/LLM cost per minute too high | Negative margin | Track cost per job; cheaper model for first pass; batch vs. streaming tiers; caching |
| Chrome Web Store rejection / permission scrutiny | Launch delay | Minimal permissions, clear privacy policy, single-purpose description |
| Privacy incident or consent complaint | Trust loss, legal exposure | Consent UX, retention controls, encryption, DPA, incident runbook |
| Incumbent competitors (e.g. vietnote.vn, global tools) | Slow growth | Sharper wedge (code-switching accuracy), better UX, price transparency |
| Scope creep across 4 surfaces | Nothing ships | Strict sequencing in ROADMAP; web first, one capture surface at a time |

## 13. Open decisions (owner needed)
1. Wedge segment confirmation after benchmark.
2. ASR provider(s) and whether to self-host/fine-tune.
3. Desktop framework (Tauri vs Electron).
4. Realtime gateway technology (Reverb vs Node/Go service).
5. Hosting region and cloud provider.
6. Payment gateway(s) and invoicing approach.
7. Free tier size and first price points.
8. Brand/legal entity details for developer accounts and invoices.
