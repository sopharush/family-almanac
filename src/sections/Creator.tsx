import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { gsap, MOTION_OFF } from '../lib/motion';

/** Meet the creator — the person and the home behind the Almanac. */
export default function Creator() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useLayoutEffect(() => {
    if (MOTION_OFF || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.creator__small', { yPercent: 14 }, {
        yPercent: -14, ease: 'none',
        scrollTrigger: { trigger: '.creator__media', start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="creator section tex-light" aria-labelledby="creator-title">
      <div className="wrap creator__grid">
        <div className="creator__media">
          <figure className="creator__main">
            <img
              src="/creator/sopha-main-640.webp"
              srcSet="/creator/sopha-main-640.webp 640w, /creator/sopha-main-1100.webp 1100w"
              sizes="(min-width: 900px) 460px, 86vw"
              alt="Sopha Rush laughing with her husband" loading="lazy" decoding="async" width={640} height={800}
            />
          </figure>
          <figure className="creator__small" aria-hidden="true">
            <img src="/creator/sopha-portrait-640.webp" alt="" loading="lazy" decoding="async" width={640} height={800} />
          </figure>
        </div>
        <div className="creator__copy">
          <p className="kicker" data-reveal>Meet the creator</p>
          <h2 id="creator-title" className="h2" data-mask>
            <span className="mask-line"><span className="mask-inner">Made by a mom</span></span>
            <span className="mask-line"><span className="mask-inner"><em>who needed it, too.</em></span></span>
          </h2>
          <div className="creator__body" data-reveal-group>
            <p>
              Sopha Rush is a wife, a mom, and the founder of <b>Anti-Rush Club</b> — a faith-rooted community
              choosing presence over pressure, people over performance, and God over hustle.
            </p>
            <p>
              Her home runs on slow mornings, Sunday dinners, homeschool days and a garden out back. And like so many
              moms, she noticed how much of it lived only in her head — every appointment, allergy, and answer to
              “where is it?”
            </p>
            <p>
              The Family Almanac is the system she built so her family could find those answers without her.
              Her prayer is that it gives your home the same thing it gave hers: a little more peace, and a lot
              less carrying it alone.
            </p>
          </div>
          <p className="creator__sign script" data-reveal>— Sopha</p>
          <a className="bridge" href="https://anti-rush-club.netlify.app/" target="_blank" rel="noopener" data-reveal>
            Visit Anti-Rush Club <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
