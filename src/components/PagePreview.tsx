type Props = { name: string; alt: string; className?: string; eager?: boolean };

/**
 * A page of the Almanac in a fixed-ratio frame, cropped to its designed top —
 * the long blank write-in space below never shows. Responsive WebP sources.
 */
export default function PagePreview({ name, alt, className = '', eager }: Props) {
  return (
    <figure className={`page ${className}`}>
      <img
        src={`/previews/${name}-640.webp`}
        srcSet={`/previews/${name}-640.webp 640w, /previews/${name}-1100.webp 1100w`}
        sizes="(min-width: 900px) 420px, 80vw"
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        width={640}
        height={800}
      />
    </figure>
  );
}
