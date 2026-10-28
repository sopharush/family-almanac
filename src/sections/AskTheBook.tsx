import { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import PagePreview from '../components/PagePreview';
import { useReveal } from '../hooks/useReveal';
import { gsap, MOTION_OFF } from '../lib/motion';
import { scrollToHash } from '../lib/smooth';

const QA = [
  ['Can they have medicine?', 'Each child’s profile'],
  ['What’s the Wi-Fi password?', 'Home Information'],
  ['Whose turn is it for chores?', 'Chores'],
  ['Where are the passports?', 'Important Documents'],
  ['What are we cleaning today?', 'The Weekly Reset'],
  ['What’s for Sunday dinner?', 'Meals & Holidays'],
];

export default function AskTheBook() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  // gentle parallax on the page image
  useLayoutEffect(() => {
    if (MOTION_OFF || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ask__visual .page', { yPercent: 8 }, {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.ask__visual', start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ask section tex-light" aria-labelledby="ask-title">
      <div className="wrap ask__grid">
        <div className="ask__visual">
          <PagePreview name="ask" alt="The Ask the Book page: common questions and where to find each answer" />
        </div>
        <div className="ask__copy">
          <p className="kicker" data-reveal>The signature page</p>
          <h2 id="ask-title" className="h2" data-mask>
            <span className="mask-line"><span className="mask-inner">Before asking Mom —</span></span>
            <span className="mask-line"><span className="mask-inner"><em>ask the book.</em></span></span>
          </h2>
          <p className="lede" data-reveal>Every question you hear twenty times a day, with the page that answers it. Tape it inside a cabinet and watch the questions stop.</p>
          <ul className="qa" data-reveal-group>
            {QA.map(([q, a]) => (
              <li key={q}><span className="qa__q">“{q}”</span><span className="qa__a">See <b>{a}</b></span></li>
            ))}
          </ul>
          <a className="bridge" href="#get" onClick={(e) => { e.preventDefault(); scrollToHash('#get'); }} data-reveal>
            Get your copy free <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
