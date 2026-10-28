import { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import PagePreview from '../components/PagePreview';
import { gsap, ScrollTrigger, MOTION_OFF } from '../lib/motion';
import { useReveal } from '../hooks/useReveal';
import { scrollToHash } from '../lib/smooth';

const PANELS = [
  { page: 'profile1', title: 'Family Profiles', body: 'A page for every child: allergies and what to do, medications, doctors, sizes, routines and comfort items.', chips: ['Allergies', 'Doctors', 'Sizes'] },
  { page: 'weekreset', title: 'The Weekly Reset', body: 'A 15-minute daily reset and one gentle focus for each day, so the week never piles up.', chips: ['Daily reset', 'Day-by-day focus'] },
  { page: 'meals', title: 'Meals & Pantry', body: 'Plan the week once. A go-to rotation, pantry staples and a grocery list that writes itself.', chips: ['Meal planner', 'Grocery list'] },
  { page: 'chores', title: 'Chores & Teamwork', body: 'A weekly chore chart and chore ideas by age — everyone in the house has a part.', chips: ['Chore chart', 'Ideas by age'] },
  { page: 'childcare', title: 'For Sitters', body: 'Hand this section to anyone caring for the kids: house rules, medicine, bedtime and who to call.', chips: ['Bedtime', 'Medicine', 'Pickup'] },
  { page: 'emergency', title: 'Emergency & Health', body: 'The pages you hope you never need — first calls, poison control, preferred ER, providers.', chips: ['First calls', 'Providers'] },
  { page: 'finances', title: 'Money & Member IDs', body: 'Bills, budget and savings — plus every museum, zoo and gym member ID, ready at the door.', chips: ['Bills', 'Member IDs'] },
  { page: 'wellness', title: 'Wellness & Self-Care', body: 'A few pages for the one who holds it all together: habits, rest rituals, and room to breathe.', chips: ['Habit tracker', 'Rest'] },
];

/** Desktop: pinned horizontal scroll through the book. Mobile / motion off: swipeable snap carousel. */
export default function Inside() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useLayoutEffect(() => {
    if (MOTION_OFF || !ref.current) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const section = ref.current!;
      const track = section.querySelector<HTMLElement>('.inside__track')!;
      section.classList.add('is-pinned');
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: section, start: 'top top', end: () => `+=${distance()}`,
          pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
        },
      });
      // pages settle as each panel slides into view
      gsap.utils.toArray<HTMLElement>('.panel .page', section).forEach((page) => {
        gsap.fromTo(page, { rotate: 4, scale: 0.94 }, {
          rotate: -1.5, scale: 1, ease: 'none',
          scrollTrigger: { trigger: page, containerAnimation: tween, start: 'left right', end: 'center center', scrub: true },
        });
      });
      return () => { section.classList.remove('is-pinned'); };
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { clearTimeout(t); mm.revert(); };
  }, []);

  return (
    <section ref={ref} className="inside tex-light" aria-labelledby="inside-title">
      <div className="inside__head wrap">
        <p className="kicker" data-reveal>What’s inside</p>
        <h2 id="inside-title" className="h2" data-mask>
          <span className="mask-line"><span className="mask-inner">A home for every</span></span>
          <span className="mask-line"><span className="mask-inner"><em>little decision.</em></span></span>
        </h2>
        <p className="inside__hint" data-reveal>30+ sections · write in only what you need <span className="inside__swipe">· swipe →</span></p>
      </div>
      <div className="inside__viewport">
        <ol className="inside__track">
          {PANELS.map((p, i) => (
            <li key={p.page} className="panel">
              <div className="panel__copy">
                <span className="panel__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <ul className="chips">{p.chips.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
              <PagePreview name={p.page} alt={`${p.title} page from The Family Almanac`} />
            </li>
          ))}
          <li className="panel panel--cta">
            <div className="panel__copy">
              <span className="panel__num">+20</span>
              <h3>…and more</h3>
              <p>Home info, maintenance, declutter, kitchen, calendar, education, faith, garden, holidays, vehicles, pets and the signature <em>Ask the Book</em> page.</p>
              <a className="btn btn--primary" href="#get" onClick={(e) => { e.preventDefault(); scrollToHash('#get'); }}>
                Get the whole book free <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
