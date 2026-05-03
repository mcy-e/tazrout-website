'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { 
  Cpu, 
  Radio, 
  Server, 
  MonitorSmartphone,
  BrainCircuit,
  ArrowRight
} from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'

export default function ArchitectureDiagram() {
  const t = useTranslation()

  const NODES = [
    {
      id: 'layer1',
      title: t.Architecture.hardware_title,
      subtitle: t.Architecture.hardware_desc,
      icon: <Cpu size={24} />,
      color: 'text-brand-primary',
      bg: 'bg-brand-primary/10',
      border: 'border-brand-primary/30',
    },
    {
      id: 'layer2',
      title: t.Architecture.gateway_title,
      subtitle: t.Architecture.gateway_desc,
      icon: <Radio size={24} />,
      color: 'text-[var(--color-info)]',
      bg: 'bg-[var(--color-info)]/10',
      border: 'border-[var(--color-info)]/30',
    },
    {
      id: 'layer3',
      title: t.Architecture.broker_title,
      subtitle: t.Architecture.broker_desc,
      icon: <Server size={24} />,
      color: 'text-[var(--color-warning)]',
      bg: 'bg-[var(--color-warning)]/10',
      border: 'border-[var(--color-warning)]/30',
    },
    {
      id: 'layer4',
      title: t.Architecture.backend_title,
      subtitle: t.Architecture.backend_desc,
      icon: <BrainCircuit size={24} />,
      color: 'text-brand-primary',
      bg: 'bg-brand-primary/10',
      border: 'border-brand-primary/30',
    },
    {
      id: 'layer5',
      title: t.Architecture.frontend_title,
      subtitle: t.Architecture.frontend_desc,
      icon: <MonitorSmartphone size={24} />,
      color: 'text-[var(--color-foreground)]',
      bg: 'bg-[var(--color-surface-active)]',
      border: 'border-[var(--color-border)]',
    },
  ]

  return (
    <section className="py-20 sm:py-32">
      <div className="section-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <motion.h2 
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl"
          >
            {t.Architecture.title}
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="mt-4 text-lg text-[var(--color-muted)]"
          >
            {t.Architecture.description}
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="relative mx-auto max-w-5xl"
        >
          <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-2 px-4 sm:px-0">
            {NODES.map((node, i) => (
              <div key={node.id} className="flex flex-col items-center lg:flex-row w-full lg:w-auto max-w-sm lg:max-w-none">
                {/* Node Card */}
                <motion.div 
                  variants={fadeUp}
                  className="relative z-10 flex w-full lg:w-48 flex-col items-center justify-center rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 text-center shadow-[var(--shadow-card)] hover:border-brand-primary/50 transition-colors"
                >
                  <div className={`mb-4 flex h-14 w-14 sm:h-12 sm:w-12 items-center justify-center rounded-xl border ${node.bg} ${node.color} ${node.border}`}>
                    {node.icon}
                  </div>
                  <h3 className="font-heading text-base sm:text-sm font-bold text-[var(--color-foreground)]">
                    {node.title}
                  </h3>
                  <p className="mt-2 sm:mt-1 text-sm sm:text-xs text-[var(--color-muted)] leading-relaxed">
                    {node.subtitle}
                  </p>
                </motion.div>

                {/* Connector Arrow (Hidden on last node) */}
                {i < NODES.length - 1 && (
                  <motion.div 
                    variants={fadeUp}
                    className="flex h-12 w-12 items-center justify-center text-[var(--color-subtle)] lg:h-auto lg:w-16"
                  >
                    <ArrowRight className="rotate-90 lg:rotate-0 rtl:-scale-x-100" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
