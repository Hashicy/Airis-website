import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default async function ArticlesPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*, profiles(full_name, avatar_url)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
        Latest <span className="text-secondary">Research</span>
      </h1>
      <p className="text-muted-foreground max-w-2xl mb-12">
        Deep dives into algorithms, ethics, and the future of intelligence.
      </p>

      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {articles?.map((article: any) => (
          <Link href={`/articles/${article.slug}`} key={article.id} className="group block">
            <article className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/50 transition-colors">
                <div className="w-full md:w-64 aspect-video bg-muted rounded-lg overflow-hidden shrink-0">
                    {article.cover_image ? (
                         <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center text-muted-foreground">No Image</div>
                    )}
                </div>
                
                <div className="flex flex-col justify-between py-2 flex-grow">
                    <div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full">{article.tags?.[0] || 'AI'}</span>
                            <span>{new Date(article.created_at).toLocaleDateString()}</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-secondary transition-colors">{article.title}</h2>
                        <p className="text-muted-foreground line-clamp-2 md:line-clamp-3 mb-4">
                            {article.excerpt}
                        </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 md:mt-0">
                         <div className="flex items-center gap-2 text-sm text-white/70">
                             {article.profiles?.avatar_url && <img src={article.profiles.avatar_url} alt="" className="w-6 h-6 rounded-full" />}
                             <span>{article.profiles?.full_name}</span>
                         </div>
                         <div className="flex items-center gap-1 text-sm font-medium text-secondary group-hover:translate-x-1 transition-transform">
                             Read More <ArrowUpRight size={16} />
                         </div>
                    </div>
                </div>
            </article>
          </Link>
        ))}

        {(!articles || articles.length === 0) && (
            <div className="text-center py-20 text-muted-foreground">
                No articles published yet.
            </div>
        )}
      </div>
    </div>
  )
}
