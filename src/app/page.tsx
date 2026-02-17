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
      
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 py-16">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 drop-shadow-lg">
            AWAKENING
            <br />
            <span className="text-primary">INTELLIGENCE</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mx-auto max-w-3xl mb-8 leading-relaxed backdrop-blur-sm bg-black/8 p-5 rounded-2xl border border-white/5">
            The Artificial Intelligence Research and Innovation Society — where researchers, builders, and creators converge to explore the future of intelligent systems.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <button className="px-6 md:px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all text-foreground dark:text-white font-semibold hover:scale-105 active:scale-95">
              Explore Projects
            </button>
            <button className="px-6 md:px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-105 transition-all">
              Join Us
            </button>
          </div>

          {/* Quick links cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <a href="/projects" className="p-4 rounded-2xl bg-white/4 border border-white/6 hover:border-primary/50 transition-colors">
              <h4 className="font-semibold mb-1">Projects</h4>
              <p className="text-sm text-muted-foreground">Browse short, medium, and long projects built by members.</p>
            </a>
            <a href="/people" className="p-4 rounded-2xl bg-white/4 border border-white/6 hover:border-primary/50 transition-colors">
              <h4 className="font-semibold mb-1">People</h4>
              <p className="text-sm text-muted-foreground">Meet the team — researchers, engineers, and advisors.</p>
            </a>
            <a href="/articles" className="p-4 rounded-2xl bg-white/4 border border-white/6 hover:border-primary/50 transition-colors">
              <h4 className="font-semibold mb-1">Resources</h4>
              <p className="text-sm text-muted-foreground">Learning paths, templates, and AI/ML guides.</p>
            </a>
          </div>
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
