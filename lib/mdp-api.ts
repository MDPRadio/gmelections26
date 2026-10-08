import 'server-only';
import type { Atoll, Candidate, Voter } from './types';
import { PLACEHOLDER_ATOLLS } from './placeholder';

const BASE = process.env.MDP_API_BASE;
const KEY = process.env.MDP_API_KEY;
const KEY_HEADER = process.env.MDP_API_KEY_HEADER ?? 'x-api-key';

export const apiConfigured = Boolean(BASE && KEY);

/**
 * ASSUMED endpoints. Replace with the real paths once the API docs / sample JSON arrive,
 * then adjust the map* functions below to the real response shapes.
 */
const PATHS = {
  dhaairaa: '/gaumee-majlis/dhaairaa',
  candidates: '/gaumee-majlis/candidates',
  voter: (nationalId: string) => `/gaumee-majlis/voter/${encodeURIComponent(nationalId)}`,
};

async function call(path: string, init: RequestInit & { next?: { revalidate?: number } } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { Accept: 'application/json', [KEY_HEADER]: KEY as string, ...init.headers },
  });
  return res;
}

// ---- mappers (identity-ish until the real JSON shape is known) ----

function mapAtoll(raw: any): Atoll {
  return {
    code: String(raw.code),
    nameDv: String(raw.nameDv ?? raw.name_dv ?? raw.name ?? raw.code),
    seats: typeof raw.seats === 'number' ? raw.seats : null,
    islands: Array.isArray(raw.islands)
      ? raw.islands.map((i: any) => ({
          code: String(i.code),
          nameDv: String(i.nameDv ?? i.name_dv ?? i.name ?? i.code),
          seats: typeof i.seats === 'number' ? i.seats : null,
        }))
      : [],
  };
}

function mapCandidate(raw: any): Candidate {
  return {
    id: String(raw.id),
    nameDv: String(raw.nameDv ?? raw.name_dv ?? raw.name ?? ''),
    atollCode: String(raw.atollCode ?? raw.atoll_code ?? ''),
    atollNameDv: String(raw.atollNameDv ?? raw.atoll_name_dv ?? raw.atoll ?? ''),
    photoUrl: raw.photoUrl ?? raw.photo_url ?? raw.photo ?? null,
  };
}

// ---- public fetchers (ISR, 5 minutes) ----

export async function getAtolls(): Promise<{ configured: boolean; data: Atoll[] }> {
  if (!apiConfigured) return { configured: false, data: PLACEHOLDER_ATOLLS };
  try {
    const res = await call(PATHS.dhaairaa, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`dhaairaa ${res.status}`);
    const json = await res.json();
    const list = Array.isArray(json) ? json : json.data ?? [];
    return { configured: true, data: list.map(mapAtoll) };
  } catch {
    return { configured: true, data: PLACEHOLDER_ATOLLS };
  }
}

export async function getCandidates(): Promise<Candidate[]> {
  if (!apiConfigured) return [];
  try {
    const res = await call(PATHS.candidates, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`candidates ${res.status}`);
    const json = await res.json();
    const list = Array.isArray(json) ? json : json.data ?? [];
    return list.map(mapCandidate);
  } catch {
    return [];
  }
}

/** Never cached, voter data is personal. Returns null when no voter matches. */
export async function lookupVoter(nationalId: string): Promise<Voter | null> {
  const res = await call(PATHS.voter(nationalId), { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`voter ${res.status}`);
  const json = await res.json();
  const v = json.data ?? json;
  if (!v) return null;
  return {
    nameDv: String(v.nameDv ?? v.name_dv ?? v.name ?? ''),
    dhaairaa: String(v.dhaairaa ?? v.constituency ?? ''),
    pollingStation: String(v.pollingStation ?? v.polling_station ?? ''),
  };
}
