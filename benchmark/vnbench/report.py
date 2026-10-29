from __future__ import annotations

from collections import defaultdict

from .runner import ProviderRun, aggregate


def _pct(x):
    return "—" if x is None else f"{x * 100:.1f}%"


def _num(x, fmt="{:.2f}"):
    return "—" if x is None else fmt.format(x)


def render(runs: list[ProviderRun], prices: dict[str, float]) -> str:
    lines = ["# ASR benchmark report", ""]
    lines += [
        "| Provider | Files | Audio (min) | WER | WER (no tones) | CER | EN-term acc | RTF | $/min |",
        "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
    ]
    for run in runs:
        a = aggregate(run.results)
        price = prices.get(run.provider)
        lines.append(
            f"| {run.provider} | {a['files']} | {_num(a.get('audio_min'), '{:.1f}')} | {_pct(a.get('wer'))} | "
            f"{_pct(a.get('wer_lenient'))} | {_pct(a.get('cer'))} | {_pct(a.get('en_acc'))} | "
            f"{_num(a.get('rtf'))} | {_num(price, '{:.4f}')} |"
        )
    lines += ["", "WER = (substitutions + deletions + insertions) / reference words, pooled over all files. "
              "'no tones' ignores diacritics (shows how much error is only tone marks). "
              "EN-term acc = share of `{braced}` English terms transcribed exactly. "
              "RTF = processing time / audio time (lower is faster).", ""]

    cats = sorted({r.item.category for run in runs for r in run.results})
    if cats:
        lines += ["## WER by category", "", "| Category | " + " | ".join(r.provider for r in runs) + " |",
                  "| --- | " + " | ".join("---:" for _ in runs) + " |"]
        for cat in cats:
            row = [cat]
            for run in runs:
                sel = [r for r in run.results if r.item.category == cat]
                row.append(_pct(aggregate(sel).get("wer")) if sel else "—")
            lines.append("| " + " | ".join(row) + " |")
        lines.append("")

    for run in runs:
        if run.failures:
            lines += [f"## Failures — {run.provider}", ""]
            lines += [f"- `{k}`: {v}" for k, v in run.failures.items()]
            lines.append("")

    worst = defaultdict(list)
    for run in runs:
        for r in sorted(run.results, key=lambda r: -r.wer.errors / max(r.wer.ref_len, 1))[:3]:
            worst[run.provider].append(f"`{r.item.id}` ({_pct(r.wer.errors / max(r.wer.ref_len, 1))}, {r.item.category})")
    lines += ["## Worst files per provider", ""]
    lines += [f"- **{p}**: " + ", ".join(v) for p, v in worst.items()]
    return "\n".join(lines) + "\n"
