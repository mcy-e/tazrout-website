'use client'

import React, { useRef, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Html, Grid, OrbitControls, Center } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/useTranslation'

// --- MODELS (original colors, no override) ---

function FullArchitecture(props: any) {
  const { scene } = useGLTF('/assets/3d/full_architecture.glb')
  return <primitive object={scene} {...props} />
}

function SensorNodeModel(props: any) {
  const { scene } = useGLTF('/assets/3d/sensor_node.glb')
  return <primitive object={scene} {...props} />
}

function WaterTankModel(props: any) {
  const { scene } = useGLTF('/assets/3d/water_tank.glb')
  return <primitive object={scene} {...props} />
}

function WarehouseShellModel(props: any) {
  const { scene } = useGLTF('/assets/3d/warehouse_shell.glb')
  return <primitive object={scene} {...props} />
}

function ServerRackModel(props: any) {
  const { scene } = useGLTF('/assets/3d/server_rack.glb')
  return <primitive object={scene} {...props} />
}

function TouchscreenModel(props: any) {
  const { scene } = useGLTF('/assets/3d/wall_touchscreen.glb')
  return <primitive object={scene} {...props} />
}

function AntennaModel(props: any) {
  const { scene } = useGLTF('/assets/3d/gateway_antenna.glb')
  return <primitive object={scene} {...props} />
}

// --- MODEL SELECTOR ---
function ModelByIndex({ index }: { index: number }) {
  switch (index) {
    case 0: return <FullArchitecture scale={1.2} />
    case 1: return <SensorNodeModel scale={3} />
    case 2: return <WaterTankModel scale={2.5} />
    case 3: return <WarehouseShellModel scale={2.5} />
    case 4: return <ServerRackModel scale={3} />
    case 5: return <TouchscreenModel scale={3.5} />
    case 6: return <AntennaModel scale={3} />
    default: return null
  }
}

// --- LAZY 3D VIEWER (only mounts Canvas when section is visible) ---
function LazyModelViewer({ modelIndex }: { modelIndex: number }) {
  const t = useTranslation().System
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.1, once: false })
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    if (isInView) setHasBeenVisible(true)
  }, [isInView])

  return (
    <div ref={containerRef} className="w-full h-full">
      {hasBeenVisible ? (
        <Canvas
          camera={{ position: [0, 3, 8], fov: 40 }}
          dpr={1}
          frameloop={isInView ? 'always' : 'never'}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={
            <Html center>
              <div className="text-brand-primary text-lg font-mono animate-pulse">{t.loading}</div>
            </Html>
          }>
            <ambientLight intensity={3.5} />
            <directionalLight position={[8, 12, 8]} intensity={4.5} />
            <directionalLight position={[-5, 8, -5]} intensity={1.5} color="#b8e0c8" />

            <Grid
              args={[30, 30]}
              position={[0, -3, 0]}
              cellSize={1}
              cellThickness={0.3}
              cellColor="#1a3a2a"
              sectionSize={5}
              sectionThickness={0.6}
              sectionColor="#2d6040"
              fadeDistance={20}
              fadeStrength={2}
              infiniteGrid={false}
            />

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={4}
              maxDistance={16}
              autoRotate
              autoRotateSpeed={1.2}
              maxPolarAngle={Math.PI / 2}
            />

            <Center>
              <ModelByIndex index={modelIndex} />
            </Center>
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-brand-primary/30 text-sm font-mono">{t.scroll_to_load}</div>
        </div>
      )}
    </div>
  )
}

// --- MAIN COMPONENT ---
export default function InteractiveArchitecture() {
  const t = useTranslation().System
  
  // Reconstruct STOPS based on translation keys
  const stops = Object.keys(t.stops).map((key, i) => {
    const stopData = t.stops[key as keyof typeof t.stops]
    return {
      ...stopData,
      side: i % 2 === 0 ? 'left' as const : 'right' as const
    }
  })

  return (
    <div className="relative">
      {stops.map((stop, i) => (
        <section key={i} className="relative w-full min-h-screen flex items-center py-12 sm:py-20">
          <div className={`w-full flex flex-col lg:flex-row items-center gap-8 px-6 lg:px-16 ${stop.side === 'left' ? '' : 'lg:flex-row-reverse'}`}>
            
            {/* Text Card */}
            <motion.div
              className="w-full lg:w-[38%] relative z-10"
              initial={{ opacity: 0, x: stop.side === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <span className="text-brand-primary/50 text-xs font-mono uppercase tracking-[0.2em] block mb-3">
                {stop.tag}
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[var(--color-foreground)] mb-4 leading-tight">
                {stop.title}
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed mb-6">
                {stop.desc}
              </p>
              <div className="flex items-center gap-2 text-brand-primary/30 text-xs font-mono">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                {t.controls}
              </div>
            </motion.div>

            {/* 3D Model Viewer (lazy-loaded) */}
            <motion.div
              className="w-full lg:w-[62%] h-[55vh] sm:h-[60vh] lg:h-[65vh] rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-elevated)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <LazyModelViewer modelIndex={i} />
            </motion.div>
          </div>

          {/* Vertical connector line */}
          {i < stops.length - 1 && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-brand-primary/20 to-transparent" />
          )}
        </section>
      ))}
    </div>
  )
}

// Preload only the first model eagerly, rest load on demand
useGLTF.preload('/assets/3d/full_architecture.glb')
