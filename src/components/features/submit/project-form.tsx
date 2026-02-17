'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useAuth } from '@/context/auth-context'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export function ProjectForm() {
  const { user, profile } = useAuth()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    tags: '',
    image_url: '',
    demo_url: '',
    github_url: '',
    contributors: '' // Comma separated emails maybe? stick to simple for now
  })

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value
      setFormData({
          ...formData,
          title,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !profile) return
    setLoading(true)
    setStatus('idle')

    try {
      const { error } = await supabase.from('projects').insert({
        title: formData.title,
        slug: formData.slug,
        description: formData.description || null,
        tags: formData.tags.split(',').map(s => s.trim()),
        image_url: formData.image_url || null,
        demo_url: formData.demo_url || null,
        github_url: formData.github_url || null,
        contributors: [profile.id], // Initial contributor is submitter
        is_published: false // Explicitly false
      })

      if (error) throw error
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'success') {
      return (
          <div className="text-center py-10 bg-green-500/10 rounded-xl border border-green-500/20">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Project Submitted</h3>
              <p className="text-muted-foreground">Your project is pending review.</p>
              <button onClick={() => setStatus('idle')} className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm">Submit Another</button>
          </div>
      )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Project Title</label>
            <input 
                required
                type="text" 
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Slug (URL)</label>
            <input 
                required
                type="text" 
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
            />
        </div>
      </div>

      <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Description</label>
            <textarea 
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
            />
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Image URL</label>
            <input 
                type="url" 
                value={formData.image_url}
                onChange={e => setFormData({...formData, image_url: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
                placeholder="https://..."
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Tags (comma separated)</label>
            <input 
                type="text" 
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
                placeholder="React, AI, Python"
            />
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Demo URL</label>
            <input 
                type="url" 
                value={formData.demo_url}
                onChange={e => setFormData({...formData, demo_url: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">GitHub URL</label>
            <input 
                type="url" 
                value={formData.github_url}
                onChange={e => setFormData({...formData, github_url: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
            />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : 'Submit Project for Review'}
      </button>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-500 mt-4 justify-center">
              <AlertCircle size={20} />
              <span>Something went wrong. check console.</span>
          </div>
      )}
    </form>
  )
}
