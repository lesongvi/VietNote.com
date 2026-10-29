import csv
import tempfile
import unittest
import wave
from pathlib import Path

from vnbench import metrics
from vnbench.cli import main
from vnbench.normalize import english_terms, normalize, strip_diacritics


class NormalizeTests(unittest.TestCase):
    def test_normalize_strips_punct_case_and_markers(self):
        self.assertEqual(normalize("Chốt {Deadline}, thứ Sáu!"), "chốt deadline thứ sáu")

    def test_nfc_equivalence(self):
        decomposed = "việt"  # "việt" with combining marks
        self.assertEqual(normalize(decomposed), normalize("việt"))

    def test_strip_diacritics(self):
        self.assertEqual(strip_diacritics("Đường hiểu"), "Duong hieu")

    def test_english_terms(self):
        self.assertEqual(english_terms("gửi {sprint review} và {deadline}"), ["sprint", "review", "deadline"])


class MetricTests(unittest.TestCase):
    def test_perfect(self):
        self.assertEqual(metrics.wer("xin chào các bạn", "Xin chào, các bạn.").errors, 0)

    def test_counts(self):
        e = metrics.wer("a b c d", "a x c")  # 1 sub, 1 del
        self.assertEqual((e.sub, e.dele, e.ins, e.ref_len), (1, 1, 0, 4))
        self.assertAlmostEqual(metrics.rate(e.errors, e.ref_len), 0.5)

    def test_insertion(self):
        e = metrics.wer("a b", "a b c")
        self.assertEqual((e.sub, e.dele, e.ins), (0, 0, 1))

    def test_empty_reference(self):
        self.assertEqual(metrics.rate(metrics.wer("", "").errors, 0), 0.0)

    def test_lenient_ignores_tones(self):
        self.assertGreater(metrics.wer("hiểu rồi", "hieu roi").errors, 0)
        self.assertEqual(metrics.wer_no_diacritics("hiểu rồi", "hieu roi").errors, 0)

    def test_english_term_accuracy(self):
        found, total = metrics.english_term_accuracy("chốt {deadline} thứ sáu", "chốt đét lai thứ sáu")
        self.assertEqual((found, total), (0, 1))
        found, total = metrics.english_term_accuracy("chốt {deadline} thứ sáu", "chốt deadline thứ sáu")
        self.assertEqual((found, total), (1, 1))


def _silent_wav(path: Path, seconds: int = 1):
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(16000)
        w.writeframes(b"\x00\x00" * 16000 * seconds)


class EndToEndTests(unittest.TestCase):
    def test_cli_with_mock_provider(self):
        with tempfile.TemporaryDirectory() as tmp:
            d = Path(tmp)
            _silent_wav(d / "a.wav")
            (d / "a.txt").write_text("chốt {deadline} thứ sáu", encoding="utf-8")
            (d / "a.wav.hyp.txt").write_text("chốt deadline thứ bảy", encoding="utf-8")
            with (d / "manifest.csv").open("w", encoding="utf-8", newline="") as f:
                w = csv.writer(f)
                w.writerow(["id", "audio", "reference", "category", "duration_sec"])
                w.writerow(["a", "a.wav", "a.txt", "meeting", "1"])
            self.assertEqual(main([str(d / "manifest.csv"), "-p", "mock", "-o", str(d / "out")]), 0)
            report = (d / "out" / "report.md").read_text(encoding="utf-8")
            self.assertIn("| mock | 1 |", report)
            self.assertIn("25.0%", report)  # 1 sub / 4 words
            self.assertIn("100.0%", report)  # english term correct


if __name__ == "__main__":
    unittest.main()
