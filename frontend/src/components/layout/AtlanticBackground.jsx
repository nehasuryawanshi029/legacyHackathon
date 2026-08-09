import WaveDivider from './WaveDivider'

export default function AtlanticBackground({ children }) {
  return (
    <div className="relative min-h-screen">
      <div className="atlantis-bg fixed inset-0 -z-10" aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  )
}

export { WaveDivider }
