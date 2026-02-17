'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, User } from 'lucide-react'
import type { Profile } from '@/types'

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
    >
      <div className="aspect-square bg-muted relative overflow-hidden">
        {profile.avatar_url ? (
          <img 
            src={profile.avatar_url} 
            alt={profile.full_name || 'Member'} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <User size={48} className="text-white/20" />
          </div>
        )}
        
        {/* Social Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
             {profile.social_links?.linkedin && (
                 <a href={profile.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors">
                     <Linkedin size={20} />
                 </a>
             )}
              {profile.social_links?.github && (
                 <a href={profile.social_links.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors">
                     <Github size={20} />
                 </a>
             )}
        </div>
      </div>

    <div className="p-4">
    {/* Use theme-aware colors so names are visible in light and dark themes */}
        <h3 className="text-lg font-bold text-foreground dark:text-white group-hover:text-primary transition-colors">{profile.full_name}</h3>
        {profile.position && (
          <div className="text-sm text-muted-foreground mb-1">{profile.position}</div>
        )}
        <p className="text-sm text-secondary font-medium mb-2 uppercase tracking-wider text-xs">
            {profile.role.replace('_', ' ')}
        </p>
    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
      {profile.bio || 'Building the future of AI.'}
    </p>

    <div className="flex flex-wrap gap-1">
       {profile.skills?.slice(0, 3).map(skill => (
         <span key={skill} className="text-[10px] uppercase px-2 py-1 rounded-sm bg-white/5 text-muted-foreground">
           {skill}
         </span>
       ))}
    </div>
    </div>
    </motion.div>
  )
}
