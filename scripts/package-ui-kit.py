#!/usr/bin/env python3
"""Package authored resources; exclude installed implementation caches."""
from pathlib import Path
import argparse
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_DIRS = {"node_modules", ".upstream", "dist", ".vite", ".git", "__pycache__"}
EXCLUDED_PREFIXES = (
    "example/public/assets/3d/",
    "example/public/assets/draco/",
)
EXCLUDED_FILES = {"example/public/assets/fonts/RobotoFlex.ttf"}

def included(path):
    relative = path.relative_to(ROOT).as_posix()
    return (not any(part in EXCLUDED_DIRS for part in path.relative_to(ROOT).parts)
            and not relative.startswith(EXCLUDED_PREFIXES)
            and relative not in EXCLUDED_FILES
            and not relative.endswith((".zip", ".download", ".tsbuildinfo")))

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT.parent / "AGENT_WAN_UI_KIT.zip")
    args = parser.parse_args()
    project = ROOT / "example"
    manifest = json.loads((project / "catalog/upstream-manifest.json").read_text())
    for component in manifest["components"]:
        slug = component["slug"]
        for relative in (f"src/demos/{slug}.tsx", f"docs/components/{slug}.md"):
            if not (project / relative).is_file():
                raise SystemExit(f"Required resource is missing: {relative}")
    business = json.loads((project / "catalog/business-catalog.json").read_text())
    for component in business["components"]:
        for relative in (component["demoPath"], component["guidePath"]):
            if not (project / relative).is_file():
                raise SystemExit(f"Required business resource is missing: {relative}")
    if not (ROOT / "SKILL.md").is_file():
        raise SystemExit("The progressive SKILL.md entry is missing; run docs:build first.")
    files = sorted(path for path in ROOT.rglob("*") if path.is_file() and included(path))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(args.output, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path in files:
            archive.write(path, "agent-wan-ui/" + path.relative_to(ROOT).as_posix())
    with zipfile.ZipFile(args.output) as archive:
        if archive.testzip() is not None:
            raise SystemExit("Archive CRC validation failed.")
        names = archive.namelist()
        if any("/.upstream/" in name or "/node_modules/" in name or "/dist/" in name for name in names):
            raise SystemExit("Unexpected third-party implementation in archive.")
    print(json.dumps({"archive": str(args.output.resolve()), "files": len(files),
                      "bytes": args.output.stat().st_size, "components": len(manifest["components"]) + len(business["components"]),
                      "react_bits_components": len(manifest["components"]), "business_components": len(business["components"]),
                      "official_sources_bundled": False}, ensure_ascii=False))

if __name__ == "__main__":
    main()
