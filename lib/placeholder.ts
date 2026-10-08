import type { Atoll } from './types';

/**
 * Structure only: used when the MDP API is not configured (local dev / first deploy).
 * Seat counts are null on purpose, nothing here is real data.
 */
const names: [string, string][] = [
  ['HA', 'ހއ. އަތޮޅު'],
  ['HDh', 'ހދ. އަތޮޅު'],
  ['Sh', 'ށ. އަތޮޅު'],
  ['N', 'ނ. އަތޮޅު'],
  ['R', 'ރ. އަތޮޅު'],
  ['B', 'ބ. އަތޮޅު'],
  ['Lh', 'ޅ. އަތޮޅު'],
  ['K', 'ކ. އަތޮޅު'],
  ['AA', 'އއ. އަތޮޅު'],
  ['ADh', 'އދ. އަތޮޅު'],
  ['V', 'ވ. އަތޮޅު'],
  ['M', 'މ. އަތޮޅު'],
  ['F', 'ފ. އަތޮޅު'],
  ['Dh', 'ދ. އަތޮޅު'],
  ['Th', 'ތ. އަތޮޅު'],
  ['L', 'ލ. އަތޮޅު'],
  ['GA', 'ގއ. އަތޮޅު'],
  ['GDh', 'ގދ. އަތޮޅު'],
  ['Gn', 'ޏ. އަތޮޅު'],
  ['S', 'ސ. އަތޮޅު'],
];

export const PLACEHOLDER_ATOLLS: Atoll[] = [
  ...names.map(([code, nameDv]) => ({ code, nameDv, seats: null, islands: [] })),
  { code: 'MLE', nameDv: 'މާލެ ސިޓީ', seats: null, islands: [] },
  { code: 'ADDU', nameDv: 'އައްޑޫ ސިޓީ', seats: null, islands: [] },
];
