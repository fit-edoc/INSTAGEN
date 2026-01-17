'use client'

import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber' // Added useFrame
import { OrbitControls, Float, useTexture, Environment, ContactShadows, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import Link from 'next/link'

// --- Component: Profile Card (Unchanged) ---
function ProfileCard({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
    const texture = useTexture('/neww.jpg')
    const { gl } = useThree()

    useEffect(() => {
        if (texture) {
            texture.anisotropy = gl.capabilities.getMaxAnisotropy()
            texture.colorSpace = THREE.SRGBColorSpace
            texture.needsUpdate = true
        }
    }, [texture, gl])

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
            <group position={position} rotation={rotation}>
                <RoundedBox args={[3, 3, 0.1]} radius={0.1} smoothness={4}>
                    <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.5} />
                </RoundedBox>
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[2.8, 2.8]} />
                    <meshStandardMaterial map={texture} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    )
}

// --- Component: Scene (UPDATED) ---
function Scene() {
    // 1. Create a reference for the group we want to rotate
    const groupRef = useRef<THREE.Group>(null)

    // 2. Animate the group every frame
    useFrame((state) => {
        if (!groupRef.current) return

        const t = state.clock.getElapsedTime()

        // SINE WAVE FORMULA:
        // Math.sin(t * speed) * amplitude
        // Speed: 0.5 (Lower is slower)
        // Amplitude: 0.3 (How far it turns in radians. 0.3 is approx 17 degrees)
        groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={1} />

            {/* Wrap cards in the animated group */}
            <group ref={groupRef}>
                <ProfileCard position={[-3.5, 0, 0]} rotation={[0, 0.3, 0]} />
                <ProfileCard position={[3.5, 0, 0]} rotation={[0, -0.3, 0]} />
            </group>

            <Environment preset="city" />
            <ContactShadows position={[0, -2.5, 0]} opacity={1} scale={20} blur={2} far={4.5} />
        </>
    )
}

// --- Main Page Component ---
export default function Hero3D() {
    return (
        <div className="relative w-full h-screen bg-neutral-950 flex flex-col items-center justify-center overflow-hidden">
            {/* ... Background and Text overlays unchanged ... */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(120,50,255,0.1),_transparent_70%)] pointer-events-none" />

            {/* Text Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none w-full px-4">
                <h1 className="text-6xl md:text-9xl font-light tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-yellow-200 to-black drop-shadow-2xl">
                    INSTAGEN
                </h1>
                <p className=" text-neutral-300 text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto">
                    Create Realistic Mockups & Pranks
                </p>
                <div className="mt-8 flex gap-3 justify-center">
                    <Link href={'/create-profile'}>
                        <button className="pointer-events-auto px-5 py-2 text-nowrap bg-gradient-to-br from-white via-yellow-100 to-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] md:px-8 md:py-3">
                            Create Profile
                        </button>
                    </Link>
                    <Link href={'/create-comment'}>
                        <button className="pointer-events-auto px-5 py-2 text-nowrap bg-gradient-to-br from-black to-black/10 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] md:px-8 md:py-3">
                            Create Comments
                        </button>
                    </Link>
                </div>
            </div>

            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 2]}>
                    <Suspense fallback={null}>
                        <Scene />
                        {/* REMOVED: autoRotate 
                           KEPT: enableZoom/Pan false so user can still manually drag if they want,
                           but the automatic movement is handled by the group now.
                        */}
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            minPolarAngle={Math.PI / 2.5}
                            maxPolarAngle={Math.PI / 1.5}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}