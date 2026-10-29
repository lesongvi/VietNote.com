"""Test provider: reads '<audio>.hyp.txt' next to the audio file."""
from __future__ import annotations

from pathlib import Path

from .base import Provider, Transcript


class MockProvider(Provider):
    name = "mock"

    def transcribe(self, audio_path: str, language: str = "vi") -> Transcript:
        return Transcript(text=Path(audio_path + ".hyp.txt").read_text(encoding="utf-8"))
