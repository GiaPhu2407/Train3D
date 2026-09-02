'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InfiniteTracks3DProps {
  scrollSpeedMultiplier: number;
}

export const InfiniteTracks3D: React.FC<InfiniteTracks3DProps> = ({ scrollSpeedMultiplier }) => {
  const sleepersGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Material definitions
  const railMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#CBD5E1',
        metalness: 0.95,
        roughness: 0.15,
      }),
    []
  );

  const sleeperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1E242B',
        roughness: 0.85,
        metalness: 0.1,
      }),
    []
  );

  const ballastMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#080C10',
        roughness: 0.95,
        metalness: 0.05,
      }),
    []
  );

  // Generate Sleeper offsets (repeating along Z from -40 to +30)
  const sleeperSpacing = 1.0;
  const sleeperCount = 70;
  const initialSleepers = useMemo(() => {
    return Array.from({ length: sleeperCount }, (_, i) => -40 + i * sleeperSpacing);
  }, []);

  // Golden particle dust floating in the atmosphere
  const particleCount = 120;
  const [particlePositions, particleVelocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = Math.random() * 4 + 0.1;
      pos[i * 3 + 2] = -35 + Math.random() * 55;

      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      vel[i * 3 + 2] = Math.random() * 0.08 + 0.04;
    }
    return [pos, vel];
  }, []);

  useFrame((_, delta) => {
    const speed = (6.5 + scrollSpeedMultiplier * 20) * delta;

    // Shift sleepers forward to create infinite forward motion illusion
    if (sleepersGroupRef.current) {
      sleepersGroupRef.current.children.forEach((child) => {
        child.position.z += speed;
        if (child.position.z > 25) {
          child.position.z -= sleeperCount * sleeperSpacing;
        }
      });
    }

    // Animate glowing particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += particleVelocities[i * 3 + 2] + speed * 0.4;
        positions[i * 3 + 1] += particleVelocities[i * 3 + 1];

        if (positions[i * 3 + 2] > 20) {
          positions[i * 3 + 2] = -35;
          positions[i * 3 + 1] = Math.random() * 3 + 0.2;
        }
        if (positions[i * 3 + 1] > 5) {
          positions[i * 3 + 1] = 0.2;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Ground Ballast Bed */}
      <mesh position={[0, -0.15, -5]} rotation={[-Math.PI / 2, 0, 0]} material={ballastMaterial} receiveShadow>
        <planeGeometry args={[18, 90]} />
      </mesh>

      {/* 2. Dual Reflective Steel Rails */}
      {/* Left Rail */}
      <mesh position={[-0.6, 0.08, -5]} material={railMaterial} receiveShadow castShadow>
        <boxGeometry args={[0.08, 0.12, 90]} />
      </mesh>
      {/* Right Rail */}
      <mesh position={[0.6, 0.08, -5]} material={railMaterial} receiveShadow castShadow>
        <boxGeometry args={[0.08, 0.12, 90]} />
      </mesh>

      {/* Subtle Golden Track Guideline Glow Under Rails */}
      <mesh position={[0, -0.02, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 90]} />
        <meshBasicMaterial color="#D8B978" transparent opacity={0.06} />
      </mesh>

      {/* 3. Sleepers Loop */}
      <group ref={sleepersGroupRef}>
        {initialSleepers.map((z, idx) => (
          <mesh key={`sleeper-${idx}`} position={[0, 0.02, z]} material={sleeperMaterial} receiveShadow>
            <boxGeometry args={[2.1, 0.06, 0.28]} />
          </mesh>
        ))}
      </group>

      {/* 4. Overhead Catenary Transmission Poles along track */}
      {[-30, -18, -6, 6, 18].map((zPos, pIdx) => (
        <group key={`pole-${pIdx}`} position={[0, 0, zPos]}>
          {/* Left Mast */}
          <mesh position={[-3.2, 2.2, 0]} material={sleeperMaterial}>
            <cylinderGeometry args={[0.08, 0.1, 4.6, 8]} />
          </mesh>
          {/* Right Mast */}
          <mesh position={[3.2, 2.2, 0]} material={sleeperMaterial}>
            <cylinderGeometry args={[0.08, 0.1, 4.6, 8]} />
          </mesh>
          {/* Top Beam */}
          <mesh position={[0, 4.4, 0]} material={sleeperMaterial}>
            <boxGeometry args={[6.6, 0.1, 0.1]} />
          </mesh>
          {/* Insulator & Catenary Dropper */}
          <mesh position={[0, 4.1, 0]} material={railMaterial}>
            <cylinderGeometry args={[0.03, 0.03, 0.5, 6]} />
          </mesh>
        </group>
      ))}

      {/* 5. Floating Track Spark/Mist Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#F3E5AB"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
