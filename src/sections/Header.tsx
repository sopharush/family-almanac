import { useEffect, useState } from 'react';
import Sprig from '../components/Sprig';
import Magnetic from '../components/Magnetic';
import { scrollToHash } from '../lib/smooth';

export default function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`hdr ${solid ? 'is-solid' : ''}`}>
      <a className="hdr__brand" href="#top" onClick={(e) => { e.preventDefault(); scrollToHash('#top'); }}>
        <Sprig className="hdr__sprig" />
        <span>The Family Almanac</span>
      </a>
      <Magnetic strength={0.3}>
        <a className="btn btn--primary btn--sm" href="#get" onClick={(e) => { e.preventDefault(); scrollToHash('#get'); }}>
          Get it free
        </a>
      </Magnetic>
    </header>
  );
}
