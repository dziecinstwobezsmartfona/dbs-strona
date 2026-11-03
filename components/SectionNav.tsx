'use client';

type Props = {
  items: { id: string; label: string }[];
  className?: string;
};

const DURATION_MS = 1000;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const start = window.scrollY;
  const target = Math.max(0, el.getBoundingClientRect().top + start - offset);
  const distance = target - start;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || distance === 0) {
    window.scrollTo(0, target);
    return;
  }

  const startTime = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - startTime) / DURATION_MS, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function SectionNav({ items, className = '' }: Props) {
  return (
    <nav aria-label="Kategorie" className={className}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(item.id);
            history.replaceState(null, '', `#${item.id}`);
          }}
          className="bg-black/10 text-foreground rounded-3xl px-6 py-3 text-sm font-menu text-(--foreground) hover:bg-(--foreground) hover:text-(--background) transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
