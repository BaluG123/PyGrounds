# NeuraLearn AI — Store Assets

Assets for Google Play release.

## Files

| File | Size | Use |
|------|------|-----|
| `app-icon-512.png` | 512×512 | Play Store app icon (upload high-res icon) |
| `feature-graphic-1024x500.png` | 1024×500 | Play Store feature graphic banner |

Source logo also lives at `src/assets/neuralearn-logo.png` (in-app drawer & dashboard).

## Screenshot watermarks

Add to every Play Store screenshot:

1. **Text:** `NeuraLearn AI`
2. **Font:** Bold sans-serif (Inter, SF Pro, or similar)
3. **Background:** Rounded pill, `#183B56` at 85% opacity
4. **Text color:** `#FFFFFF`
5. **Position:** Bottom-right, 24px from edges
6. **Padding:** 8px vertical, 14px horizontal

### Canva / Figma quick steps

1. Import phone screenshot (1080×2400 or device capture).
2. Add rectangle → round corners 999 → fill `#183B56` → opacity 85%.
3. Add text **NeuraLearn AI** → white, bold, 14–16px.
4. Place bottom-right; export PNG.

### Optional tagline under watermark

`Learn Python · AI · Machine Learning` in `#F6C85F`, 11px, below the pill.

## Feature graphic checklist

- [ ] Brand name **NeuraLearn AI** visible at a glance
- [ ] Tagline readable at thumbnail size
- [ ] No cluttered collage — one phone mockup max
- [ ] High contrast (navy + gold + white)
- [ ] No misleading "Google" or "ChatGPT" branding

## Android launcher icons

Adaptive icons are generated from `app-icon-512.png` into all `mipmap-*` folders.

Regenerate after updating the master icon:

```bash
python3 scripts/generate-android-icons.py
```

- **Background:** `#183B56` (NeuraLearn navy) via `values/colors.xml` → `ic_launcher_background`
- **Foreground:** `ic_launcher_foreground.png` per density (safe-zone padded logo)
- **Legacy:** `ic_launcher.png` + `ic_launcher_round.png` for pre-API 26 devices

## iOS app icon

Replace icons in `ios/PyGrounds/Images.xcassets/AppIcon.appiconset/` from the same 1024×1024 master.
