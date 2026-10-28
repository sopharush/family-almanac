import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, MOTION_OFF } from '../lib/motion';
import Sprig from './Sprig';

const SEEN = 'fa-preloaded';

/** Brief branded intro: the sprig draws itself, a counter runs, then the curtain lifts. Once per session. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [show] = useState(() => {
    if (MOTION_OFF) return false;
    try { return !sessionStorage.getItem(SEEN); } catch { return true; }
  });

  useLayoutEffect(() => {
    if (!show) { onDone(); return; }
    try { sessionStorage.setItem(SEEN, '1'); } catch { /* ignore */ }
    document.documentElement.classList.add('is-loading');
    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>('.sprig-path path');
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      const tl = gsap.timeline({
        onComplete: () => { document.documentElement.classList.remove('is-loading'); onDone(); },
      });
      tl.to(paths, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: 0.06 }, 0)
        .to(counter, {
          v: 100, duration: 1.2, ease: 'power2.inOut',
          onUpdate: () => { if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0'); },
        }, 0)
        .from('.preloader__word', { yPercent: 110, duration: 0.8, ease: 'power4.out' }, 0.2)
        .to('.preloader__inner', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, '+=0.15')
        .to(ref.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.1');
    }, ref);
    return () => { ctx.revert(); document.documentElement.classList.remove('is-loading'); };
  }, [show, onDone]);

  if (!show) return null;
  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <Sprig className="preloader__sprig" />
        <span className="mask-line"><span className="preloader__word">The Family Almanac</span></span>
        <span ref={countRef} className="preloader__count">000</span>
      </div>
    </div>
  );
}
