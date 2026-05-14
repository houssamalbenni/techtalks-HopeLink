//back ground to be added in the future
function BackgroundLayers() {
  return (
    <>
      {/* Inline SVG background to match HopeLink branding */}
      <svg
        className="landing-bg-svg"
        aria-hidden="true"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.14" />
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="none" />
        <g transform="translate(200,60)">
          <ellipse cx="260" cy="300" rx="260" ry="220" fill="url(#g1)" />
          <ellipse cx="760" cy="520" rx="320" ry="260" fill="#8b5cf61a" />
        </g>
        <g transform="translate(420,80)" opacity="0.06">
          <text x="0" y="420" fontSize="480" fontWeight="700" fill="#ffffff">
            H
          </text>
        </g>
      </svg>

      <div className="grid-overlay" aria-hidden="true" />
    </>
  );
}

export default BackgroundLayers;
