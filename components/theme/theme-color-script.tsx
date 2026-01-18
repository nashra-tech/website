/**
 * Theme Color Script Component
 *
 * Server-side component that injects theme color CSS variables
 * before React hydration to prevent flash of default colors
 */

interface ThemeColorScriptProps {
  brandColor?: string;
}

// Convert hex to OKLCh (same logic as client-side)
function hexToOklch(hex: string): { l: number; c: number; h: number } {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);

  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

  const C = Math.sqrt(a * a + bVal * bVal);
  let H = Math.atan2(bVal, a) * 180 / Math.PI;
  if (H < 0) H += 360;

  return { l: L, c: C, h: H };
}

function toOklchString(l: number, c: number, h: number): string {
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(3)})`;
}

function generateThemeColorCSS(brandColor: string): string {
  const oklch = hexToOklch(brandColor);

  const lightPrimary = toOklchString(oklch.l * 0.95, oklch.c, oklch.h);
  const darkPrimary = toOklchString(Math.min(oklch.l * 1.1, 0.85), oklch.c * 0.95, oklch.h);
  const mutedPrimary = toOklchString(Math.min(oklch.l * 1.3, 0.95), oklch.c * 0.3, oklch.h);

  return `
    :root {
      --primary: ${lightPrimary};
      --ring: ${lightPrimary};
      --sidebar-primary: ${lightPrimary};
      --sidebar-ring: ${lightPrimary};
      --brand: ${lightPrimary};
      --theme-color: ${brandColor};
      --theme-color-light: ${mutedPrimary};
      --theme-color-muted: ${brandColor}20;
    }

    :root.dark {
      --primary: ${darkPrimary};
      --ring: ${darkPrimary};
      --sidebar-primary: ${darkPrimary};
      --sidebar-ring: ${darkPrimary};
      --brand: ${darkPrimary};
    }
  `;
}

export function ThemeColorScript({ brandColor }: ThemeColorScriptProps) {
  if (!brandColor) {
    return null;
  }

  const css = generateThemeColorCSS(brandColor);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />
  );
}
