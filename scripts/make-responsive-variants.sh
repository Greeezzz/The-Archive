#!/bin/bash
# Generate mobile-width variants for srcset. Cards render ~358px wide on phones,
# so the 900px master is 2.5x oversized there.
set -e
export PATH="$LOCALAPPDATA/hermes/tools/ffmpeg-9.0.1-win32-x64/bin:$PATH"
cd "C:/Users/USER/The-Archive/public"

mkdir -p characters/480 banners/960

for f in characters/*.webp; do
  base=$(basename "$f" .webp)
  out="characters/480/${base}.webp"
  [ -f "$out" ] && continue
  ffmpeg -hide_banner -loglevel error -y -i "$f" \
    -vf "scale=480:-2:flags=lanczos" -c:v libwebp -quality 80 -compression_level 6 "$out"
done

for f in banners/*.webp; do
  base=$(basename "$f" .webp)
  out="banners/960/${base}.webp"
  [ -f "$out" ] && continue
  ffmpeg -hide_banner -loglevel error -y -i "$f" \
    -vf "scale=960:-2:flags=lanczos" -c:v libwebp -quality 80 -compression_level 6 "$out"
done

echo "characters/480: $(du -sh characters/480 | cut -f1) for $(ls characters/480 | wc -l) files"
echo "banners/960:    $(du -sh banners/960 | cut -f1) for $(ls banners/960 | wc -l) files"
