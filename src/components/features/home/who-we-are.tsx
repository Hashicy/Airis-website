'use client'

import { motion } from 'framer-motion'
import { Brain, Cpu, Globe, Users } from 'lucide-react'

const features = [
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: 'Research',
    description: 'Pushing the boundaries of Machine Learning, NLP, and Computer Vision through rigorous experimentation.'
  },
  {
    icon: <Cpu className="w-8 h-8 text-secondary" />,
    title: 'Development',
    description: 'Building tangible AI solutions and applications that solve real-world problems.'
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Community',
    description: 'Fostering a collaborative environment for students, researchers, and industry experts.'
  },
  {
    icon: <Globe className="w-8 h-8 text-secondary" />,
    title: 'Impact',
    description: 'Creating ethical AI systems that contribute positively to society and technological advancement.'
  }
]

export function WhoWeAre() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-3xl mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
            We are the <span className="text-primary">Architects</span> of the Future.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AIRIS is more than a student society; it is a consciousness incubator. 
            We bridge the gap between theoretical artificial intelligence and practical application, 
            empowering the next generation of innovators to shape the digital frontier.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group"
            >
              <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  )
}
