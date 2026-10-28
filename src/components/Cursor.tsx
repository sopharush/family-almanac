import { useEffect, useRef } from 'react';
import { gsap, MOTION_OFF, FINE_POINTER } from '../lib/motion';

/** Dot + trailing ring that swells over links and buttons. Desktop pointers only, never with motion off. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const enabled = FINE_POINTER && !MOTION_OFF;

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add('has-cursor');
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });
    const move = (e: PointerEvent) => { document.documentElement.classList.add('cursor-live'); dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
    const over = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement).closest('a, button, summary, input, [data-cursor]');
      ring.current?.classList.toggle('is-hover', Boolean(hit));
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.classList.remove('has-cursor', 'cursor-live');
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
