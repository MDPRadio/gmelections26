'use client';

import { useEffect, useMemo, useState } from 'react';
import { copy } from '@/lib/copy';
import type { Candidate } from '@/lib/types';

type AtollOption = { code: string; nameDv: string };

function Skeleton() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} data-stagger-item className="overflow-hidden rounded-[20px] bg-paper">
          <div className="flex aspect-[4/4.4] items-center justify-center bg-[repeating-linear-gradient(135deg,#ECECE7_0,#ECECE7_12px,#E2E2DC_12px,#E2E2DC_24px)] text-xl font-bold text-ash-text">
            {copy.candidates.photo}
          </div>
          <div className="flex flex-col gap-1 px-5 pb-5 pt-4">
            <span className="text-2xl font-bold leading-normal">{copy.candidates.namePlaceholder}</span>
            <span className="text-lg leading-relaxed text-ash-text">{copy.candidates.atollPlaceholder}</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default function Candidates({
  candidates,
  atolls,
}: {
  candidates: Candidate[];
  atolls: AtollOption[];
}) {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const onFilter = (e: Event) => setFilter((e as CustomEvent<string>).detail ?? '');
    window.addEventListener('filter-atoll', onFilter);
    return () => window.removeEventListener('filter-atoll', onFilter);
  }, []);

  const shown = useMemo(
    () => (filter ? candidates.filter((c) => c.atollCode === filter) : candidates),
    [candidates, filter],
  );

  return (
    <section id="candidates" className="mx-auto max-w-[1280px] border-t-2 border-ink px-5 pb-20 pt-16 md:px-14 md:pt-[72px]">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-thaana text-6xl font-bold leading-[1.3] sm:text-[84px]">{copy.candidates.title}</h2>
        <select
          aria-label={copy.candidates.allAtolls}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-[52px] rounded-full border-2 border-ink bg-transparent px-6 font-thaana text-xl font-bold text-ink"
        >
          <option value="">{copy.candidates.allAtolls}</option>
          {atolls.map((a) => (
            <option key={a.code} value={a.code}>
              {a.nameDv}
            </option>
          ))}
        </select>
      </div>

      <div
        data-stagger
        className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]"
      >
        {candidates.length === 0 ? (
          <Skeleton />
        ) : shown.length === 0 ? (
          <p className="col-span-full text-2xl font-bold leading-relaxed">{copy.candidates.empty}</p>
        ) : (
          shown.map((c) => (
            <article key={c.id} data-stagger-item className="overflow-hidden rounded-[20px] bg-paper">
              {c.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.photoUrl} alt={c.nameDv} loading="lazy" className="aspect-[4/4.4] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/4.4] items-center justify-center bg-[#ECECE7] text-xl font-bold text-ash-text">
                  {copy.candidates.photo}
                </div>
              )}
              <div className="flex flex-col gap-1 px-5 pb-5 pt-4">
                <h3 className="text-2xl font-bold leading-normal">{c.nameDv}</h3>
                <p className="text-lg leading-relaxed text-ash-text">{c.atollNameDv}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
