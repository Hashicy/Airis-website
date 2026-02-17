'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { useAuth } from '@/context/auth-context'
import { cn } from '@/lib/utils'
import { Menu, X, User as UserIcon } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'People', href: '/people' },
  { name: 'Projects', href: '/projects' },
  { name: 'Articles', href: '/articles' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Recruitment', href: '/recruitment' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, profile } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'bg-background/60 backdrop-blur-md border-white/10 py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
          AIRIS<span className="text-primary text-4xl leading-[0px] relative top-1">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary relative group',
                pathname === link.href ? 'text-white' : 'text-muted-foreground'
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Auth / Mobile Toggle */}
        <div className="flex items-center gap-4">
          {user ? (
             <Link href="/profile" className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors">
               <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                 {profile?.avatar_url ? (
                   <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                 ) : (
                   <UserIcon size={14} className="text-primary" />
                 )}
               </div>
             </Link>
          ) : (
            <Link href="/login" className="hidden md:block text-sm font-medium text-muted-foreground hover:text-white transition-colors">
              Login
            </Link>
          )}

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-primary',
                  pathname === link.href ? 'text-white' : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
             {user ? (
               <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-white">Profile</Link>
             ) : (
               <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-white">Login</Link>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
