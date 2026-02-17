import { ApplicationForm } from '@/components/features/recruitment/application-form'

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
                Join the <span className="text-secondary">Collective</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
                We are looking for individuals who dare to dream and have the skills to build those dreams.
                Designers, developers, researchers — if you are obsessed with AI, you belong here.
            </p>
        </div>

        <ApplicationForm />
    </div>
  )
}
