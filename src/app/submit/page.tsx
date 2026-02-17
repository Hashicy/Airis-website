'use client'

import { useState } from 'react'
import { ProjectForm } from '@/components/features/submit/project-form'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SubmitPage() {
  const { user, isLoading } = useAuth()
  const [type, setType] = useState('project')

  if (isLoading) return <div className="min-h-screen pt-32">Loading...</div>
  
  if (!user) {
      return (
          <div className="min-h-screen pt-32 px-6 container mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Login Required</h1>
              <p className="text-muted-foreground mb-8">You must be logged in to submit content.</p>
              <Link href="/login" className="px-6 py-3 bg-primary text-white rounded-full">Login</Link>
          </div>
      )
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 tracking-tighter">Submit Content</h1>
      
      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
          <button 
            onClick={() => setType('project')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${type === 'project' ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
          >
              Project
          </button>
           <button 
            onClick={() => setType('article')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${type === 'article' ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
          >
              Article
          </button>
           <button 
            onClick={() => setType('gallery')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${type === 'gallery' ? 'bg-primary text-white' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
          >
              Gallery Item
          </button>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl">
          {type === 'project' && <ProjectForm />}
          {type === 'article' && <div className="text-muted-foreground text-center py-10">Article submission form placeholder.</div>}
          {type === 'gallery' && <div className="text-muted-foreground text-center py-10">Gallery submission form placeholder.</div>}
      </div>
    </div>
  )
}
