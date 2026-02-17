'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const { user, signInWithGoogle, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/') // Redirect to home or dashboard
    }
  }, [user, router])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-background z-0" />
      <div className="absolute w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 p-12 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl text-center max-w-md w-full mx-6">
        <h1 className="text-4xl font-bold mb-2 tracking-tighter">AIRIS</h1>
        <p className="text-muted-foreground mb-8">Login to the network.</p>

        <button
          onClick={signInWithGoogle}
          disabled={isLoading}
          className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
               <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335"/></svg>
               Continue with Google
            </>
          )}
        </button>
      </div>
    </div>
  )
}
