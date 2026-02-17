import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { ArrowUpRight } from 'lucide-react'

// Server Component
export async function LatestArticles() {
  const supabase = await createClient()
  
  const { data: articles } = await supabase
    .from('articles')
    .select('*, profiles(full_name, avatar_url)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!articles || articles.length === 0) return null

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
         <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">Latest Insights</h2>
                <p className="text-muted-foreground">Thoughts, research, and discoveries.</p>
            </div>
            <Link href="/articles" className="text-secondary hover:text-white transition-colors flex items-center gap-1">
                Read Blog <ArrowUpRight size={16} />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article: any) => (
                <Link href={`/articles/${article.slug}`} key={article.id} className="group block">
                    <article className="h-full flex flex-col justify-between border-l border-white/10 pl-6 py-2 hover:border-secondary transition-colors">
                        <div>
                            <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                                <span>{new Date(article.created_at).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{article.profiles?.full_name}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                                {article.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                {article.excerpt}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                            Read Article <ArrowUpRight size={14} />
                        </div>
                    </article>
                </Link>
            ))}
        </div>
      </div>
    </section>
  )
}
