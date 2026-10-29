"""WER / CER and code-switching accuracy."""
from __future__ import annotations

from dataclasses import dataclass

from .normalize import english_terms, normalize, strip_diacritics, tokens


@dataclass
class Edits:
    sub: int
    dele: int
    ins: int
    ref_len: int
    # per-reference-token flag: True when that token was matched exactly
    matched: list[bool]

    @property
    def errors(self) -> int:
        return self.sub + self.dele + self.ins


def align(ref: list[str], hyp: list[str]) -> Edits:
    """Levenshtein alignment with backtrace so we know which ref tokens matched."""
    n, m = len(ref), len(hyp)
    d = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        d[i][0] = i
    for j in range(1, m + 1):
        d[0][j] = j
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            cost = 0 if ref[i - 1] == hyp[j - 1] else 1
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)

    sub = dele = ins = 0
    matched = [False] * n
    i, j = n, m
    while i > 0 or j > 0:
        if i > 0 and j > 0 and d[i][j] == d[i - 1][j - 1] + (0 if ref[i - 1] == hyp[j - 1] else 1):
            if ref[i - 1] == hyp[j - 1]:
                matched[i - 1] = True
            else:
                sub += 1
            i, j = i - 1, j - 1
        elif i > 0 and d[i][j] == d[i - 1][j] + 1:
            dele += 1
            i -= 1
        else:
            ins += 1
            j -= 1
    return Edits(sub, dele, ins, n, matched)


def wer(reference: str, hypothesis: str) -> Edits:
    return align(tokens(reference), tokens(hypothesis))


def wer_no_diacritics(reference: str, hypothesis: str) -> Edits:
    """Lenient WER that ignores tone marks (shows how much error is only diacritics)."""
    r = strip_diacritics(normalize(reference)).split()
    h = strip_diacritics(normalize(hypothesis)).split()
    return align(r, h)


def cer(reference: str, hypothesis: str) -> Edits:
    r = list(normalize(reference).replace(" ", ""))
    h = list(normalize(hypothesis).replace(" ", ""))
    return align(r, h)


def english_term_accuracy(reference: str, hypothesis: str) -> tuple[int, int]:
    """(found, total) for words marked {like this} in the reference.

    A term counts as found when the aligned hypothesis token equals it exactly.
    """
    terms = set(english_terms(reference))
    if not terms:
        return (0, 0)
    ref_tokens = tokens(reference)
    edits = align(ref_tokens, tokens(hypothesis))
    total = found = 0
    for tok, ok in zip(ref_tokens, edits.matched):
        if tok in terms:
            total += 1
            found += int(ok)
    return (found, total)


def rate(errors: int, total: int) -> float:
    return errors / total if total else 0.0
