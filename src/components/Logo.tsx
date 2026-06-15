export function Logo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform hover:scale-110"
    >
      {/* Main circle background with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="text-cyan-400 dark:text-cyan-300" stopColor="currentColor" />
          <stop offset="100%" className="text-blue-500 dark:text-cyan-500" stopColor="currentColor" />
        </linearGradient>
      </defs>

      {/* Outer circle */}
      <circle cx="20" cy="20" r="19" className="fill-cyan-500/10 dark:fill-cyan-500/5" />
      
      {/* Inner gradient circle */}
      <circle cx="20" cy="20" r="16" fill="url(#logoGradient)" />

      {/* Stylized "A" shape - modern minimal */}
      <g transform="translate(12, 10)">
        {/* Top triangle point */}
        <path
          d="M 8 0 L 14 12 L 2 12 Z"
          className="fill-white dark:fill-slate-900"
        />
        {/* Horizontal bar */}
        <rect x="4" y="8" width="8" height="1.5" className="fill-white dark:fill-slate-900" />
      </g>

      {/* Decorative corner accent */}
      <circle cx="30" cy="12" r="2" className="fill-cyan-300 dark:fill-cyan-400" />
    </svg>
  );
}
