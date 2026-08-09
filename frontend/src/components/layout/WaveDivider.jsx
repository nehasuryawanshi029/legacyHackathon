export default function WaveDivider({ className = '', color = 'text-sand' }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className={`block h-10 w-full sm:h-14 ${color}`}
      >
        <path
          fill="currentColor"
          d="M0,32 C240,56 480,8 720,32 C960,56 1200,8 1440,32 L1440,56 L0,56 Z"
        />
        <path
          fill="currentColor"
          fillOpacity="0.45"
          d="M0,40 C360,56 720,16 1080,40 C1260,52 1380,48 1440,44 L1440,56 L0,56 Z"
        />
      </svg>
    </div>
  )
}
