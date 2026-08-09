export default function PageShell({ children, className = '' }) {
  return (
    <main className={`mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 ${className}`}>
      {children}
    </main>
  )
}
