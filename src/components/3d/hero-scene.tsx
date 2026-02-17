'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Line, OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useMouse } from '@/hooks/use-mouse' // I need to create this hook or use local state

function NeuralNetwork({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        // Spread points in a sphere-like or cloud distribution
      const r = 4 * Math.cbrt(Math.random())
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      p[i * 3] = x
      p[i * 3 + 1] = y
      p[i * 3 + 2] = z
    }
    return p
  }, [count])

  // Connection lines
  const lines = useMemo(() => {
      // Create lines between close points
      const l: THREE.Vector3[] = []
      const threshold = 1.5
      const pointVecs: THREE.Vector3[] = []

      for(let i=0; i<count; i++) {
          pointVecs.push(new THREE.Vector3(points[i*3], points[i*3+1], points[i*3+2]))
      }

      for(let i=0; i<count; i++) {
          for(let j=i+1; j<count; j++) {
              if(pointVecs[i].distanceTo(pointVecs[j]) < threshold) {
                  l.push(pointVecs[i])
                  l.push(pointVecs[j])
              }
          }
      }
      return l
  }, [points, count])


  const ref = useRef<THREE.Points>(null)

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a95ca2"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      {/* Lines are static relative to points group, so they need to rotate with them or be re-calculated. 
          For performance, let's put them in the same group. 
          However, Lines from drei take points as prop. 
          To make them rotate together, we wrap them in the same animated group or apply ref to group.
      */}
      <group ref={ref as any}> {/* Reuse ref rotation or separate? Let's use a parent group for rotation */}
         {/* Actually ref is on Points, so Points rotate. Lines need to rotate too. */}
      </group>
    </group>
  )
}

function SceneContent() {
    const groupRef = useRef<THREE.Group>(null)
    
    useFrame((state, delta) => {
        if(groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05
        }
    })

    return (
        <group ref={groupRef}>
            <NeuralNetwork count={150} />
            {/* We can add a specialized Line implementation for connections if needed, 
                but for simplicity and performance in "smoothness" mode, maybe just particles 
                floating is better, or utilize `Drei`'s `Line` with segment segments.
            */}
             <Connections />
        </group>
    )
}

function Connections() {
    // A separate static connection set for the demo, heavily simplified
    // In a real "Neural Network", lines should connect nodes.
    // For visual flair without heavy computation per frame:
    // We generated points in NeuralNetwork. We need to access them or regenerate same seed.
    // Let's keep it simple: Just particles for now as requested "Performance First".
    // "floating 3D neural network made of glowing nodes and connecting lines"
    // I will use a simple LineSegments approach.
    
    const count = 50
    const points = useMemo(() => {
        const p: THREE.Vector3[] = []
        for(let i=0; i<count; i++) {
             const r = 3 // radius
             const theta = Math.random() * 2 * Math.PI
             const phi = Math.acos(2 * Math.random() - 1)
             p.push(new THREE.Vector3(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
             ))
        }
        return p
    }, [])
    
    const lines = useMemo(() => {
        const l: THREE.Vector3[] = []
         for(let i=0; i<count; i++) {
             // Connect to nearest neighbor or random
             const nearest = points.filter(pt => pt !== points[i]).sort((a,b) => a.distanceTo(points[i]) - b.distanceTo(points[i]))[0]
             if(nearest) {
                 l.push(points[i])
                 l.push(nearest)
             }
         }
         return l
    }, [points])

    return (
        <>
            <Points positions={new Float32Array(points.flatMap(v => [v.x, v.y, v.z]))} stride={3}>
                <PointMaterial color="#a95ca2" size={0.1} transparent opacity={0.8} sizeAttenuation depthWrite={false} />
            </Points>
            <Line points={lines} color="#a95ca2" opacity={0.2} transparent lineWidth={1} />
        </>
    )

}

export function HeroScene() {
  return (
    <div className="w-full h-screen absolute top-0 left-0 -z-10 bg-background">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}> {/* dpr optimized */}
        <color attach="background" args={['#0a0a0f']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a95ca2" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
             <SceneContent />
        </Float>
        {/* Fog to blend into background */}
        <fog attach="fog" args={['#0a0a0f', 5, 20]} /> 
      </Canvas>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
