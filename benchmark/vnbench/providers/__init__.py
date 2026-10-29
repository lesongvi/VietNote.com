from __future__ import annotations

from .base import Provider


def make_provider(spec: str) -> Provider:
    """spec examples: mock | openai:whisper-1 | deepgram:nova-2 | faster-whisper:large-v3"""
    kind, _, model = spec.partition(":")
    if kind == "mock":
        from .mock import MockProvider

        return MockProvider()
    if kind == "openai":
        from .openai_api import OpenAIProvider

        return OpenAIProvider(model or "whisper-1")
    if kind == "deepgram":
        from .deepgram import DeepgramProvider

        return DeepgramProvider(model or "nova-2")
    if kind == "faster-whisper":
        from .faster_whisper import FasterWhisperProvider

        return FasterWhisperProvider(model or "large-v3")
    raise ValueError(f"Unknown provider '{spec}'")
