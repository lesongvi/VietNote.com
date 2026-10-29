"""Local Whisper-family models via faster-whisper (pip install faster-whisper).

Model can be a size name (large-v3) or a path/HF id of a CTranslate2 Vietnamese
fine-tune. Runs on CPU or GPU depending on the machine.
"""
from __future__ import annotations

from .base import Provider, Transcript


class FasterWhisperProvider(Provider):
    def __init__(self, model: str = "large-v3", device: str = "auto", compute_type: str = "default"):
        self.model_id = model
        self.name = f"faster-whisper:{model}"
        self._device, self._compute = device, compute_type
        self._model = None

    def transcribe(self, audio_path: str, language: str = "vi") -> Transcript:
        if self._model is None:
            from faster_whisper import WhisperModel

            self._model = WhisperModel(self.model_id, device=self._device, compute_type=self._compute)
        segments, _info = self._model.transcribe(audio_path, language=language, vad_filter=True)
        return Transcript(text=" ".join(s.text.strip() for s in segments))
