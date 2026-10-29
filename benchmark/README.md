# VietNote ASR benchmark (Phase 1)

Compares speech-to-text providers/models on **our own** Vietnamese recordings and reports accuracy, speed and cost, so the product decisions in [`../PLANNING.md`](../PLANNING.md) rest on numbers.

## Metrics
- **WER** (pooled over all files) — main quality number.
- **WER (no tones)** — same, ignoring diacritics; a big gap means tone marks are the main problem.
- **CER**, **RTF** (processing time / audio time), **$/min** (you supply prices; look up current pricing yourself).
- **EN-term accuracy** — share of `{braced}` English terms in the reference that were transcribed exactly (the code-switching wedge).
- Per-category WER table and the worst files per provider.

## Run
```bash
cd benchmark
pip install -r requirements.txt            # plus faster-whisper if testing local models
cp data/manifest.example.csv data/manifest.csv   # then add audio/ and refs/ (see data/README.md)

export OPENAI_API_KEY=...  DEEPGRAM_API_KEY=...
python -m vnbench.cli data/manifest.csv \
  -p faster-whisper:large-v3 -p openai:whisper-1 -p deepgram:nova-2 \
  --price openai:whisper-1=0.006 -o results
# report: results/report.md   (transcripts cached in results/cache, so re-runs are free)
```
Providers: `faster-whisper:<model-or-path>`, `openai:<model>`, `deepgram:<model>`, `mock` (tests). Add one by subclassing `Provider` in `vnbench/providers/`.

## Tests
```bash
python3 -m unittest discover -s tests -v
```

## Status / caveats
- Scoring code and the CLI are tested (11 tests). The **OpenAI, Deepgram and faster-whisper adapters have not been run against the real services** — expect to fix small API details on the first real run.
- Whether a given provider/model supports Vietnamese must be verified; the harness will simply show it as high WER.
- Streaming latency is **not** measured yet (batch only); add it when the realtime gateway is designed.
