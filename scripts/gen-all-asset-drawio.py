"""Merge asset-flows-part*.json and emit one .drawio per PNG spec."""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from drawio_builder import write_spec  # noqa: E402

REPO = Path(__file__).resolve().parents[1]
SPEC_DIR = REPO / "content" / "drawio" / "_specs"
OUT_DIR = REPO / "content" / "drawio"


def load_all_specs() -> list[dict]:
    specs: list[dict] = []
    seen: set[str] = set()
    for path in sorted(SPEC_DIR.glob("asset-flows-part*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        items = data if isinstance(data, list) else data.get("diagrams") or []
        for item in items:
            key = item.get("source_image") or item.get("output") or item.get("id")
            if key in seen:
                continue
            seen.add(key)
            specs.append(item)
    return specs


def main() -> None:
    SPEC_DIR.mkdir(parents=True, exist_ok=True)
    legacy = REPO / "content" / "drawio"
    for name in [
        "asset-flows-part1.json",
        "asset-flows-part2.json",
        "asset-flows-part3.json",
        "asset-flows-part4.json",
    ]:
        src = legacy / name
        if src.is_file():
            dst = SPEC_DIR / name
            if not dst.exists():
                dst.write_text(src.read_text(encoding="utf-8"), encoding="utf-8")

    specs = load_all_specs()
    if not specs:
        print("No specs found in", SPEC_DIR, file=sys.stderr)
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for spec in specs:
        try:
            out = write_spec(spec, OUT_DIR)
            print(out.name)
        except Exception as exc:
            src = spec.get("source_image", "?")
            print(f"FAIL {src}: {exc}", file=sys.stderr)

    merged = SPEC_DIR / "asset-flows.json"
    merged.write_text(
        json.dumps(specs, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Merged {len(specs)} specs -> {merged}")


if __name__ == "__main__":
    main()
