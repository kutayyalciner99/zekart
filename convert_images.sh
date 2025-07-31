#!/bin/bash
# Batch convert all .jpg, .jpeg, .png images to .webp and .avif
# Usage: sh convert_images.sh
# Requires: cwebp (brew install webp), avifenc (brew install libavif)

set -e

find images images/imagen2 images/imagen2/imagen2 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | while read img; do
  base="${img%.*}"
  # Convert to WebP (skip if exists)
  if [ ! -f "$base.webp" ]; then
    echo "Converting $img to $base.webp"
    cwebp -q 80 "$img" -o "$base.webp"
  fi
  # Convert to AVIF (skip if exists)
  if [ ! -f "$base.avif" ]; then
    echo "Converting $img to $base.avif"
    avifenc --min 20 --max 30 "$img" "$base.avif"
  fi
done

echo "All images converted to WebP and AVIF!" 