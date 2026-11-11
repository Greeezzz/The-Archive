export const isLightColor = (hex) => {
  if (!hex) return false;
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length < 6) return true;
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150;
};

const channel = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const contrast = (a, b) => {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/**
 * The entry color as a *text* color: some character colors are near-black
 * (#1A1A1A, #2D2C2C), which vanish as small mono labels on the dark panel.
 * Lightens the hue toward white until it clears 4.5:1 on `bg`.
 */
export const readableOn = (hex, bg = '#111316') => {
  if (!hex || !hex.startsWith('#') || hex.length < 4) return '#e9ecef';
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  let [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  if ([r, g, b].some(Number.isNaN)) return '#e9ecef';

  for (let step = 0; step < 20; step += 1) {
    const current = `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;
    if (contrast(current, bg) >= 4.5) return current;
    r += (255 - r) * 0.12;
    g += (255 - g) * 0.12;
    b += (255 - b) * 0.12;
  }
  return '#e9ecef';
};
