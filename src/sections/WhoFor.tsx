import { useRef } from 'react';
import { Users, HeartHandshake, Brain, Printer, MonitorSmartphone, BookHeart } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const WHO = [
  { icon: Users, title: 'Parents juggling multiple kids', body: 'Allergies, doctors, sizes and schedules — each child on their own page.' },
  { icon: HeartHandshake, title: 'Sitters & grandparents', body: 'Hand them the book and they’ll know exactly what to do.' },
  { icon: Brain, title: 'Anyone carrying the mental load', body: 'Set it down once. Let the book remember so you don’t have to.' },
];
const HOW = [
  { icon: Printer, title: 'Print & write by hand', body: 'A 70-page US-letter PDF. Print it all, or just the pages you need.' },
  { icon: MonitorSmartphone, title: 'Fill it in online', body: 'Type into the online version on any device; it saves as you go.' },
  { icon: BookHeart, title: 'Yours to keep', body: 'Reprint and update it every season as your family grows.' },
];

export default function WhoFor() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const list = (items: typeof WHO) => (
    <ul className="feats" data-reveal-group>
      {items.map(({ icon: Icon, title, body }) => (
        <li key={title}><Icon className="feats__icon" size={26} strokeWidth={1.6} aria-hidden="true" /><div><b>{title}</b><span>{body}</span></div></li>
      ))}
    </ul>
  );
  return (
    <section ref={ref} className="who section tex-light">
      <div className="wrap who__grid">
        <div>
          <p className="kicker" data-reveal>Who it’s for</p>
          <h2 className="h3" data-reveal>Made for busy families who run on systems</h2>
          {list(WHO)}
        </div>
        <div>
          <p className="kicker" data-reveal>How you’ll use it</p>
          <h2 className="h3" data-reveal>Print it. Fill it online. Keep it forever.</h2>
          {list(HOW)}
        </div>
      </div>
    </section>
  );
}
