export function isValidIcon(icon: string): boolean {
  if (!icon || icon.length > 10) return false;
  const emojiRegex = /\p{Emoji}/u;
  return emojiRegex.test(icon);
}
