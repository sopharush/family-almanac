import { useCallback, useEffect, useState } from 'react';
import { ReadyContext } from './lib/ReadyContext';
import { MOTION_OFF, ScrollTrigger } from './lib/motion';
import { startSmoothScroll } from './lib/smooth';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Marquee from './components/Marquee';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import HowItWorks from './sections/HowItWorks';
import Inside from './sections/Inside';
import AskTheBook from './sections/AskTheBook';
import WhoFor from './sections/WhoFor';
import Offer from './sections/Offer';
import Faq from './sections/Faq';
import Footer from './sections/Footer';

export default function App() {
  const [ready, setReady] = useState(MOTION_OFF);
  const onPreloaded = useCallback(() => setReady(true), []);

  useEffect(() => startSmoothScroll(), []);

  // Re-measure pins once fonts and images have settled
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <ReadyContext.Provider value={ready}>
      <Preloader onDone={onPreloaded} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <HowItWorks />
        <Inside />
        <AskTheBook />
        <WhoFor />
        <Offer />
        <Faq />
      </main>
      <Footer />
    </ReadyContext.Provider>
  );
}
