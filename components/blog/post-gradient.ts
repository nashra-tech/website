/**
 * Generates a deterministic, unique gradient for a post based on its title.
 * Each post gets a consistent, visually distinct soft gradient.
 */

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const GRADIENT_PAIRS = [
  ['#a18cd1', '#fbc2eb'], // lavender → pink
  ['#a1c4fd', '#c2e9fb'], // blue → light blue
  ['#84fab0', '#8fd3f4'], // mint → sky
  ['#ffecd2', '#fcb69f'], // cream → salmon
  ['#f6d365', '#fda085'], // gold → peach
  ['#667eea', '#764ba2'], // indigo → purple
  ['#89f7fe', '#66a6ff'], // cyan → blue
  ['#d4fc79', '#96e6a1'], // lime → mint
  ['#ff9a9e', '#fecfef'], // rose → light pink
  ['#c3cfe2', '#f5f7fa'], // steel → white
  ['#e0c3fc', '#8ec5fc'], // violet → sky
  ['#f093fb', '#f5576c'], // magenta → coral
];

export function getPostGradient(title: string): string {
  const hash = hashString(title || 'untitled');
  const pair = GRADIENT_PAIRS[hash % GRADIENT_PAIRS.length];
  const angle = 120 + (hash % 60); // 120°–180° range
  return `linear-gradient(${angle}deg, ${pair[0]}, ${pair[1]})`;
}
