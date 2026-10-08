import { copy } from '@/lib/copy';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-start justify-between gap-10 px-5 py-12 md:px-14">
        <div>
          <p className="font-thaana text-5xl font-bold leading-normal text-sun">
            {copy.siteName} <span className="num text-3xl font-extrabold">{copy.year}</span>
          </p>
          <p className="mt-2.5 text-lg leading-relaxed text-[#BDBDB7]">
            © <span className="num">{copy.year}</span> {copy.party}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-xl font-bold">
          <a href="#footprint" className="hover:underline">{copy.nav.atolls}</a>
          <a href="#candidates" className="hover:underline">{copy.nav.candidates}</a>
          <a href="#lookup" className="hover:underline">{copy.nav.lookup}</a>
          <a href="#timeline" className="hover:underline">{copy.nav.timeline}</a>
        </nav>
      </div>
    </footer>
  );
}
