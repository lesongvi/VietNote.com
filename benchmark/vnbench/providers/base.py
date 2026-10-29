from __future__ import annotations

import os
from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class Transcript:
    text: str
    # seconds spent by the provider (wall clock), filled by the runner
    elapsed_sec: float = 0.0
    raw: dict | None = None


class Provider(ABC):
    name: str

    @abstractmethod
    def transcribe(self, audio_path: str, language: str = "vi") -> Transcript: ...


def require_env(var: str) -> str:
    value = os.environ.get(var)
    if not value:
        raise RuntimeError(f"Environment variable {var} is not set")
    return value
