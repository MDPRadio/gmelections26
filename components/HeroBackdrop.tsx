'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ShaderLayer = dynamic(() => import('./ShaderLayer'), { ssr: false });

/**
 * Flat yellow + CSS blobs always render (first paint, no-WebGPU, reduced motion).
 * The GPU shader is loaded client-side only, on capable devices that allow motion.
 * The inner layer is taller than the hero so the scroll parallax never exposes a gap.
 */
export default function HeroBackdrop() {
  const [gpu, setGpu] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGpu = typeof navigator !== 'undefined' && 'gpu' in navigator;
    setGpu(hasGpu && !reduce);
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-sun">
      <div
        data-parallax="0.12"
        data-parallax-start="top"
        className="absolute inset-x-0 -bottom-1/4 -top-1/4 bg-sun"
      >
        <div className="sh-blob sh-b1" />
        <div className="sh-blob sh-b2" />
        <div className="sh-blob sh-b3" />
        {gpu && <ShaderLayer />}
      </div>
    </div>
  );
}
