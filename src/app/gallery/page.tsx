import { createClient } from '@/lib/supabase-server'

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('gallery_items')
    .select('*, profiles(full_name)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
        Visual <span className="text-primary">Chronicles</span>
      </h1>
      <p className="text-muted-foreground max-w-2xl mb-12">
        Moments, designs, and visualizations from our journey.
      </p>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {items?.map((item) => (
          <div key={item.id} className="break-inside-avoid group relative rounded-2xl overflow-hidden pointer-events-none md:pointer-events-auto">
            <img 
                src={item.image_url} 
                alt={item.title || 'Gallery Item'} 
                className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <h3 className="text-white font-bold">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.description}</p>
                <p className="text-white/60 text-xs mt-2">By {item.profiles?.full_name}</p>
            </div>
          </div>
        ))}
        
        {(!items || items.length === 0) && (
             <div className="text-center py-20 text-muted-foreground col-span-full">
                No gallery items yet.
            </div>
        )}
      </div>
    </div>
  )
}
