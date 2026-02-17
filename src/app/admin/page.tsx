'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useAuth } from '@/context/auth-context'
import { useRole } from '@/hooks/use-role'
import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs' // Assuming we have these or need to make them (I'll make a local version if needed, but I'll assume I can just use simple state for now to be safe)
import { Check, X, Loader2 } from 'lucide-react'

// Simple Tab component to avoid complexity with missing UI lib
function TabButton({ active, onClick, children }: any) {
    return (
        <button 
            onClick={onClick} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
        >
            {children}
        </button>
    )
}

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const { isSuperAdmin, isLoading: roleLoading } = useRole()
  const router = useRouter()
  const supabase = createClient()

  const [applications, setApplications] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('applications')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !roleLoading) {
        if (!user || !isSuperAdmin) {
            router.push('/')
        } else {
            fetchData()
        }
    }
  }, [user, isSuperAdmin, authLoading, roleLoading, router])

  const fetchData = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('applications')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
      
      setApplications(data || [])
      setLoading(false)
  }

  const handleApprove = async (id: string, userId: string) => {
      // 1. Update application status
      await supabase.from('applications').update({ status: 'approved' }).eq('id', id)
      // 2. Update user profile to 'member' (or whatever logic)
      await supabase.from('profiles').update({ role: 'member', is_approved: true }).eq('id', userId)
      
      fetchData() // Refresh
  }

  const handleReject = async (id: string) => {
      await supabase.from('applications').update({ status: 'rejected' }).eq('id', id)
      fetchData()
  }

  if (authLoading || roleLoading || (isSuperAdmin && loading)) {
      return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>
  }

  if (!isSuperAdmin) return null

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex gap-4 mb-8">
          <TabButton active={activeTab === 'applications'} onClick={() => setActiveTab('applications')}>
              Applications ({applications.length})
          </TabButton>
          {/* Add more tabs for content moderation later */}
      </div>

      {activeTab === 'applications' && (
          <div className="grid grid-cols-1 gap-6">
              {applications.length === 0 && <p className="text-muted-foreground">No pending applications.</p>}
              
              {applications.map(app => (
                  <div key={app.id} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col md:flex-row justify-between gap-6">
                      <div>
                          <h3 className="text-xl font-bold">{app.full_name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{app.email} • {app.year} Year • {app.branch}</p>
                          
                          <div className="space-y-2 text-sm">
                              <p><span className="text-secondary">Skills:</span> {app.skills?.join(', ')}</p>
                              <p><span className="text-secondary">Portfolio:</span> <a href={app.portfolio_link} target="_blank" className="underline">{app.portfolio_link}</a></p>
                              <p className="bg-black/20 p-3 rounded-lg border border-white/5 mt-2">{app.sop}</p>
                          </div>
                      </div>
                      
                      <div className="flex md:flex-col gap-2 justify-start md:min-w-[120px]">
                          <button onClick={() => handleApprove(app.id, app.user_id)} className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg hover:bg-green-500/20">
                              <Check size={16} /> Approve
                          </button>
                          <button onClick={() => handleReject(app.id)} className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20">
                              <X size={16} /> Reject
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  )
}
