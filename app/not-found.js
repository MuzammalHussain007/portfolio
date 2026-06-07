import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
      <div className="text-center">
        <div className="font-display text-9xl font-bold text-white/5 mb-4">404</div>
        <h1 className="font-display text-4xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-white/40 font-body mb-8">The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-body font-medium text-sm hover:bg-white/90 transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
