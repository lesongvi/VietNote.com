# VietNote — Roadmap

> Draft v1 (2026-10-29). Durations assume a small team (≈2–3 engineers) and are estimates, not promises. Details and rationale: [PLANNING.md](./PLANNING.md). Principle: **one surface at a time, each phase ends with something real users can touch.**

Legend: ✅ done · 🔄 in progress · ⬜ planned

```
Phase 0  Foundations & waitlist          ✅
Phase 1  ASR benchmark & wedge            🔄 next        (2–3 wks)
Phase 2  Web app MVP (upload → notes)     ⬜             (6–8 wks)
Phase 3  Billing & private beta           ⬜             (3–4 wks)
Phase 4  Chrome extension (live capture)  ⬜             (4–6 wks)
Phase 5  macOS app                        ⬜             (8–10 wks)
Phase 6  Windows app                      ⬜             (6–8 wks)
Phase 7  Growth, teams, mobile            ⬜             (ongoing)
```
Phases 4 and 5 can overlap if there is a dedicated native engineer. Public launch happens at the end of Phase 3 (web) and is re-announced at each surface release.

---

## Phase 0 — Foundations ✅
- ✅ Coming-soon landing page (Nuxt 3, vi/en) and waitlist API (Laravel 12, PHP 8.2+)
- ✅ Repo, README, tests for the waitlist endpoint
- ⬜ Deploy landing + API to production domain; transactional email for waitlist confirmation
- ⬜ Analytics (privacy-friendly) and Sentry
- ⬜ CI: lint + tests on every push (API, web)

**Exit:** vietnote.com is live and collecting emails with a measurable conversion rate.

## Phase 1 — ASR benchmark & wedge 🔄
- ⬜ Collect and label 30–50 Vietnamese recordings (meetings, lectures, noise, accents, code-switching) with consent
- ⬜ Build the evaluation harness (script computing WER, speed, cost per minute per provider)
- ⬜ Compare hosted providers and Whisper-family models (including Vietnamese fine-tunes); test diarization options
- ⬜ Prototype summary + action-item prompts on the same set; score by hand
- ⬜ Decide: provider(s), self-host vs. API, streaming approach, wedge confirmation
- ⬜ Cost model: cost per audio minute → first price points and free tier size
- ⬜ ADRs written for each decision

**Exit:** a published internal report with WER numbers, cost per minute, and signed-off decisions. If no option reaches acceptable quality, stop and plan fine-tuning before building more.

## Phase 2 — Web app MVP ⬜
**Backend**
- ⬜ Auth (magic link + Google), Sanctum, device tokens (for later clients)
- ⬜ Postgres schema (users, notes, recordings, segments, summaries, ledger)
- ⬜ Object storage + signed uploads, resumable/chunked upload
- ⬜ Queue pipeline: ffmpeg → ASR → diarization → summary/action items → embeddings
- ⬜ Provider interfaces for ASR and LLM; per-job cost logging
- ⬜ OpenAPI spec + generated TypeScript client

**Web**
- ⬜ App shell, library, search
- ⬜ Upload file / paste YouTube link / record in browser
- ⬜ Note page: transcript editor with audio sync, speakers, summary, action items
- ⬜ "Ask your notes" chat with timestamp citations
- ⬜ Export: Markdown, PDF, DOCX, SRT; share link
- ⬜ Settings: language, glossary (custom vocabulary), delete data

**Exit:** 20 internal/friendly users process real meetings end-to-end; ≥ 80% say the transcript is usable without heavy editing.

## Phase 3 — Billing & private beta ⬜
- ⬜ Minute ledger, free trial minutes, prepaid packs
- ⬜ Payments: VietQR/e-wallet via a local gateway; cards for international; idempotent webhooks
- ⬜ Invoices / e-invoice flow (confirm requirements with an accountant)
- ⬜ Terms, Privacy Policy, consent banner, retention settings, data export/delete
- ⬜ Rate limiting, abuse protection, admin dashboard (users, jobs, costs, refunds)
- ⬜ Onboarding emails to the waitlist in waves (100 → 500 → all)
- ⬜ Support channel (Zalo/email) and feedback widget

**Exit:** first paying customers; gross margin per minute measured and ≥ target; no data-loss or privacy incidents in beta.

## Phase 4 — Chrome extension ⬜
- ⬜ MV3 scaffold, shared TS client and UI components
- ⬜ Tab-audio capture (`tabCapture` + offscreen document) and microphone mix
- ⬜ Streaming gateway (WebSocket) with partial/final transcript events; reconnect + local buffer
- ⬜ Side-panel UI: live transcript, start/stop, highlights, "open full note"
- ⬜ Sign-in handoff with the web app; token in session storage
- ⬜ Consent reminder for meeting capture
- ⬜ Detect Google Meet / Zoom web / Teams web / YouTube and offer one-click start
- ⬜ Privacy-policy page, store listing assets, Chrome Web Store review

**Exit:** extension live on the Chrome Web Store (also installable on Edge/Brave); live latency targets met in the capture test matrix.

## Phase 5 — macOS app ⬜
- ⬜ Spike (1–2 wks): ScreenCaptureKit / Core Audio tap capture → 16 kHz PCM → streaming gateway; confirm permission UX
- ⬜ Desktop shell (Tauri 2 or Electron per ADR), menu-bar app, global shortcut
- ⬜ Mic + system-audio mixing, device selection, local buffering and resumable upload
- ⬜ Meeting-app detection (Zoom, Teams, Zalo, browser) and "record this?" prompt
- ⬜ Live transcript window; hand-off to web note on stop
- ⬜ Apple Developer account, signing, notarization, `.dmg`, auto-update channel (stable + beta)
- ⬜ Crash reporting; first-run permission guide with screenshots

**Exit:** signed, notarized app distributed from vietnote.com; capture verified on macOS 13/14/15+ and Apple Silicon + Intel.

## Phase 6 — Windows app ⬜
- ⬜ WASAPI loopback + mic capture module (Rust/C++), device-change handling
- ⬜ Reuse desktop shell, gateway client, buffering and UI from Phase 5
- ⬜ Windows code-signing, installer (MSIX or NSIS), auto-update
- ⬜ Test matrix: Windows 10 22H2 / 11, Bluetooth and USB headsets, multiple outputs, Zoom/Teams/Meet/Zalo

**Exit:** signed installer with no SmartScreen warning; parity with macOS feature set.

## Phase 7 — Growth, teams, mobile ⬜ (prioritize by data)
- ⬜ Teams: shared folders, roles, shared glossary, usage reporting
- ⬜ Integrations: Google Calendar (auto-join reminders), Notion, Slack, Zalo, Google Docs export
- ⬜ Monthly plans, annual discounts, education pricing
- ⬜ Quality: speaker naming and voice profiles, better diarization, domain glossaries (legal, medical, finance), human-correction feedback loop
- ⬜ Mobile: PWA first, then native iOS/Android voice recorder if usage justifies
- ⬜ Enterprise: SSO, audit logs, data residency, DPA, on-prem option
- ⬜ API / webhooks for developers

---

## Cross-cutting tracks (run in every phase)
- **Evaluation:** WER and summary-quality regression set runs on every ASR/prompt change.
- **Security & privacy:** threat model per surface; dependency updates; backup/restore drills.
- **Cost control:** per-job cost dashboard; alert when cost per minute exceeds budget.
- **Docs:** ADRs for each major decision; public changelog.

## Milestones and success metrics
| Milestone | Target metric |
| --- | --- |
| Landing live | ≥ 1,000 waitlist emails before beta |
| Phase 1 done | WER and cost/minute documented; decisions signed off |
| Web MVP | ≥ 80% "usable transcript" rating from 20 testers |
| Public beta | First 50 paying users; gross margin ≥ 60% per minute |
| Extension live | ≥ 30% of weekly active users use live capture |
| macOS / Windows | Crash-free sessions ≥ 99%; capture success ≥ 95% in test matrix |

## Dependencies on non-engineering work
- Legal: Terms, Privacy, DPA, consent wording (before Phase 3 beta).
- Accounts: Apple Developer, Windows signing, Chrome Web Store (start ≥ 4 weeks before Phases 4–6; verification can take time).
- Payments: gateway merchant onboarding for Vietnam (start during Phase 2; approval can take weeks).
- Content: demo videos and sample notes for each surface.
