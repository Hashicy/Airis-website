import Link from 'next/link'
import { ArrowUpRight, BookOpen, Code, Cpu, GitBranch, Users } from 'lucide-react'

export function Resources() {
  const items = [
    {
      title: 'Learning Paths',
      description: 'Curated roadmaps for web dev, AI/ML, cybersecurity, and more.',
      icon: <BookOpen className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Code Templates',
      description: 'Starter templates and boilerplates to kickstart your projects fast.',
      icon: <Code className="w-6 h-6 text-secondary" />,
    },
    {
      title: 'AI/ML Resources',
      description: 'Tutorials, datasets, and notebooks for machine learning enthusiasts.',
      icon: <Cpu className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Tech Blog',
      description: 'Articles written by members covering the latest in technology.',
      icon: <GitBranch className="w-6 h-6 text-secondary" />,
    },
    {
      title: 'Dev Tools',
      description: 'Our recommended tools, extensions, and software for development.',
      icon: <Code className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Community Links',
      description: 'Join our Discord, follow us on socials, and connect with peers.',
      icon: <Users className="w-6 h-6 text-secondary" />,
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-2">Level Up</h2>
            <p className="text-muted-foreground">Everything you need to grow as a developer, designer, or creator.</p>
          </div>
          <Link href="/resources" className="text-primary hover:text-white transition-colors flex items-center gap-1">
            Explore <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
              <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit">{it.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">Learning Paths</h4>
            <ul className="text-sm text-muted-foreground list-inside list-disc">
              <li>Web Development</li>
              <li>AI / Machine Learning</li>
              <li>Cybersecurity</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">Code Templates</h4>
            <p className="text-sm text-muted-foreground">React, Next.js, and ML starter templates you can fork and run.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">Community</h4>
            <p className="text-sm text-muted-foreground">Join our Discord, follow us on socials, or get mentorship from club members.</p>
            <div className="mt-3 flex gap-3">
              <a href="#" className="text-primary underline text-sm">Discord</a>
              <a href="#" className="text-primary underline text-sm">Twitter</a>
              <a href="#" className="text-primary underline text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
