/**
 * Theme Color Utilities
 *
 * Provides functionality to dynamically apply theme colors based on tenant branding
 */

// Convert hex to OKLCh (simplified conversion for primary color)
function hexToOklch(hex: string): { l: number; c: number; h: number } {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Convert to linear RGB
  const toLinear = (c: number) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);

  // Convert to OKLab
  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

  // Convert to OKLCh
  const C = Math.sqrt(a * a + bVal * bVal);
  let H = Math.atan2(bVal, a) * 180 / Math.PI;
  if (H < 0) H += 360;

  return { l: L, c: C, h: H };
}

// Generate OKLCh CSS string
function toOklchString(l: number, c: number, h: number): string {
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(3)})`;
}

/**
 * Apply theme color to CSS variables
 * @param color - Hex color string (e.g., '#1c1c1c')
 */
export function applyThemeColor(color: string | null | undefined) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;

  if (!color) {
    // Remove custom properties to use defaults from CSS
    root.style.removeProperty('--primary');
    root.style.removeProperty('--ring');
    root.style.removeProperty('--sidebar-primary');
    root.style.removeProperty('--sidebar-ring');
    root.style.removeProperty('--brand');
    root.style.removeProperty('--theme-color');
    root.style.removeProperty('--theme-color-light');
    root.style.removeProperty('--theme-color-muted');
    return;
  }

  const oklch = hexToOklch(color);

  // Light mode primary (slightly darker)
  const lightPrimary = toOklchString(oklch.l * 0.95, oklch.c, oklch.h);
  // Dark mode primary (slightly lighter)
  const darkPrimary = toOklchString(Math.min(oklch.l * 1.1, 0.85), oklch.c * 0.95, oklch.h);
  // Muted/lighter version for backgrounds
  const mutedPrimary = toOklchString(Math.min(oklch.l * 1.3, 0.95), oklch.c * 0.3, oklch.h);

  // Check if dark mode is active
  const isDark = root.classList.contains('dark');
  const primary = isDark ? darkPrimary : lightPrimary;

  // Set primary color variables
  root.style.setProperty('--primary', primary);
  root.style.setProperty('--ring', primary);
  root.style.setProperty('--sidebar-primary', primary);
  root.style.setProperty('--sidebar-ring', primary);
  root.style.setProperty('--brand', primary);

  // Set additional theme color variables for UI elements
  root.style.setProperty('--theme-color', color);
  root.style.setProperty('--theme-color-light', mutedPrimary);
  root.style.setProperty('--theme-color-muted', `${color}20`); // 12% opacity for backgrounds
}
