'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * One place for every scroll animation on the page, driven by data attributes:
 *   data-parallax="-0.15"            move at a fraction of scroll (yPercent), relative to its section
 *   data-parallax-start="top"        start at the top of the page (hero) instead of when entering the viewport
 *   data-reveal                      fade/slide up once when entering
 *   data-stagger > [data-stagger-item]   staggered reveal for a group
 *   data-spine-line                  vertical line that draws as you scroll through its row
 *   data-spine-node                  node that pops in
 *   data-count="12"                  number that counts up once
 * Everything is skipped for prefers-reduced-motion.
 */
export default function ScrollEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax ?? '0.15');
        const root = el.closest<HTMLElement>('[data-parallax-root]') ?? el;
        gsap.to(el, {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: el.dataset.parallaxStart === 'top' ? 'top top' : 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 44,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        const items = group.querySelectorAll('[data-stagger-item]');
        if (!items.length) return;
        gsap.from(items, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-spine-line]').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: line.parentElement,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-spine-node]').forEach((node) => {
        gsap.from(node, {
          scale: 0.2,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: node, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        if (Number.isNaN(target)) return;
        const pad = Number(el.dataset.pad ?? '2');
        const state = { v: 0 };
        el.textContent = '0'.padStart(pad, '0');
        gsap.to(state, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.v)).padStart(pad, '0');
          },
        });
      });
    });

    // Layout shifts after webfonts load
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, []);

  return null;
}
