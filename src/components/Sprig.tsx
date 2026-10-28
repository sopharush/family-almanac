type Props = { className?: string; title?: string };

/** The Almanac's botanical mark. Stroke uses currentColor. */
export default function Sprig({ className, title }: Props) {
  return (
    <svg viewBox="0 0 60 80" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="sprig-path">
        <path d="M30 78 C30 58 29 40 30 6" />
        <path d="M30 60 C18 56 13 47 14 38 C24 40 30 48 30 58" />
        <path d="M30 60 C42 56 47 47 46 38 C36 40 30 48 30 58" />
        <path d="M30 44 C20 41 16 33 17 25 C26 27 30 34 30 43" />
        <path d="M30 44 C40 41 44 33 43 25 C34 27 30 34 30 43" />
        <path d="M30 30 C23 28 20 22 21 16 C27 18 30 23 30 30" />
        <path d="M30 30 C37 28 40 22 39 16 C33 18 30 23 30 30" />
      </g>
    </svg>
  );
}
