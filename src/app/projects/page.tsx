import { createClient } from '@/lib/supabase-server'
import { ArrowUpRight, Github } from 'lucide-react'
import Link from 'next/link'

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*, profiles(full_name)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
        Our <span className="text-primary">Innovations</span>
      </h1>
      <p className="text-muted-foreground max-w-2xl mb-12">
        From theoretical research to deployed applications. Explore the projects built by AIRIS members.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project) => (
          <div key={project.id} className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 flex flex-col h-full">
            <div className="aspect-video bg-muted relative overflow-hidden shrink-0">
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
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors">
                          <ArrowUpRight size={20} />
                      </a>
                  )}
                  {project.github_url && (
                       <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors">
                          <Github size={20} />
                      </a>
                  )}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                 <span className={`text-[10px] uppercase px-2 py-1 rounded-sm border ${project.status === 'completed' ? 'border-green-500/50 text-green-500' : 'border-yellow-500/50 text-yellow-500'}`}>
                     {project.status}
                 </span>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags?.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                          {tag}
                      </span>
                  ))}
              </div>
            </div>
          </div>
        ))}

        {(!projects || projects.length === 0) && (
            <div className="col-span-full text-center py-20 text-muted-foreground">
                No projects found.
            </div>
        )}
      </div>
    </div>
  )
}
