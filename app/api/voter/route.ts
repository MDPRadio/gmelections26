import { NextResponse } from 'next/server';
import { apiConfigured, lookupVoter } from '@/lib/mdp-api';

export const dynamic = 'force-dynamic';

// Best-effort per-instance limiter. On Vercel use Upstash/KV for a shared limit.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const body = await req.json().catch(() => null);
  const id = typeof body?.nationalId === 'string' ? body.nationalId.trim().toUpperCase() : '';
  if (!/^[A-Z]\d{5,7}$/.test(id)) return NextResponse.json({ error: 'invalid_id' }, { status: 400 });

  if (!apiConfigured) return NextResponse.json({ error: 'unavailable' }, { status: 503 });

  try {
    const voter = await lookupVoter(id);
    if (!voter) return NextResponse.json({ error: 'not_found' }, { status: 404 });
    return NextResponse.json(voter, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }
}
