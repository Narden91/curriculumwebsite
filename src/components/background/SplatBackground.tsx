import { useEffect, useRef } from 'react';

// Decorative only: three.js loads in its own chunk after first paint,
// and the page looks complete without it.
const SplatBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let stop: (() => void) | undefined;
    let cancelled = false;

    import('./splatScene')
      .then(({ startSplatScene }) => {
        if (!cancelled) stop = startSplatScene(canvas);
      })
      .catch(() => {}); // a failed chunk load only costs the decoration

    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="splat-bg" aria-hidden="true" />;
};

export default SplatBackground;
