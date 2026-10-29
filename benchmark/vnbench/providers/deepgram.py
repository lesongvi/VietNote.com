"""Deepgram pre-recorded API (UNTESTED against the live service; check that the
chosen model supports Vietnamese before trusting results).

Env: DEEPGRAM_API_KEY.
"""
from __future__ import annotations

from .base import Provider, Transcript, require_env


class DeepgramProvider(Provider):
    def __init__(self, model: str = "nova-2"):
        self.model = model
        self.name = f"deepgram:{model}"

    def transcribe(self, audio_path: str, language: str = "vi") -> Transcript:
        import requests

        key = require_env("DEEPGRAM_API_KEY")
        with open(audio_path, "rb") as f:
            resp = requests.post(
                "https://api.deepgram.com/v1/listen",
                params={"model": self.model, "language": language, "punctuate": "true", "smart_format": "true"},
                headers={"Authorization": f"Token {key}", "Content-Type": "application/octet-stream"},
                data=f,
                timeout=600,
            )
        resp.raise_for_status()
        body = resp.json()
        text = body["results"]["channels"][0]["alternatives"][0]["transcript"]
        return Transcript(text=text, raw=body)
