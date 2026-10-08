import { copy } from '@/lib/copy';
import HeroBackdrop from './HeroBackdrop';
import Countdown from './Countdown';
import VoterLookup from './VoterLookup';

const dateLabel = process.env.NEXT_PUBLIC_ELECTION_DATE
  ? new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Indian/Maldives',
    }).format(new Date(process.env.NEXT_PUBLIC_ELECTION_DATE))
  : null;

export default function Hero() {
  return (
    <header data-parallax-root className="relative isolate overflow-hidden border-t-2 border-ink">
      <HeroBackdrop />
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-start gap-14 px-5 pb-20 pt-12 md:px-14 md:pb-24 md:pt-14">
        <div data-parallax="0.1" data-parallax-start="top" className="min-w-0 flex-[999_1_560px]">
          <p className="text-xl font-bold leading-relaxed sm:text-2xl">{copy.hero.kicker}</p>
          <h1 className="mt-4 font-thaana text-5xl font-bold leading-[1.3] sm:text-7xl lg:text-[108px]">
            {copy.hero.title}
          </h1>
          <div className="num mt-2 text-[96px] font-extrabold leading-[0.85] tracking-tighter sm:text-[160px] lg:text-[240px]">
            {copy.year}
          </div>
          <p className="mt-10 text-2xl font-bold leading-relaxed">
            {copy.hero.votingDay}:{' '}
            {dateLabel ? <span className="num">{dateLabel}</span> : copy.hero.datePlaceholder}
          </p>
          <Countdown />
        </div>
        <div data-parallax="-0.06" data-parallax-start="top" className="min-w-0 flex-[1_1_400px]">
          <VoterLookup />
        </div>
      </div>
    </header>
  );
}
