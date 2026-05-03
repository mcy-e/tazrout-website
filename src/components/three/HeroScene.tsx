'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import Image from 'next/image'

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  
  // Generate random positions and phases
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 10 - 5
      const phase = Math.random() * Math.PI * 2
      const speed = 0.2 + Math.random() * 0.3
      temp.push({ x, y, z, phase, speed })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime

    particles.forEach((p, i) => {
      // Gentle floating motion
      const y = p.y + Math.sin(time * p.speed + p.phase) * 0.5
      const x = p.x + Math.cos(time * p.speed * 0.5 + p.phase) * 0.2
      
      dummy.position.set(x, y, p.z)
      
      // Slow rotation
      dummy.rotation.x = time * p.speed * 0.5
      dummy.rotation.y = time * p.speed * 0.3
      
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      {/* Octahedron represents geometric Amazigh patterns */}
      <octahedronGeometry args={[0.08, 0]} />
      <meshBasicMaterial 
        color="#4CAF50" 
        transparent 
        opacity={0.3} 
        wireframe
      />
    </instancedMesh>
  )
}

function DashboardMockup() {
  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.2} // XYZ rotation intensity
      floatIntensity={0.5} // Up/down float intensity
      position={[2, -0.5, -4]}
      rotation={[0, -0.3, 0]}
    >
      <Html
        transform
        occlude="blending"
        className="w-[800px] h-[500px] pointer-events-none select-none rounded-xl overflow-hidden border border-brand-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-brand-deep"
      >
        <Image 
          src="/assets/images/Home-Page-Image.svg" 
          alt="Tazrout System Overview" 
          fill
          className="object-cover opacity-40"
          unoptimized
        />
      </Html>
    </Float>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" dir="ltr">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        {/* Ambient light for subtle illumination */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4CAF50" />
        
        <Particles count={150} />
        <DashboardMockup />
        
        {/* Adds atmospheric fog blending into the background */}
        <fog attach="fog" args={['#141C16', 5, 15]} />
      </Canvas>
    </div>
  )
}
