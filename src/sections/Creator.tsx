import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

/** Meet the creator — the person and the home behind the Almanac. */
export default function Creator() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="creator section tex-light" aria-labelledby="creator-title">
      <div className="wrap creator__grid">
        <figure className="creator__photo" data-reveal>
          <img
            src="/creator/family-640.webp"
            srcSet="/creator/family-640.webp 640w, /creator/family-1100.webp 1100w"
            sizes="(min-width: 900px) 500px, 88vw"
            alt="Sopha and Anthony Rush with their children, laughing together on a bed"
            loading="lazy" decoding="async" width={640} height={735}
          />
        </figure>
        <div className="creator__copy">
          <p className="kicker" data-reveal>Meet the creator</p>
          <h2 id="creator-title" className="h2" data-mask>
            <span className="mask-line"><span className="mask-inner">Made by a mom</span></span>
            <span className="mask-line"><span className="mask-inner"><em>who needed it, too.</em></span></span>
          </h2>
          <div className="creator__body" data-reveal-group>
            <p>
              Sopha Rush is a wife to Anthony, a mom, and the founder of <b>Anti-Rush Club</b> — a faith-rooted
              community choosing presence over pressure, people over performance, and God over hustle.
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
          <a className="bridge" href="https://antirushclub.com" target="_blank" rel="noopener" data-reveal>
            Visit Anti-Rush Club <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
