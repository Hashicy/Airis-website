'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProfileCard } from './profile-card'
import type { Profile } from '@/types'
import { cn } from '@/lib/utils'

const tabs = [
    { id: 'all', label: 'All Members' },
    { id: 'core_committee', label: 'Core Committee' },
    { id: 'member', label: 'Members' },
    { id: 'faculty', label: 'Faculty Advisors' },
]

export function TabNavigation({ profiles }: { profiles: Profile[] }) {
    const [activeTab, setActiveTab] = useState('all')

    const filteredProfiles = activeTab === 'all' 
        ? profiles 
        : profiles.filter(p => p.role === activeTab)

    return (
        <div>
            <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-full transition-all relative",
                            activeTab === tab.id ? "text-white" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="active-tab"
                                className="absolute inset-0 bg-white/10 rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>

            <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProfiles.map(profile => (
                        <ProfileCard key={profile.id} profile={profile} />
                    ))}
                </AnimatePresence>
            </motion.div>
            
            {filteredProfiles.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No profiles found in this category.
                </div>
            )}
        </div>
    )
}
