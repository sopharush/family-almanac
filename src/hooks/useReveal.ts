import { useLayoutEffect, type RefObject } from 'react';
import { gsap, MOTION_OFF } from '../lib/motion';

/**
 * Scroll reveals for a section, driven by data attributes:
 *   [data-reveal]        — fade/rise a single element
 *   [data-reveal-group]  — stagger its direct children
 *   [data-mask]          — kinetic masked lines (.mask-line > .mask-inner)
 * Content is fully visible without JS or with motion off; GSAP only sets the "from" state when it runs.
 */
export function useReveal(ref: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    if (MOTION_OFF || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 36, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 87%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        gsap.from(group.children, {
          y: 32, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 86%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-mask]').forEach((el) => {
        gsap.from(el.querySelectorAll('.mask-inner'), {
          yPercent: 112, duration: 1.15, ease: 'power4.out', stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}
