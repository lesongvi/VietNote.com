"""OpenAI audio transcription API (UNTESTED against the live service — verify first run).

Env: OPENAI_API_KEY. Model via --model (e.g. whisper-1 or a gpt-4o-transcribe model).
"""
from __future__ import annotations

from .base import Provider, Transcript, require_env


class OpenAIProvider(Provider):
    def __init__(self, model: str = "whisper-1"):
        self.model = model
        self.name = f"openai:{model}"

    def transcribe(self, audio_path: str, language: str = "vi") -> Transcript:
        import requests  # lazy: optional dependency

        key = require_env("OPENAI_API_KEY")
        with open(audio_path, "rb") as f:
            resp = requests.post(
                "https://api.openai.com/v1/audio/transcriptions",
                headers={"Authorization": f"Bearer {key}"},
                data={"model": self.model, "language": language, "response_format": "json"},
                files={"file": f},
                timeout=600,
            )
        resp.raise_for_status()
        body = resp.json()
        return Transcript(text=body["text"], raw=body)
