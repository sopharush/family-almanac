import Sprig from './Sprig';

const QUESTIONS = [
  'What’s for dinner?', 'When’s trash day?', 'What’s the Wi-Fi password?', 'Can they have Tylenol?',
  'Where’s the insurance card?', 'Who’s driving to practice?', 'What’s our museum member ID?',
  'What size shoes does she wear?', 'Who do I call if the sink floods?', 'When’s the dentist?',
];

/** Endless ribbon of the questions a mom hears all day. Pauses with motion off. */
export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {QUESTIONS.map((q) => (
        <li key={q}>
          <span>“{q}”</span>
          <Sprig className="marquee__sprig" />
        </li>
      ))}
    </ul>
  );
  return (
    <section className="marquee" aria-label="Questions the Almanac answers">
      <div className="marquee__track">{row(false)}{row(true)}</div>
      <p className="marquee__answer">The answer to all of them: <span className="script">look in the book.</span></p>
    </section>
  );
}
