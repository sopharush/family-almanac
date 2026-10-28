import { useCallback, useEffect, useState } from 'react';

const KEY = 'fa-signup';
const EVT = 'fa-signup-change';

const read = () => {
  try { return Boolean(localStorage.getItem(KEY)); } catch { return false; }
};

const encode = (data: Record<string, string>) => new URLSearchParams(data).toString();

/** Shared signup state: every form on the page unlocks together once any of them is submitted. */
export function useSignup() {
  const [done, setDone] = useState(read);

  useEffect(() => {
    const sync = () => setDone(read());
    window.addEventListener(EVT, sync);
    return () => window.removeEventListener(EVT, sync);
  }, []);

  const submit = useCallback(async (email: string) => {
    try { localStorage.setItem(KEY, JSON.stringify({ email, at: Date.now() })); } catch { /* private mode */ }
    window.dispatchEvent(new Event(EVT));
    // Netlify Forms capture. Never blocks the download — the visitor gets the Almanac either way.
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'signup', email, 'bot-field': '' }),
      });
    } catch { /* offline or local preview */ }
  }, []);

  return { done, submit };
}
