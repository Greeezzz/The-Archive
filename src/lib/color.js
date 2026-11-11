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
