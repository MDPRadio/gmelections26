'use client';

import { useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { copy } from '@/lib/copy';
import type { Atoll } from '@/lib/types';

function Dots({ n }: { n: number | null }) {
  if (n === null) return <span className="num text-sm font-bold">—</span>;
  const shown = Math.min(n, 12);
  return (
    <span className="flex items-center gap-1.5">
      {Array.from({ length: shown }).map((_, i) => (
        <span key={i} className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-sun" />
      ))}
      <span className="num ms-1.5 text-sm font-bold">{n}</span>
    </span>
  );
}

function showCandidates(code: string) {
  window.dispatchEvent(new CustomEvent('filter-atoll', { detail: code }));
}

export default function SeatSpine({ atolls }: { atolls: Atoll[] }) {
  const [open, setOpen] = useState<string | null>(null);

  const allKnown = atolls.length > 0 && atolls.every((a) => a.seats !== null);
  const total = allKnown ? atolls.reduce((sum, a) => sum + (a.seats ?? 0), 0) : null;
  const maxSeats = Math.max(1, ...atolls.map((a) => a.seats ?? 0));

  return (
    <section id="footprint" className="mx-auto max-w-[1280px] border-t-2 border-ink px-5 pb-14 pt-16 md:px-14 md:pt-[72px]">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-10">
        <div className="min-w-0 flex-[1_1_480px]">
          <p className="text-2xl font-bold leading-relaxed">{copy.footprint.kicker}</p>
          <h2 className="mt-1.5 font-thaana text-5xl font-bold leading-[1.3] sm:text-7xl">{copy.footprint.title}</h2>
          <p className="mt-3.5 max-w-[560px] text-2xl leading-[1.7]">{copy.footprint.lead}</p>
        </div>
        <div className="flex-[0_1_380px] rounded-3xl bg-ink px-9 py-6 text-paper">
          <p className="text-2xl font-bold leading-normal text-sun">{copy.footprint.total}</p>
          <div
            className="num mt-2 text-7xl font-extrabold leading-none tracking-tighter text-sun sm:text-[84px]"
            data-count={total ?? undefined}
            data-pad="2"
          >
            {total ?? '—'}
          </div>
        </div>
      </div>

      <ol className="mt-14">
        {atolls.map((a, i) => {
          const first = i % 2 === 0;
          const isOpen = open === a.code;
          const size = a.seats ? 20 + Math.round((a.seats / maxSeats) * 24) : 28;
          return (
            <li
              key={a.code}
              className="grid grid-cols-[44px_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)]"
            >
              <div className="relative col-start-1 row-start-1 md:col-start-2">
                <div data-spine-line className="absolute inset-y-0 start-1/2 w-0.5 -translate-x-1/2 bg-ink rtl:translate-x-1/2" />
                <div
                  data-spine-node
                  className={`absolute start-1/2 top-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-sun outline outline-2 outline-ink rtl:translate-x-1/2 ${isOpen ? 'bg-cobalt' : 'bg-ink'}`}
                  style={{ width: size, height: size }}
                />
              </div>

              <div
                data-reveal
                className={`col-start-2 row-start-1 flex flex-col items-start pb-9 pt-3 text-start ${
                  first ? 'md:col-start-1 md:items-end md:text-end' : 'md:col-start-3'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${a.code}`}
                  onClick={() => setOpen(isOpen ? null : a.code)}
                  className={`flex flex-col items-start text-start ${first ? 'md:items-end md:text-end' : ''}`}
                >
                  <span className="font-thaana text-3xl font-bold leading-normal sm:text-4xl">{a.nameDv}</span>
                  <span className="flex items-baseline gap-3">
                    <span
                      className="num text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl"
                      data-count={a.seats ?? undefined}
                      data-pad="2"
                    >
                      {a.seats ?? '—'}
                    </span>
                    <span className="text-2xl font-bold leading-normal">{copy.footprint.seat}</span>
                  </span>
                </button>

                <div
                  id={`panel-${a.code}`}
                  onTransitionEnd={() => ScrollTrigger.refresh()}
                  className={`grid w-full max-w-[440px] transition-[grid-template-rows] duration-500 ${
                    isOpen ? 'mt-4 grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className={`overflow-hidden ${isOpen ? 'visible' : 'invisible'}`}>
                    <div className="rounded-[20px] border-2 border-ink bg-paper px-6 py-5 text-start">
                      <p className="text-lg font-bold leading-relaxed text-ash-text">
                        {a.nameDv} · {copy.footprint.islandsIn}
                      </p>
                      {a.islands.length === 0 ? (
                        <p className="py-3 text-lg leading-relaxed">{copy.footprint.noIslands}</p>
                      ) : (
                        <ul>
                          {a.islands.map((isl) => (
                            <li key={isl.code} className="flex items-center justify-between gap-3 border-b border-ash py-2.5 last:border-b-0">
                              <span className="text-2xl font-bold leading-normal">{isl.nameDv}</span>
                              <Dots n={isl.seats} />
                            </li>
                          ))}
                        </ul>
                      )}
                      <a
                        href="#candidates"
                        onClick={() => showCandidates(a.code)}
                        className="mt-2 inline-block text-xl font-bold leading-relaxed text-cobalt"
                      >
                        {copy.footprint.viewCandidates} ←
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
