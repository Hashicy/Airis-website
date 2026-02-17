'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function RecruitmentCTA() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 backdrop-blur-sm"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-white">
            Join the <span className="text-secondary">Collective</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            We are looking for passionate minds—developers, designers, and researchers—ready to 
            explore the depths of AI. Applications are currently open for the 2026 cohort.
          </p>
          
          <Link href="/recruitment">
            <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Apply Now <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
