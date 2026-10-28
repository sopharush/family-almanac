import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

const FAQ = [
  ['What exactly do I get?', 'A beautifully designed 70-page PDF you can print and write in, plus the online version you can fill in on a computer, tablet or phone. Both cover the same 30+ sections.'],
  ['Do I have to fill in every page?', 'Not at all. Use only the sections that fit your family. Most people start with the family profiles and the emergency pages, then fill in the rest over time.'],
  ['Is my information private?', 'Yes. The PDF lives on your device, and the online version saves only in your own browser — nothing you type is uploaded. Sensitive pages include gentle guidance, like storing password hints rather than passwords.'],
  ['Can my partner or babysitter use it?', 'That’s the whole idea. Print a copy for the kitchen, or share the file. The For Sitters and Ask the Book pages are made for exactly that.'],
  ['Will it always be free?', 'It’s free for early members in exchange for your email. It will go on sale later — but if you grab it now, it’s yours to keep.'],
];

export default function Faq() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="faq section tex-light" aria-labelledby="faq-title">
      <div className="wrap faq__wrap">
        <p className="kicker" data-reveal>Good to know</p>
        <h2 id="faq-title" className="h3" data-reveal>Questions, answered</h2>
        <div className="faq__list" data-reveal-group>
          {FAQ.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
