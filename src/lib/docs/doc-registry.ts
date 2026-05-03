export type DocEntry = {
  slug: string
  title: string
  description?: string
  /** Path relative to `content/technical-docs` */
  file: string
}

export const DOC_ENTRIES: DocEntry[] = [
  {
    slug: 'architecture',
    title: 'System Architecture',
    description: 'LAN-only layers, data flows, packet types, and responsibilities.',
    file: 'architecture/ARCHITECTURE.md',
  },
  {
    slug: 'mqtt-topics',
    title: 'MQTT Topics Reference',
    description: 'Topic naming, QoS, payloads, and the full topic summary table.',
    file: 'mqtt/MQTT_TOPICS.md',
  },
  {
    slug: 'mqtt-setup',
    title: 'MQTT Broker Setup',
    description: 'Mosquitto configuration notes for the Tazrout stack.',
    file: 'mqtt/TAZROUT_MQTT_SETUP.md',
  },
  {
    slug: 'deployment',
    title: 'Deployment Guide',
    description: 'Hardware deployment: server OS, Postgres, Mosquitto, backend, AI, Flutter.',
    file: 'DEPLOYMENT_GUIDE.md',
  },
  {
    slug: 'setup',
    title: 'Setup Guide',
    description: 'Project setup and environment configuration.',
    file: 'SETUP_GUIDE.md',
  },
  {
    slug: 'frontend-architecture',
    title: 'Flutter Frontend Architecture',
    description: 'WebSocket, Riverpod, routing, and module layout.',
    file: 'frontend/FRONTEND_ARCHITECTURE.md',
  },
  {
    slug: 'design-system',
    title: 'Frontend Design System',
    description: 'UI tokens, components, and visual guidelines.',
    file: 'frontend/FRONTEND_DESIGN_SYSTEM.md',
  },
  {
    slug: 'ai-model',
    title: 'AI Model Technical Report',
    description: 'Dataset, ML pipeline, and prediction API.',
    file: 'ai-model/TazroutSystem_TechnicalReport.md',
  },
  {
    slug: 'hardware-test',
    title: 'Hardware Test Guide',
    description: 'Field hardware verification procedures.',
    file: 'hardware/TAZROUT_HardwareTestGuide.md',
  },
  {
    slug: 'hardware-simulation',
    title: 'Hardware Simulation Guide',
    description: 'Simulating nodes and gateway without full hardware.',
    file: 'hardware/TAZROUT_SimulationGuide.md',
  },
  {
    slug: 'backend-brief',
    title: 'Backend Developer Brief',
    description: 'Spring Boot, MQTT bridge, and persistence overview.',
    file: 'extra/BACKEND_DEVELOPER_BRIEF.md',
  },
  {
    slug: 'testing-hardware',
    title: 'Testing (Full Hardware)',
    description: 'End-to-end tests with real devices.',
    file: 'extra/testing_guide_full_hardware.md',
  },
  {
    slug: 'testing-no-hardware',
    title: 'Testing (No Hardware)',
    description: 'Simulator and software-only validation.',
    file: 'extra/testing_guide_no_hardware.md',
  },
]

const bySlug = Object.fromEntries(DOC_ENTRIES.map((e) => [e.slug, e])) as Record<string, DocEntry>

export function getDocEntry(slug: string): DocEntry | undefined {
  return bySlug[slug]
}

export function getAllDocSlugs(): string[] {
  return DOC_ENTRIES.map((e) => e.slug)
}
