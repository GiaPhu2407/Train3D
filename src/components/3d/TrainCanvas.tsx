'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LuxuryTrain3D } from './LuxuryTrain3D';
import { InfiniteTracks3D } from './InfiniteTracks3D';
import { TrainFallback } from './TrainFallback';

// Interactive Camera controller with Mouse Parallax & Scroll reaction
const CameraController: React.FC<{
  mousePos: { x: number; y: number };
  scrollVelocity: number;
}> = ({ mousePos, scrollVelocity }) => {
  const targetCamPos = useRef(new THREE.Vector3(2.8, 1.8, 6.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.8, 0));

  useFrame((state, delta) => {
    // Parallax mouse target
    const targetX = 2.8 + mousePos.x * 1.5;
    const targetY = 1.8 - mousePos.y * 0.9;
    const targetZ = 6.2 + Math.min(scrollVelocity * 2.5, 3.0);

    // Smooth lerp camera position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 3.5);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 3.5);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 3.5);

    // Dynamic look-at with subtle scroll lag
    const lookTarget = new THREE.Vector3(0, 0.7 - mousePos.y * 0.3, -1.2);
    targetLookAt.current.lerp(lookTarget, delta * 4);
    state.camera.lookAt(targetLookAt.current);
  });

  return null;
};

// Scene Lighting & Atmospheric Night Fog
const SceneEnvironment: React.FC = () => {
  return (
    <>
      <color attach="background" args={['#070A0E']} />
      <fog attach="fog" args={['#070A0E', 12, 45]} />

      {/* Ambient Cool Night Lighting */}
      <ambientLight color="#1E293B" intensity={1.2} />

      {/* Directional Moonlight with Warm Golden Backlight */}
      <directionalLight
        position={[8, 12, 6]}
        color="#F8FAFC"
        intensity={2.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Warm Golden Horizon Rim Light */}
      <directionalLight position={[-6, 4, -15]} color="#D8B978" intensity={3.0} />

      {/* Overhead Catenary Electric Spark Glows */}
      <pointLight position={[0, 4.2, 0]} color="#E2E8F0" intensity={1.5} distance={10} />
    </>
  );
};

export const TrainCanvas: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // WebGL & reduced-motion check
  useEffect(() => {
    try {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setHasWebGL(false);
        return;
      }

      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Mouse Parallax listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll Velocity tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      setScrollSpeed(Math.min(deltaY / 15, 2.5));

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setScrollSpeed(0);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  if (hasWebGL === false) {
    return <TrainFallback />;
  }

  return (
    <div className="relative w-full h-full min-h-[500px] md:min-h-[650px] lg:min-h-[750px]">
      <Canvas
        camera={{ position: [2.8, 1.8, 6.2], fov: 42, near: 0.1, far: 80 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneEnvironment />
          <CameraController mousePos={mousePos} scrollVelocity={scrollSpeed} />
          <LuxuryTrain3D scrollSpeedMultiplier={scrollSpeed} />
          <InfiniteTracks3D scrollSpeedMultiplier={scrollSpeed} />
        </Suspense>
      </Canvas>

      {/* Dramatic Gradient Vignette Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B0F14] via-transparent to-transparent opacity-90" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0B0F14]/70 via-transparent to-[#0B0F14]/70" />
    </div>
  );
};
