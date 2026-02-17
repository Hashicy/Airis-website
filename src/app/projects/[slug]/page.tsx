import { createClient } from '@/lib/supabase-server'
import LOCAL_PROJECTS from '@/lib/local-projects'
import type { Project } from '@/types'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import { notFound } from 'next/navigation'

type Props = { params: { slug: string } }

export default async function ProjectPage({ params }: Props) {
  const { slug } = params
  const supabase = await createClient()

  let project: Project | null = null

  try {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single()

    project = data || null
  } catch (e) {
    // ignore and fallback
    project = null
  }

  if (!project) {
    // fallback to local projects
    project = LOCAL_PROJECTS.find((p) => p.slug === slug) || null
  }

  if (!project) return notFound()

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-muted-foreground mb-6">{project.description}</p>

          {project.content ? (
            <div className="prose max-w-none text-muted-foreground">{project.content}</div>
          ) : (
            <div className="text-muted-foreground">No detailed content available yet.</div>
          )}

          <div className="mt-8 flex gap-4">
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-md">Demo <ArrowUpRight size={14} /></a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-md">Source <Github size={14} /></a>
            )}
          </div>
        </div>

        <aside className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="mb-4">
            <h4 className="font-semibold">Status</h4>
            <div className="text-sm text-muted-foreground">{project.status}</div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Tags</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags?.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Created</h4>
            <div className="text-sm text-muted-foreground">{new Date(project.created_at).toLocaleDateString()}</div>
          </div>
        </aside>
      </div>
    </div>
  )
}
