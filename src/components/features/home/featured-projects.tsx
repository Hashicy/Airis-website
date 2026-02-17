import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { ArrowUpRight, Github } from 'lucide-react'

// This is a Server Component
export async function FeaturedProjects() {
  const supabase = await createClient()
  
  // Fetch featured projects (let's say 3 latest published ones)
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .eq('status', 'completed') // Suggesting we only show completed ones or highlight them
    .order('created_at', { ascending: false })
    .limit(3)

  if (!projects || projects.length === 0) {
    // Return empty or fallback if no data yet (for dev)
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
                <div className="text-muted-foreground">No projects published yet.</div>
            </div>
        </section>
    )
  }

  return (
    <section className="py-24 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Featured Projects</h2>
                <p className="text-muted-foreground">Innovation in action.</p>
            </div>
            <Link href="/projects" className="text-primary hover:text-white transition-colors flex items-center gap-1">
                View All <ArrowUpRight size={16} />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1">
              <div className="aspect-video bg-muted relative overflow-hidden">
                {project.image_url ? (
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5 text-muted-foreground">No Image</div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener" className="p-2 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors">
                            <ArrowUpRight size={20} />
                        </a>
                    )}
                    {project.github_url && (
                         <a href={project.github_url} target="_blank" rel="noopener" className="p-2 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                    )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags?.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
