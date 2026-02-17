'use client'

import { useAuth } from '@/context/auth-context'
import { useRole } from '@/hooks/use-role'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { user, profile, startSignOut, isLoading } = useAuth() as any // Cast for now as I might have missed exporting startSignOut or signOut
  const { signOut } = useAuth()
  const { role, isSuperAdmin } = useRole()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
        router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return <div className="min-h-screen pt-32 text-center">Loading...</div>

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
              <h1 className="text-4xl font-bold mb-2">My Profile</h1>
              <p className="text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-4">
              {isSuperAdmin && (
                  <Link href="/admin" className="px-6 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full hover:bg-secondary/20 transition-colors">
                      Admin Dashboard
                  </Link>
              )}
              <button onClick={() => { signOut(); router.push('/') }} className="px-6 py-2 bg-white/5 text-white border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                  Logout
              </button>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Details</h2>
              <div className="space-y-4">
                  <div>
                      <label className="block text-sm text-muted-foreground mb-1">Full Name</label>
                      <div className="p-3 bg-black/20 rounded-lg">{profile?.full_name || user.user_metadata?.full_name}</div>
                  </div>
                   <div>
                      <label className="block text-sm text-muted-foreground mb-1">Role</label>
                      <div className="p-3 bg-black/20 rounded-lg capitalize">{role.replace('_', ' ')}</div>
                  </div>
                   <div>
                      <label className="block text-sm text-muted-foreground mb-1">Status</label>
                      <div className="p-3 bg-black/20 rounded-lg flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${profile?.is_approved ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          {profile?.is_approved ? 'Verified Member' : 'Pending Approval'}
                      </div>
                  </div>
              </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl font-bold mb-4">Contribute</h2>
              <p className="text-muted-foreground mb-8">
                  Submit your projects, articles, or gallery items to be featured on the AIRIS platform.
              </p>
              <Link href="/submit" className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors hover:scale-105 active:scale-95">
                  Submit Content
              </Link>
          </div>
      </div>
    </div>
  )
}
