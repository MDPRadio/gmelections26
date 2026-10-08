import { copy } from '@/lib/copy';

export default function Nav() {
  return (
    <nav className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-14">
      <a href="#" className="flex items-center gap-3.5">
        <span className="font-thaana text-3xl font-bold leading-normal sm:text-4xl">{copy.siteName}</span>
        <span className="num text-xl font-extrabold">{copy.year}</span>
      </a>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-lg font-bold">
        <a href="#footprint" className="hidden hover:underline sm:inline">{copy.nav.atolls}</a>
        <a href="#candidates" className="hidden hover:underline sm:inline">{copy.nav.candidates}</a>
        <a href="#timeline" className="hidden hover:underline sm:inline">{copy.nav.timeline}</a>
        <a href="#lookup" className="rounded-full bg-cobalt px-6 py-2 font-bold leading-relaxed text-paper">
          {copy.nav.lookup}
        </a>
      </div>
    </nav>
  );
}
