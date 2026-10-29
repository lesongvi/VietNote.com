"""Run providers over a manifest, cache transcripts, compute metrics."""
from __future__ import annotations

import csv
import json
import re
import subprocess
import time
from dataclasses import dataclass, field
from pathlib import Path

from . import metrics
from .providers.base import Provider


@dataclass
class Item:
    id: str
    audio: Path
    reference: str
    category: str
    duration_sec: float


@dataclass
class ItemResult:
    item: Item
    hypothesis: str
    elapsed_sec: float
    wer: metrics.Edits
    wer_lenient: metrics.Edits
    cer: metrics.Edits
    en_found: int
    en_total: int


@dataclass
class ProviderRun:
    provider: str
    results: list[ItemResult] = field(default_factory=list)
    failures: dict[str, str] = field(default_factory=dict)


def probe_duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def load_manifest(manifest: Path) -> list[Item]:
    base = manifest.parent
    items: list[Item] = []
    with manifest.open(encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            audio = base / row["audio"]
            ref = (base / row["reference"]).read_text(encoding="utf-8")
            dur = float(row["duration_sec"]) if row.get("duration_sec") else probe_duration(audio)
            items.append(Item(row["id"], audio, ref, row.get("category") or "uncategorized", dur))
    return items


def _safe(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "_", name)


def run_provider(provider: Provider, items: list[Item], cache_dir: Path, language: str = "vi") -> ProviderRun:
    run = ProviderRun(provider.name)
    pdir = cache_dir / _safe(provider.name)
    pdir.mkdir(parents=True, exist_ok=True)
    for item in items:
        cache = pdir / f"{_safe(item.id)}.json"
        try:
            if cache.exists():
                data = json.loads(cache.read_text(encoding="utf-8"))
            else:
                t0 = time.monotonic()
                tr = provider.transcribe(str(item.audio), language)
                data = {"text": tr.text, "elapsed_sec": time.monotonic() - t0}
                cache.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
        except Exception as exc:  # keep going; report failures
            run.failures[item.id] = f"{type(exc).__name__}: {exc}"
            continue
        hyp = data["text"]
        found, total = metrics.english_term_accuracy(item.reference, hyp)
        run.results.append(ItemResult(
            item, hyp, data["elapsed_sec"],
            metrics.wer(item.reference, hyp),
            metrics.wer_no_diacritics(item.reference, hyp),
            metrics.cer(item.reference, hyp),
            found, total,
        ))
    return run


def aggregate(results: list[ItemResult]) -> dict:
    """Micro-averaged (total errors / total reference words), not mean of per-file rates."""
    if not results:
        return {"files": 0}
    ref_words = sum(r.wer.ref_len for r in results)
    ref_chars = sum(r.cer.ref_len for r in results)
    audio_sec = sum(r.item.duration_sec for r in results)
    elapsed = sum(r.elapsed_sec for r in results)
    en_total = sum(r.en_total for r in results)
    return {
        "files": len(results),
        "audio_min": audio_sec / 60,
        "wer": metrics.rate(sum(r.wer.errors for r in results), ref_words),
        "wer_lenient": metrics.rate(sum(r.wer_lenient.errors for r in results), ref_words),
        "cer": metrics.rate(sum(r.cer.errors for r in results), ref_chars),
        "en_acc": (sum(r.en_found for r in results) / en_total) if en_total else None,
        "rtf": (elapsed / audio_sec) if audio_sec else None,
    }
