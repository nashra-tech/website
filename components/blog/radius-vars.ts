/**
 * CSS custom properties for consistent corner radius across all blog components.
 * --blog-radius: interactive elements (buttons, inputs)
 * --blog-radius-lg: containers (cards, images, dialogs)
 *
 * Injected on :root so they cascade to portals (e.g. Radix Dialog).
 */

const RADIUS_MAP: Record<string, { sm: string; lg: string }> = {
  sharp: { sm: '0.25rem',  lg: '0.375rem' },
  round: { sm: '0.75rem',  lg: '0.75rem' },
};

export function getRadiusStyleTag(cornerRadius: string | undefined): string {
  const { sm, lg } = RADIUS_MAP[cornerRadius || 'round'] || RADIUS_MAP.round;
  return `:root{--blog-radius:${sm};--blog-radius-lg:${lg}}`;
}
