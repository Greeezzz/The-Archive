#!/bin/bash
# Phase 4 image pass: downscale oversized artwork + emit width/height manifest.
set -e
export PATH="$LOCALAPPDATA/hermes/tools/ffmpeg-9.0.1-win32-x64/bin:$PATH"
cd "C:/Users/USER/The-Archive/public"

before=$(du -sk characters banners | awk '{s+=$1} END {print s}')

for f in characters/*.webp; do
  w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$f")
  if [ "$w" -gt 900 ]; then
    ffmpeg -hide_banner -loglevel error -y -i "$f" -vf "scale=900:-2:flags=lanczos" -c:v libwebp -quality 82 -compression_level 6 "$f.tmp.webp"
    mv "$f.tmp.webp" "$f"
  fi
done

for f in banners/*.webp; do
  w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$f")
  if [ "$w" -gt 1720 ]; then
    ffmpeg -hide_banner -loglevel error -y -i "$f" -vf "scale=1720:-2:flags=lanczos" -c:v libwebp -quality 82 -compression_level 6 "$f.tmp.webp"
    mv "$f.tmp.webp" "$f"
  fi
done

for f in projects/*.webp; do
  [ -f "$f" ] || continue
  w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$f")
  if [ "$w" -gt 1200 ]; then
    ffmpeg -hide_banner -loglevel error -y -i "$f" -vf "scale=1200:-2:flags=lanczos" -c:v libwebp -quality 82 -compression_level 6 "$f.tmp.webp"
    mv "$f.tmp.webp" "$f"
  fi
done

after=$(du -sk characters banners | awk '{s+=$1} END {print s}')
echo "characters+banners: ${before}KB -> ${after}KB"