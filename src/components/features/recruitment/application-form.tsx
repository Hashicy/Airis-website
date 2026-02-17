'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useAuth } from '@/context/auth-context'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export function ApplicationForm() {
  const { user } = useAuth()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    year: '',
    branch: '',
    skills: '',
    sop: '',
    portfolio_link: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    setStatus('idle')

    try {
      const { error } = await supabase.from('applications').insert({
        user_id: user.id,
        full_name: formData.full_name,
        email: formData.email,
        year: formData.year,
        branch: formData.branch,
        skills: formData.skills.split(',').map(s => s.trim()),
        sop: formData.sop,
        portfolio_link: formData.portfolio_link
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

  if (!user) {
      return (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Please Login to Apply</h3>
              <p className="text-muted-foreground mb-6">You need to have an account to submit an application.</p>
              <a href="/login" className="px-6 py-2 bg-primary text-white rounded-full">Login</a>
          </div>
      )
  }

  if (status === 'success') {
      return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-green-500/10 rounded-2xl border border-green-500/20"
          >
              <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
              <h3 className="text-3xl font-bold mb-2 text-white">Application Received</h3>
              <p className="text-muted-foreground">We have received your application. We will review it and get back to you soon.</p>
          </motion.div>
      )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Full Name</label>
            <input 
                required
                type="text" 
                value={formData.full_name}
                onChange={e => setFormData({...formData, full_name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
            <input 
                required
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
            />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Year</label>
            <select 
                required
                value={formData.year}
                onChange={e => setFormData({...formData, year: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors [&>option]:bg-black"
            >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
            </select>
        </div>
         <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Branch</label>
            <input 
                required
                type="text" 
                value={formData.branch}
                onChange={e => setFormData({...formData, branch: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
                placeholder="e.g. CSE, IT, ECE"
            />
        </div>
      </div>

      <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Skills (comma separated)</label>
            <input 
                type="text" 
                value={formData.skills}
                onChange={e => setFormData({...formData, skills: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
                placeholder="Python, React, Machine Learning..."
            />
      </div>

       <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Portfolio / GitHub Link</label>
            <input 
                type="url" 
                value={formData.portfolio_link}
                onChange={e => setFormData({...formData, portfolio_link: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
            />
      </div>

      <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Statement of Purpose</label>
            <textarea 
                required
                rows={5}
                value={formData.sop}
                onChange={e => setFormData({...formData, sop: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-primary outline-none transition-colors"
                placeholder="Why do you want to join AIRIS? What can you contribute?"
            />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : 'Submit Application'}
      </button>

      {status === 'error' && (
          <div className="flex items-center gap-2 text-red-500 mt-4 justify-center">
              <AlertCircle size={20} />
              <span>Something went wrong. Please try again.</span>
          </div>
      )}
    </form>
  )
}
