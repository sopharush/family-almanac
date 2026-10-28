import { useRef } from 'react';
import { Check } from 'lucide-react';
import SignupForm from '../components/SignupForm';
import { useReveal } from '../hooks/useReveal';

const INCLUDED = [
  'The complete 70-page Family Almanac (PDF)',
  'The fill-in-online version',
  'Print it as many times as you like',
  'Free updates as new pages are added',
];

export default function Offer() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="offer section" aria-labelledby="offer-title">
      <div className="wrap offer__grid">
        <div className="offer__copy">
          <p className="kicker" data-reveal>Early members</p>
          <h2 id="offer-title" className="h2" data-mask>
            <span className="mask-line"><span className="mask-inner">Free today.</span></span>
            <span className="mask-line"><span className="mask-inner"><em>Launching at $39.</em></span></span>
          </h2>
          <p className="lede" data-reveal>Join now and the whole Almanac is yours — before it goes on sale.</p>
          <ul className="included" data-reveal-group>
            {INCLUDED.map((t) => <li key={t}><Check size={18} aria-hidden="true" />{t}</li>)}
          </ul>
        </div>
        <div className="offer__form" data-reveal>
          <SignupForm tone="light" heading="Claim your free copy" />
        </div>
      </div>
    </section>
  );
}
