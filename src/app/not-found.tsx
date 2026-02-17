import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10">404</h1>
      <h2 className="text-2xl font-bold mb-4">Signal Lost</h2>
      <p className="text-muted-foreground mb-8">The requested node could not be found in the neural network.</p>
      <Link href="/" className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-colors">
        Return to Source
      </Link>
    </div>
  )
}
