import { useId, useState, type FormEvent } from 'react';
import { ArrowRight, Download, Lock, MonitorSmartphone } from 'lucide-react';
import { useSignup } from '../hooks/useSignup';
import Magnetic from './Magnetic';

const valid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

/** Email gate. On success (or for a returning visitor) it becomes the download panel. */
export default function SignupForm({ tone = 'dark', heading = 'Get the Almanac — free' }: { tone?: 'dark' | 'light'; heading?: string }) {
  const { done, submit } = useSignup();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const id = useId();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!valid(v)) { setError('Please enter a valid email address.'); return; }
    setError('');
    setBusy(true);
    await submit(v);
    setBusy(false);
  };

  if (done) {
    return (
      <div className={`signup signup--${tone} signup--done`} role="status">
        <p className="signup__title">Your Almanac is ready.</p>
        <p className="signup__small">Thank you for joining. Print the PDF, or fill it in online — it saves as you type.</p>
        <div className="signup__actions">
          <Magnetic>
            <a className="btn btn--primary" href="/The-Family-Almanac.pdf" download>
              <Download size={16} aria-hidden="true" /> Download the PDF
            </a>
          </Magnetic>
          <a className="btn btn--ghost" href="/app" target="_blank" rel="noopener">
            <MonitorSmartphone size={16} aria-hidden="true" /> Use it online
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className={`signup signup--${tone}`} name="signup" method="POST" data-netlify="true" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="form-name" value="signup" />
      <p className="signup__title">{heading}</p>
      <p className="signup__small">Pop in your email and your copy is ready in seconds.</p>
      <div className="signup__row">
        <label htmlFor={id} className="sr-only">Your email</label>
        <input
          id={id} type="email" name="email" inputMode="email" autoComplete="email" placeholder="you@email.com"
          value={email} onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-err` : undefined}
        />
        <Magnetic strength={0.25}>
          <button className="btn btn--primary" type="submit" disabled={busy}>
            {busy ? 'Sending…' : <>Send me the Almanac <ArrowRight size={16} aria-hidden="true" /></>}
          </button>
        </Magnetic>
      </div>
      {error && <p id={`${id}-err`} className="signup__error">{error}</p>}
      <p className="signup__trust"><Lock size={13} aria-hidden="true" /> Free for early members · No spam, ever · Unsubscribe anytime</p>
    </form>
  );
}
