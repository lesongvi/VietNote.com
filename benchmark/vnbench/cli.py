"""Usage:
  python -m vnbench.cli data/manifest.csv -p faster-whisper:large-v3 -p openai:whisper-1 \
      --price openai:whisper-1=0.006 -o results
"""
from __future__ import annotations

import argparse
from pathlib import Path

from .providers import make_provider
from .report import render
from .runner import load_manifest, run_provider


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Benchmark ASR providers on Vietnamese audio")
    ap.add_argument("manifest", type=Path)
    ap.add_argument("-p", "--provider", action="append", required=True, help="e.g. faster-whisper:large-v3")
    ap.add_argument("--price", action="append", default=[], help="provider=USD_per_audio_minute (look up current pricing yourself)")
    ap.add_argument("--language", default="vi")
    ap.add_argument("-o", "--out", type=Path, default=Path("results"))
    args = ap.parse_args(argv)

    prices = {}
    for p in args.price:
        k, _, v = p.rpartition("=")
        prices[k] = float(v)

    items = load_manifest(args.manifest)
    runs = []
    for spec in args.provider:
        provider = make_provider(spec)
        print(f"== {provider.name}: {len(items)} files")
        runs.append(run_provider(provider, items, args.out / "cache", args.language))

    args.out.mkdir(parents=True, exist_ok=True)
    report = render(runs, prices)
    (args.out / "report.md").write_text(report, encoding="utf-8")
    print(report)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
