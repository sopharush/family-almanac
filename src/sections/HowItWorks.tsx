import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, MOTION_OFF } from '../lib/motion';

const STEPS = [
  { n: '01', title: 'Fill it in once', body: 'One evening with a cup of coffee. Start with each child’s profile and the emergency pages — the rest can come in over time.' },
  { n: '02', title: 'Hand it off', body: 'Print a copy for the kitchen counter, or share the online version. Sitters, grandparents and your partner all read from the same page.' },
  { n: '03', title: 'Look in the book', body: 'Trash day, the dentist, the museum member ID, what she’s allergic to — the questions answer themselves. You get your head back.' },
];

/** Pinned numerals on desktop (01 → 03 as you scroll); a plain, fully visible list on mobile or with motion off. */
export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (MOTION_OFF || !ref.current) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const section = ref.current!;
      section.classList.add('is-pinned');
      const steps = gsap.utils.toArray<HTMLElement>('.how__step', section);
      const num = section.querySelector<HTMLElement>('.how__num-inner')!;
      const bar = section.querySelector<HTMLElement>('.how__bar span')!;
      gsap.set(steps.slice(1), { opacity: 0, y: 50 });
      // Sequential hand-off: each step fully leaves before the next arrives, so text never overlaps.
      const SEG = 1;      // timeline time per step
      const FADE = 0.3;   // out, then in
      const showNum = (i: number) => {
        if (num.textContent === STEPS[i].n) return;
        num.textContent = STEPS[i].n;
        gsap.fromTo(num, { yPercent: 30, opacity: 0.2 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out', overwrite: true });
      };
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: section, start: 'top top', end: `+=${steps.length * 75}%`, pin: '.how__pin', scrub: 0.6,
          onUpdate: (st) => {
            gsap.set(bar, { scaleX: st.progress });
            showNum(Math.min(steps.length - 1, Math.floor(tl.time() / SEG)));
          },
        },
      });
      steps.forEach((step, i) => {
        if (i === 0) return;
        const at = i * SEG;
        tl.to(steps[i - 1], { opacity: 0, y: -40, duration: FADE }, at - FADE)
          .to(step, { opacity: 1, y: 0, duration: FADE }, at);
      });
      tl.to({}, { duration: SEG - FADE }); // hold on the last step
      return () => { section.classList.remove('is-pinned'); };
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { clearTimeout(t); mm.revert(); };
  }, []);

  return (
    <section ref={ref} className="how" aria-labelledby="how-title">
      <div className="how__pin wrap">
        <div className="how__left">
          <p className="kicker">How it works</p>
          <h2 id="how-title" className="how__title">Three steps to a home that runs without you holding it all</h2>
          <div className="how__num" aria-hidden="true"><span className="how__num-inner">01</span></div>
          <div className="how__bar" aria-hidden="true"><span /></div>
        </div>
        <ol className="how__steps">
          {STEPS.map((s) => (
            <li key={s.n} className="how__step">
              <span className="how__step-num" aria-hidden="true">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
