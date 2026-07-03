#!/usr/bin/env python3
"""Regenerate Android launcher & adaptive icons from store-assets/app-icon-512.png."""

from __future__ import annotations

import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "store-assets/app-icon-512.png")
RES = os.path.join(ROOT, "android/app/src/main/res")
BG = (0x18, 0x3B, 0x56, 255)

FOREGROUND_SIZES = {
    "mipmap-mdpi": 108,
    "mipmap-hdpi": 162,
    "mipmap-xhdpi": 216,
    "mipmap-xxhdpi": 324,
    "mipmap-xxxhdpi": 432,
}

LEGACY_SIZES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}


def fit_icon(source: Image.Image, canvas_size: int, scale: float = 0.72) -> Image.Image:
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    target = int(canvas_size * scale)
    icon = source.copy()
    icon.thumbnail((target, target), Image.Resampling.LANCZOS)
    x = (canvas_size - icon.width) // 2
    y = (canvas_size - icon.height) // 2
    canvas.paste(icon, (x, y), icon)
    return canvas


def legacy_icon(source: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), BG)
    target = int(size * 0.88)
    icon = source.copy()
    icon.thumbnail((target, target), Image.Resampling.LANCZOS)
    x = (size - icon.width) // 2
    y = (size - icon.height) // 2
    canvas.paste(icon, (x, y), icon)
    return canvas.convert("RGB")


def main() -> None:
    if not os.path.isfile(SRC):
        raise SystemExit(f"Missing source icon: {SRC}")

    source = Image.open(SRC).convert("RGBA")

    for folder, px in FOREGROUND_SIZES.items():
        out_dir = os.path.join(RES, folder)
        os.makedirs(out_dir, exist_ok=True)
        fit_icon(source, px).save(os.path.join(out_dir, "ic_launcher_foreground.png"), "PNG")

    for folder, px in LEGACY_SIZES.items():
        out_dir = os.path.join(RES, folder)
        os.makedirs(out_dir, exist_ok=True)
        icon = legacy_icon(source, px)
        icon.save(os.path.join(out_dir, "ic_launcher.png"), "PNG")
        icon.save(os.path.join(out_dir, "ic_launcher_round.png"), "PNG")

    print("Android icons updated from", SRC)


if __name__ == "__main__":
    main()
