'use client';

import { FormEvent, useState } from 'react';
import { copy } from '@/lib/copy';
import type { Voter } from '@/lib/types';

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ok'; voter: Voter }
  | { status: 'error'; message: string };

const errs = copy.lookup.errors;
const byCode: Record<string, string> = {
  invalid_id: errs.invalid,
  not_found: errs.notFound,
  unavailable: errs.unavailable,
  rate_limited: errs.rateLimited,
};

export default function VoterLookup() {
  const [id, setId] = useState('');
  const [state, setState] = useState<State>({ status: 'idle' });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState({ status: 'loading' });
    try {
      const res = await fetch('/api/voter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nationalId: id }),
      });
      const json = await res.json();
      if (!res.ok) {
        setState({ status: 'error', message: byCode[json.error] ?? errs.generic });
        return;
      }
      setState({ status: 'ok', voter: json as Voter });
    } catch {
      setState({ status: 'error', message: errs.generic });
    }
  }

  const rows =
    state.status === 'ok'
      ? [
          [copy.lookup.name, state.voter.nameDv],
          [copy.lookup.dhaairaa, state.voter.dhaairaa],
          [copy.lookup.station, state.voter.pollingStation],
        ]
      : null;

  return (
    <form
      id="lookup"
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-3xl bg-paper p-6 sm:p-8"
      noValidate
    >
      <h2 className="font-thaana text-3xl font-bold leading-normal">{copy.lookup.title}</h2>
      <label htmlFor="nid" className="text-lg font-bold leading-relaxed">
        {copy.lookup.idLabel}
      </label>
      <input
        id="nid"
        name="nationalId"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="characters"
        dir="ltr"
        placeholder="A000000"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="num h-14 w-full rounded-2xl border-2 border-ink bg-paper px-4 text-lg font-semibold text-ink placeholder:text-ash focus:outline-none focus-visible:ring-4 focus-visible:ring-cobalt/40"
      />
      <button
        type="submit"
        disabled={state.status === 'loading' || id.trim().length === 0}
        className="h-14 rounded-2xl bg-cobalt font-thaana text-2xl font-bold text-paper transition-opacity disabled:opacity-60"
      >
        {state.status === 'loading' ? copy.lookup.loading : copy.lookup.submit}
      </button>

      <div aria-live="polite">
        {state.status === 'error' && (
          <p className="rounded-2xl border-2 border-ink px-4 py-3 text-lg font-bold leading-relaxed">
            {state.message}
          </p>
        )}
        {rows && (
          <dl className="flex flex-col gap-2.5 rounded-2xl border-2 border-ash px-4 py-4">
            <dt className="sr-only">{copy.lookup.result}</dt>
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 text-lg leading-relaxed">
                <dt className="text-ash-text">{k}</dt>
                <dd className="font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </form>
  );
}
