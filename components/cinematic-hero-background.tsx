'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';

interface CinematicHeroBackgroundProps {
  selectedEnvironment?: 'lobby' | 'city' | 'dawn';
  animationTimeline?: gsap.core.Timeline;
}

function Scene({ selectedEnvironment = 'lobby', animationTimeline }: CinematicHeroBackgroundProps) {
  const { camera } = useThree();
  const sceneRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // Sync with GSAP timeline if provided
    if (animationTimeline && sceneRef.current) {
      animationTimeline.to(
        sceneRef.current.rotation,
        {
          z: Math.PI * 2,
          duration: 8,
          ease: 'none',
        },
        0
      );

      animationTimeline.to(
        camera,
        {
          z: 4,
          duration: 8,
          ease: 'power1.inOut',
        },
        0
      );
    }
  }, [camera, animationTimeline]);

  useFrame((state) => {
    // Gentle camera orbit if no animation timeline
    if (!animationTimeline && sceneRef.current) {
      sceneRef.current.rotation.z += 0.0002;
      state.camera.position.z = 5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0001;
      particlesRef.current.rotation.y += 0.0002;
    }
  });

  // Generate particle geometry
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <group ref={sceneRef}>
      {/* Environment with HDR - using drei presets */}
      <Environment 
        preset={
          selectedEnvironment === 'lobby' ? 'studio' :
          selectedEnvironment === 'city' ? 'warehouse' :
          'dawn'
        } 
        blur={0.5} 
      />

      {/* Particles for depth and visual interest */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          sizeAttenuation
          transparent
          opacity={0.4}
          color="#ffffff"
        />
      </points>

      {/* Subtle sphere for light reflection */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </group>
  );
}

export function CinematicHeroBackground({ 
  selectedEnvironment = 'lobby',
  animationTimeline,
}: CinematicHeroBackgroundProps) {
  // Disable on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
      >
        <Scene selectedEnvironment={selectedEnvironment} animationTimeline={animationTimeline} />
      </Canvas>
    </div>
  );
}
