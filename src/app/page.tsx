import { HeroScene } from '@/components/3d/hero-scene'
import { WhoWeAre } from '@/components/features/home/who-we-are'
import { FeaturedProjects } from '@/components/features/home/featured-projects'
import { LatestArticles } from '@/components/features/home/latest-articles'
import { RecruitmentCTA } from '@/components/features/home/recruitment-cta'
import { Resources } from '@/components/features/home/resources'

export default function Home() {
  return (
    <div className="relative">
      <HeroScene />
      
      <section className="h-screen flex flex-col items-center justify-center relative z-10 px-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-6 drop-shadow-2xl">
          AWAKENING <br /> INTELLIGENCE
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-10 backdrop-blur-sm bg-black/10 p-4 rounded-xl border border-white/5">
          The Artificial Intelligence Research and Innovation Society. <br />
          Explored through code, consciousness, and community.
        </p>
        <div className="flex gap-4">
             <button className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white font-medium hover:scale-105 active:scale-95">
                 Explore Projects
             </button>
             <button className="px-8 py-3 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 hover:bg-primary/30 transition-all text-white font-medium hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(169,92,162,0.3)] hover:shadow-[0_0_40px_rgba(169,92,162,0.5)]">
                 Join Us
             </button>
        </div>
      </section>

      <WhoWeAre />
  <Resources />
      <FeaturedProjects />
      <LatestArticles />
      <RecruitmentCTA />
    </div>
  );
}
