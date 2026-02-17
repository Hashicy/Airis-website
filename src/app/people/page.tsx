import { createClient } from '@/lib/supabase-server'
import { ProfileCard } from '@/components/features/people/profile-card'
import { TabNavigation } from '@/components/features/people/tab-navigation' // Client component for tabs
import LOCAL_PROFILES from '@/lib/local-profiles'

async function getProfiles(role: string[]) {
    const supabase = await createClient()
    const { data } = await supabase
        .from('profiles')
        .select('*')
        .in('role', role)
        .eq('is_approved', true)
        .order('full_name') // or random
    
    return data || []
}

export default async function PeoplePage() {
    // We can fetch all and filter on client, or fetch by category.
    // Fetching all for now since typically < 100 members.
    const supabase = await createClient()
    const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_approved', true)

    // Use DB profiles when available; otherwise fall back to local seed for development/demo.
    const shownProfiles = (profiles && profiles.length > 0) ? profiles : LOCAL_PROFILES

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
                Meet the <span className="text-primary">Minds</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-12">
                The innovators, researchers, and creators behind every line of code and every breakthrough.
            </p>

            <TabNavigation profiles={shownProfiles} />
        </div>
    )
}
