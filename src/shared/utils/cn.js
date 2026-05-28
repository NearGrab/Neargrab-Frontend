/**
 * Minimalist classnames helper for merging conditional class names cleanly
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
