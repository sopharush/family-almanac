import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** True when the visitor prefers reduced motion, or when `?motion=off` / `?noanim` is in the URL (review/screenshot mode). */
const computeMotionOff = () => {
  if (typeof window === 'undefined') return true;
  const q = new URLSearchParams(window.location.search);
  if (q.get('motion') === 'off' || q.has('noanim')) return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const MOTION_OFF = computeMotionOff();
export const FINE_POINTER =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine) and (hover: hover)').matches;

export { gsap, ScrollTrigger };
