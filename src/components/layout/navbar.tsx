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
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'bg-background/80 dark:bg-background/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-6">
  {/* Logo */}
  <Link href="/" className="flex items-center gap-3 text-2xl md:text-3xl font-bold tracking-tighter text-foreground dark:text-white">
          <span className="sr-only">AIRIS Home</span>
          <div className="flex items-end gap-1">
            <span className="leading-none">AIRIS</span>
            <span className="text-primary text-3xl md:text-4xl leading-[0px] relative top-0">.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium px-3 py-2 rounded-md transition-colors inline-flex items-center relative',
                  pathname === link.href ? 'text-foreground dark:text-white bg-white/5 dark:bg-white/5' : 'text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-white/5'
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Auth / CTA / Mobile Toggle */}
        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/profile" className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground dark:text-white hover:text-white transition-colors">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <UserIcon size={16} className="text-primary" />
                )}
              </div>
            </Link>
          ) : (
            <Link href="/login" className="hidden md:block text-sm font-medium text-foreground dark:text-white hover:text-white transition-colors">
              Login
            </Link>
          )}

          <Link href="/recruitment" className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold shadow-md hover:brightness-105 transition-all">
            Join
          </Link>

          <button
            aria-label="Toggle menu"
            className="md:hidden text-foreground dark:text-white p-2 rounded-md hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute top-full left-0 right-0 bg-background/95 dark:bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-lg font-medium transition-colors px-3 py-2 rounded-md',
                  pathname === link.href ? 'text-foreground dark:text-white bg-white/5 dark:bg-white/5' : 'text-muted-foreground hover:text-foreground dark:hover:text-white hover:bg-white/5'
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
            <Link href="/recruitment" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-primary">Join</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
