import { useLayoutEffect, useRef } from 'react';
import PagePreview from '../components/PagePreview';
import SignupForm from '../components/SignupForm';
import { gsap, MOTION_OFF, FINE_POINTER } from '../lib/motion';
import { useReady } from '../lib/ReadyContext';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useReady();

  // Intro, once the preloader has cleared
  useLayoutEffect(() => {
    if (MOTION_OFF || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.set('.hero .mask-inner', { yPercent: 112 });
      gsap.set(['.hero__kicker', '.hero__sub', '.hero__pills', '.hero .signup'], { opacity: 0, y: 24 });
      gsap.set('.hero__stack .page', { opacity: 0, y: 70, rotate: 0 });
      gsap.set('.hero__bg img', { scale: 1.08 });
      if (!ready) return;
      // The photo settles on its own clock so it never delays the copy
      gsap.to('.hero__bg img', { scale: 1, duration: 2.6, ease: 'power2.out' });
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.to('.hero__kicker', { opacity: 1, y: 0, duration: 0.8 }, 0.05)
        .to('.hero .mask-inner', { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.25)
        .to(['.hero__sub', '.hero__pills', '.hero .signup'], { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.6)
        .to('.hero__stack .page', {
          opacity: 1, y: 0, duration: 1.3, stagger: 0.12,
          rotate: (i: number) => [-7, 6, 0][i] ?? 0, ease: 'expo.out',
        }, 0.5);
    }, ref);
    return () => ctx.revert();
  }, [ready]);

  // Depth: pages drift gently against the pointer (the photo itself stays still)
  useLayoutEffect(() => {
    if (MOTION_OFF || !FINE_POINTER || !ref.current) return;
    const layers = gsap.utils.toArray<HTMLElement>('.hero__stack .page', ref.current);
    const movers = layers.map((el, i) => {
      const depth = [12, 18, 28][i] ?? 16;
      return { x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3' }), depth };
    });
    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      movers.forEach((m) => { m.x(nx * m.depth); m.y(ny * m.depth); });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <section ref={ref} className="hero" id="top">
      <picture className="hero__bg" aria-hidden="true">
        <img
          src="/art/hero-1600.webp"
          srcSet="/art/hero-960.webp 960w, /art/hero-1600.webp 1600w, /art/hero-2560.webp 2560w"
          sizes="100vw" alt="" fetchPriority="high" decoding="async"
        />
      </picture>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__inner wrap">
        <div className="hero__copy" id="get">
          <p className="kicker hero__kicker">A home management guide · 70 pages</p>
          <h1 className="hero__title">
            <span className="mask-line"><span className="mask-inner">The Family</span></span>
            <span className="mask-line"><span className="mask-inner"><em>Almanac</em></span></span>
          </h1>
          <p className="hero__sub">
            Allergies, schedules, meals, member IDs, chores — everything your home runs on, in one calm book.
            When someone asks, the answer is simply: <span className="script">look in the book.</span>
          </p>
          <ul className="hero__pills" aria-label="What you get">
            <li>Printable PDF</li><li>Fill it in online</li><li>30+ sections</li>
          </ul>
          <SignupForm tone="dark" />
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__stack">
            <PagePreview name="weekreset" alt="" className="hero__p hero__p--back" eager />
            <PagePreview name="meals" alt="" className="hero__p hero__p--mid" eager />
            <PagePreview name="cover" alt="" className="hero__p hero__p--front" eager />
          </div>
        </div>
      </div>
      <p className="hero__scroll" aria-hidden="true">Scroll</p>
    </section>
  );
}
