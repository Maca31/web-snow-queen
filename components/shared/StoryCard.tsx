interface StoryCardProps {
  chapter: string;       // e.g. "Capítulo I"
  title: string;         // e.g. "Kay y Gerda"
  body: string;          // Narrative text
  body2?: string;        // Optional second paragraph
  hint?: string;         // e.g. "👆 ¡Toca a Kay y Gerda!"
  variant?: 'dark' | 'light';
  className?: string;
}

export function StoryCard({
  chapter,
  title,
  body,
  body2,
  hint,
  variant = 'dark',
  className = '',
}: StoryCardProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`relative z-20 max-w-[calc(100vw-2.5rem)] rounded-3xl border px-5 py-5 sm:max-w-sm sm:px-7 sm:py-6 ${
        isDark
          ? 'border-sky-300/10 bg-slate-950/45 shadow-[0_0_80px_rgba(0,0,0,0.5)]'
          : 'border-white/70 bg-white/50 shadow-[0_20px_80px_rgba(0,0,0,0.12)]'
      } backdrop-blur-xl ${className}`}
    >
      <p
        className={`font-bold uppercase ${
          isDark ? 'text-amber-300/80' : 'text-sky-700/70'
        }`}
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(0.5rem, 1vw, 0.7rem)',
          letterSpacing: '0.3em',
        }}
      >
        {chapter}
      </p>

      <div
        className="my-3 h-px w-12"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(212,168,67,0.6), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(26,74,112,0.6), transparent)',
        }}
      />

      <h2
        className={`font-bold leading-tight ${
          isDark ? 'text-sky-50' : 'text-slate-800'
        }`}
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          letterSpacing: '0.04em',
          textShadow: isDark ? '0 2px 12px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {title}
      </h2>

      <p
        className={`mt-3 leading-relaxed ${
          isDark ? 'text-sky-100/90' : 'text-slate-600/90'
        }`}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
        }}
      >
        {body}
      </p>

      {body2 && (
        <p
          className={`mt-2 leading-relaxed ${
            isDark ? 'text-sky-100/90' : 'text-slate-600/90'
          }`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
          }}
        >
          {body2}
        </p>
      )}

      {hint && (
        <p
          className={`mt-4 text-xs tracking-wide ${
            isDark ? 'text-sky-200/45' : 'text-slate-400/70'
          }`}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
