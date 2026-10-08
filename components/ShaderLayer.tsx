'use client';

import { useState } from 'react';
import { Shader, MeshGradient } from 'shaders/react';

/** GPU mesh gradient, tonal yellow only. Fades in once the GPU is ready, never replaces the CSS fallback if unavailable. */
export default function ShaderLayer() {
  const [ready, setReady] = useState(false);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Shader disableTelemetry className="h-full w-full" onReady={() => setReady(true)}>
        <MeshGradient
          colorA="#FFD400"
          colorB="#FFF0A0"
          count={5}
          smoothness={2.4}
          drift={0.45}
          swirl={0.25}
          speed={0.6}
        />
      </Shader>
    </div>
  );
}
