# Building the evaluation set

Goal: **30–50 recordings, ~5–10 minutes total each is plenty (aim for 3–5 hours overall)**, with human-verified transcripts. This set is the most valuable asset in Phase 1 — keep it private and never use it for training.

## What to collect (suggested mix)
| Category (manifest `category`) | Share | Notes |
| --- | --- | --- |
| `meeting-codeswitch` | 30% | Work meetings with English terms mixed in (deadline, sprint, feedback…) |
| `meeting-vi` | 15% | Pure Vietnamese meetings |
| `lecture` | 15% | Lectures / webinars / long monologues |
| `noisy-*` | 15% | Cafe, street, poor mic, speakerphone, echo |
| `accent-north` / `accent-central` / `accent-south` | 15% | Make sure all three regions are represented |
| `video` | 10% | YouTube-style content, music/background |

Mix genders and ages, 1-speaker and 3+ speaker audio, and at least some phone-call quality (8 kHz-ish) audio.

## Consent and privacy (required)
- Only use recordings where **every speaker agreed** (written/chat consent is fine) to use the audio for evaluating speech-to-text. Keep the consent record.
- Strip or replace real names, phone numbers, bank details in the *reference text* and, if needed, skip those segments.
- Public-domain / properly licensed media is OK for the `video` and `lecture` categories — check the license.
- Do **not** commit audio or references to git (they are git-ignored). Store them in private storage.

## Labeling the reference transcript
1. Generate a draft with any ASR, then **correct it by hand** (a second person should spot-check 20%).
2. Write what was actually said, with Vietnamese diacritics. Punctuation and capitalization don't matter (they are normalized away).
3. Mark English words/terms with braces so code-switching accuracy can be measured: `chốt {deadline} trước thứ Sáu, còn {feedback} thì gửi {Minh}`.
4. Write numbers the way people say them consistently (e.g. "hai mươi" vs "20" — pick one rule and apply it to all files; providers differ, so check the report's "worst files" if numbers dominate errors).
5. Skip unintelligible parts by cutting the audio, not by guessing.

## Files
```
data/
  manifest.csv          # copy manifest.example.csv and edit; paths relative to this folder
  audio/                # git-ignored
  refs/                 # git-ignored, one .txt per recording
```
`duration_sec` is optional; when empty it is read with `ffprobe`.
