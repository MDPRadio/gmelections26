'use client';

import { useEffect, useState } from 'react';
import { copy } from '@/lib/copy';

const TARGET = process.env.NEXT_PUBLIC_ELECTION_DATE
  ? new Date(process.env.NEXT_PUBLIC_ELECTION_DATE).getTime()
  : NaN;

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

const two = (n: number) => String(n).padStart(2, '0');

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const p = now !== null && !Number.isNaN(TARGET) ? parts(TARGET - now) : { d: 0, h: 0, m: 0, s: 0 };
  const cells = [
    { v: p.d, l: copy.hero.days },
    { v: p.h, l: copy.hero.hours },
    { v: p.m, l: copy.hero.minutes },
    { v: p.s, l: copy.hero.seconds },
  ];

  return (
    <div className="mt-5 grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:gap-3.5" role="timer" aria-live="off">
      {cells.map((c) => (
        <div key={c.l} className="rounded-2xl border-2 border-ink px-2 py-3 text-center sm:min-w-[110px] sm:px-6 sm:py-3.5">
          <div className="num text-3xl font-extrabold leading-none sm:text-5xl">{two(c.v)}</div>
          <div className="mt-1.5 text-sm font-bold leading-normal sm:text-lg">{c.l}</div>
        </div>
      ))}
    </div>
  );
}
