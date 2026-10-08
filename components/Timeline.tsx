import { copy } from '@/lib/copy';

export default function Timeline() {
  return (
    <section id="timeline" className="mx-auto max-w-[1280px] border-t-2 border-ink px-5 pb-20 pt-16 md:px-14">
      <h2 data-reveal className="font-thaana text-5xl font-bold leading-[1.3] sm:text-[64px]">
        {copy.timeline.title}
      </h2>
      <ol data-stagger className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7">
        {copy.timeline.steps.map((step, i) => (
          <li key={step} data-stagger-item className="border-t-[3px] border-ink pt-3.5">
            <span className="num text-base font-extrabold">{String(i + 1).padStart(2, '0')}</span>
            <p className="mt-1.5 text-3xl font-bold leading-normal">{step}</p>
            <p className="mt-1.5 text-xl font-semibold leading-relaxed">{copy.timeline.datePlaceholder}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
