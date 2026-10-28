import Lenis from 'lenis';
import { gsap, ScrollTrigger, MOTION_OFF } from './motion';

let lenis: Lenis | null = null;

/** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in lockstep. */
export function startSmoothScroll() {
  if (MOTION_OFF || lenis) return () => {};
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Smooth-scroll to an in-page anchor (falls back to native scrolling when motion is off). */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -24, duration: 1.4 });
  else (el as HTMLElement).scrollIntoView({ behavior: MOTION_OFF ? 'auto' : 'smooth', block: 'start' });
}
