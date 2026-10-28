import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { scrollToHash } from '../lib/smooth';

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="problem section tex-light">
      <div className="wrap">
        <p className="kicker" data-reveal>The mental load</p>
        <h2 className="statement" data-mask>
          <span className="mask-line"><span className="mask-inner">Home was never meant</span></span>
          <span className="mask-line"><span className="mask-inner">to rest on <em>one person’s</em></span></span>
          <span className="mask-line"><span className="mask-inner">shoulders.</span></span>
        </h2>
        <div className="problem__cols" data-reveal-group>
          <p>Every appointment, every allergy, every permission slip and birthday and Wi-Fi password — it all lives in one person’s head. And every question in the house finds its way back to that one person.</p>
          <p>The Family Almanac is your family’s second brain. Fill it in once, and a husband, a grandparent, a babysitter — even an older child — can keep the house running without asking you twenty questions.</p>
        </div>
        <a className="bridge" href="#get" onClick={(e) => { e.preventDefault(); scrollToHash('#get'); }} data-reveal>
          Set it down — get your free copy <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
