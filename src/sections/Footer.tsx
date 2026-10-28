import Sprig from '../components/Sprig';
import { scrollToHash } from '../lib/smooth';

export default function Footer() {
  return (
    <footer className="ftr tex-dark">
      <div className="wrap ftr__inner">
        <Sprig className="ftr__sprig" />
        <p className="ftr__script script">Look in the book.</p>
        <p className="ftr__brand">The Family Almanac</p>
        <a className="ftr__link" href="#get" onClick={(e) => { e.preventDefault(); scrollToHash('#get'); }}>Get your free copy ↑</a>
        <p className="ftr__fine">A home management guide for busy families · © {new Date().getFullYear()} The Family Almanac</p>
      </div>
    </footer>
  );
}
