"""Text normalization for Vietnamese WER scoring.

References may mark English terms with braces, e.g. "chốt {deadline} thứ Sáu".
Braces are removed for normal scoring; the marked terms are returned separately so
code-switching accuracy can be measured.
"""
from __future__ import annotations

import re
import unicodedata

_EN_MARK = re.compile(r"\{([^{}]+)\}")
# Anything that is not a letter, digit or space (after NFC) is punctuation.
_PUNCT = re.compile(r"[^\w\s]", re.UNICODE)
_WS = re.compile(r"\s+")


def strip_diacritics(text: str) -> str:
    """Remove Vietnamese tone/vowel marks (đ -> d). Used for the lenient metric."""
    text = text.replace("đ", "d").replace("Đ", "D")
    decomposed = unicodedata.normalize("NFD", text)
    return unicodedata.normalize("NFC", "".join(c for c in decomposed if unicodedata.category(c) != "Mn"))


def english_terms(reference: str) -> list[str]:
    """Return the words marked as English in a reference, normalized."""
    terms: list[str] = []
    for m in _EN_MARK.finditer(reference):
        terms.extend(normalize(m.group(1)).split())
    return terms


def normalize(text: str) -> str:
    """NFC, lowercase, drop {} markers and punctuation, collapse whitespace."""
    text = unicodedata.normalize("NFC", text)
    text = _EN_MARK.sub(lambda m: m.group(1), text)
    text = text.lower()
    text = _PUNCT.sub(" ", text.replace("_", " "))
    return _WS.sub(" ", text).strip()


def tokens(text: str) -> list[str]:
    n = normalize(text)
    return n.split() if n else []
