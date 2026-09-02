'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LuxuryTrain3DProps {
  scrollSpeedMultiplier: number;
}

export const LuxuryTrain3D: React.FC<LuxuryTrain3DProps> = ({ scrollSpeedMultiplier }) => {
  const trainGroupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const passengerHeadsRef = useRef<THREE.Mesh[]>([]);

  // Materials with crystal transparent glass & luxury interior fabrics
  const materials = useMemo(() => {
    return {
      bodyMetallic: new THREE.MeshStandardMaterial({
        color: '#0F172A',
        metalness: 0.85,
        roughness: 0.2,
      }),
      goldTrim: new THREE.MeshStandardMaterial({
        color: '#D8B978',
        metalness: 0.95,
        roughness: 0.15,
        emissive: '#59441B',
        emissiveIntensity: 0.2,
      }),
      roofDark: new THREE.MeshStandardMaterial({
        color: '#090D12',
        metalness: 0.6,
        roughness: 0.4,
      }),
      // Transparent Crystal Glass so users can see inside!
      glassWindows: new THREE.MeshPhysicalMaterial({
        color: '#FFF8E7',
        roughness: 0.05,
        metalness: 0.1,
        transparent: true,
        opacity: 0.35,
        transmission: 0.65,
        ior: 1.45,
      }),
      headlights: new THREE.MeshBasicMaterial({
        color: '#FFF4D0',
      }),
      undercarriage: new THREE.MeshStandardMaterial({
        color: '#1E293B',
        metalness: 0.7,
        roughness: 0.6,
      }),
      wheels: new THREE.MeshStandardMaterial({
        color: '#475569',
        metalness: 0.9,
        roughness: 0.3,
      }),
      // Interior Materials
      interiorFloor: new THREE.MeshStandardMaterial({
        color: '#3B2F2F', // Dark mahogany wood
        roughness: 0.6,
      }),
      leatherArmchair: new THREE.MeshStandardMaterial({
        color: '#8B5A2B', // Cognac luxury leather
        roughness: 0.4,
      }),
      armchairNavy: new THREE.MeshStandardMaterial({
        color: '#1E3A8A', // Royal navy armchair
        roughness: 0.5,
      }),
      tableMahogany: new THREE.MeshStandardMaterial({
        color: '#451A03',
        roughness: 0.3,
      }),
      lampWarmGlow: new THREE.MeshBasicMaterial({
        color: '#FFD166',
      }),
      // Passenger Figures
      passengerSkin1: new THREE.MeshStandardMaterial({
        color: '#FCD34D',
        roughness: 0.6,
      }),
      passengerSkin2: new THREE.MeshStandardMaterial({
        color: '#FDBA74',
        roughness: 0.6,
      }),
      passengerClothBlue: new THREE.MeshStandardMaterial({
        color: '#2563EB',
        roughness: 0.7,
      }),
      passengerClothGold: new THREE.MeshStandardMaterial({
        color: '#C9A96E',
        roughness: 0.7,
      }),
      passengerClothEmerald: new THREE.MeshStandardMaterial({
        color: '#059669',
        roughness: 0.7,
      }),
      passengerHairDark: new THREE.MeshStandardMaterial({
        color: '#1E293B',
        roughness: 0.9,
      }),
      conductorUniform: new THREE.MeshStandardMaterial({
        color: '#0B0F14',
        metalness: 0.3,
        roughness: 0.5,
      }),
    };
  }, []);

  // Frame animation: Train travel along Z, wheel spin, and passenger subtle motion
  useFrame((state, delta) => {
    if (!trainGroupRef.current) return;

    const baseSpeed = 4.2;
    const currentSpeed = baseSpeed + scrollSpeedMultiplier * 14;
    
    // Train forward oscillation / illusion of speed
    const time = state.clock.getElapsedTime();
    const sway = Math.sin(time * 6) * 0.008;
    const pitch = Math.cos(time * 4) * 0.003;

    trainGroupRef.current.position.y = 0.52 + Math.sin(time * 8) * 0.004;
    trainGroupRef.current.rotation.z = sway;
    trainGroupRef.current.rotation.x = pitch;

    // Rotate wheels
    wheelsRef.current.forEach((wheel) => {
      if (wheel) {
        wheel.rotation.x += delta * currentSpeed * 2.5;
      }
    });

    // Subtle passenger animation (breathing & looking out window)
    passengerHeadsRef.current.forEach((head, hIdx) => {
      if (head) {
        head.rotation.y = Math.sin(time * 1.5 + hIdx * 1.2) * 0.18 + (hIdx % 2 === 0 ? 0.3 : -0.3);
        head.position.y = 0.66 + Math.sin(time * 2 + hIdx) * 0.01;
      }
    });
  });

  // Helper: Render a 3D seated passenger figure
  const renderPassenger = (
    key: string,
    pos: [number, number, number],
    rotY: number,
    clothMat: THREE.Material,
    skinMat: THREE.Material,
    isLookingAtWindow = false
  ) => {
    return (
      <group key={key} position={pos} rotation={[0, rotY, 0]}>
        {/* Passenger Torso / Jacket */}
        <mesh position={[0, 0.42, 0]} material={clothMat} castShadow>
          <boxGeometry args={[0.26, 0.28, 0.2]} />
        </mesh>

        {/* Arms resting on table / armrest */}
        <mesh position={[-0.14, 0.38, 0.08]} rotation={[0.4, 0, 0]} material={clothMat}>
          <boxGeometry args={[0.07, 0.2, 0.07]} />
        </mesh>
        <mesh position={[0.14, 0.38, 0.08]} rotation={[0.4, 0, 0]} material={clothMat}>
          <boxGeometry args={[0.07, 0.2, 0.07]} />
        </mesh>

        {/* Passenger Legs */}
        <mesh position={[-0.08, 0.22, 0.12]} rotation={[Math.PI / 2, 0, 0]} material={materials.conductorUniform}>
          <boxGeometry args={[0.09, 0.24, 0.08]} />
        </mesh>
        <mesh position={[0.08, 0.22, 0.12]} rotation={[Math.PI / 2, 0, 0]} material={materials.conductorUniform}>
          <boxGeometry args={[0.09, 0.24, 0.08]} />
        </mesh>

        {/* Head & Hair with dynamic subtle animation */}
        <mesh
          position={[0, 0.66, 0]}
          material={skinMat}
          ref={(el) => {
            if (el && !passengerHeadsRef.current.includes(el)) {
              passengerHeadsRef.current.push(el);
            }
          }}
        >
          <sphereGeometry args={[0.09, 16, 16]} />
          {/* Hair */}
          <mesh position={[0, 0.04, -0.02]} material={materials.passengerHairDark}>
            <sphereGeometry args={[0.092, 16, 16]} />
          </mesh>
        </mesh>
      </group>
    );
  };

  // Helper: Render a complete passenger carriage with interior, tables, lamps, and passengers
  const renderCarriage = (index: number, zOffset: number) => {
    return (
      <group key={`carriage-${index}`} position={[0, 0, zOffset]}>
        {/* 1. Carriage Floor Base */}
        <mesh position={[0, 0.04, 0]} material={materials.interiorFloor}>
          <boxGeometry args={[1.42, 0.04, 3.3]} />
        </mesh>

        {/* 2. Warm Interior Ambient Light (illuminates passengers inside!) */}
        <pointLight position={[0, 0.65, 0]} color="#FFE29A" intensity={3.5} distance={4.5} />
        <pointLight position={[0, 0.65, -1.0]} color="#FFD580" intensity={2.5} distance={3.5} />
        <pointLight position={[0, 0.65, 1.0]} color="#FFD580" intensity={2.5} distance={3.5} />

        {/* 3. Interior Partition Walls & Luxury Panels */}
        <mesh position={[0, 0.45, -1.62]} material={materials.bodyMetallic}>
          <boxGeometry args={[1.46, 0.85, 0.06]} />
        </mesh>
        <mesh position={[0, 0.45, 1.62]} material={materials.bodyMetallic}>
          <boxGeometry args={[1.46, 0.85, 0.06]} />
        </mesh>

        {/* 4. Luxury Armchairs & Facing Table Sets */}
        {[-0.8, 0.8].map((tableZ, tIdx) => (
          <group key={`dining-set-${tIdx}`} position={[0, 0, tableZ]}>
            {/* Left Side Table & 2 Facing Armchairs */}
            <group position={[-0.45, 0, 0]}>
              {/* Table */}
              <mesh position={[0, 0.32, 0]} material={materials.tableMahogany}>
                <boxGeometry args={[0.35, 0.04, 0.45]} />
              </mesh>
              <mesh position={[0, 0.16, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.02, 0.02, 0.32, 8]} />
              </mesh>
              {/* Mini Table Lamp */}
              <mesh position={[0, 0.38, 0]} material={materials.lampWarmGlow}>
                <sphereGeometry args={[0.035, 12, 12]} />
              </mesh>

              {/* Facing Armchair 1 (Forward) */}
              <group position={[0, 0.18, -0.32]} rotation={[0, 0, 0]}>
                <mesh material={materials.leatherArmchair}>
                  <boxGeometry args={[0.32, 0.28, 0.26]} />
                </mesh>
                <mesh position={[0, 0.24, -0.1]} material={materials.leatherArmchair}>
                  <boxGeometry args={[0.32, 0.28, 0.06]} />
                </mesh>
              </group>

              {/* Facing Armchair 2 (Backward) */}
              <group position={[0, 0.18, 0.32]} rotation={[0, Math.PI, 0]}>
                <mesh material={materials.leatherArmchair}>
                  <boxGeometry args={[0.32, 0.28, 0.26]} />
                </mesh>
                <mesh position={[0, 0.24, -0.1]} material={materials.leatherArmchair}>
                  <boxGeometry args={[0.32, 0.28, 0.06]} />
                </mesh>
              </group>

              {/* 3D Passengers sitting by Left Window */}
              {renderPassenger(
                `p-left-${tIdx}`,
                [0, 0.12, -0.28],
                0,
                tIdx === 0 ? materials.passengerClothBlue : materials.passengerClothGold,
                materials.passengerSkin1,
                true
              )}
            </group>

            {/* Right Side Table & 2 Facing Armchairs */}
            <group position={[0.45, 0, 0]}>
              {/* Table */}
              <mesh position={[0, 0.32, 0]} material={materials.tableMahogany}>
                <boxGeometry args={[0.35, 0.04, 0.45]} />
              </mesh>
              <mesh position={[0, 0.16, 0]} material={materials.goldTrim}>
                <cylinderGeometry args={[0.02, 0.02, 0.32, 8]} />
              </mesh>
              {/* Mini Table Lamp */}
              <mesh position={[0, 0.38, 0]} material={materials.lampWarmGlow}>
                <sphereGeometry args={[0.035, 12, 12]} />
              </mesh>

              {/* Facing Armchairs */}
              <group position={[0, 0.18, -0.32]} rotation={[0, 0, 0]}>
                <mesh material={materials.armchairNavy}>
                  <boxGeometry args={[0.32, 0.28, 0.26]} />
                </mesh>
                <mesh position={[0, 0.24, -0.1]} material={materials.armchairNavy}>
                  <boxGeometry args={[0.32, 0.28, 0.06]} />
                </mesh>
              </group>
              <group position={[0, 0.18, 0.32]} rotation={[0, Math.PI, 0]}>
                <mesh material={materials.armchairNavy}>
                  <boxGeometry args={[0.32, 0.28, 0.26]} />
                </mesh>
                <mesh position={[0, 0.24, -0.1]} material={materials.armchairNavy}>
                  <boxGeometry args={[0.32, 0.28, 0.06]} />
                </mesh>
              </group>

              {/* 3D Passenger sitting by Right Window */}
              {renderPassenger(
                `p-right-${tIdx}`,
                [0, 0.12, 0.28],
                Math.PI,
                tIdx === 0 ? materials.passengerClothEmerald : materials.passengerClothBlue,
                materials.passengerSkin2,
                true
              )}
            </group>
          </group>
        ))}

        {/* 5. Main Outer Body Shell Frame */}
        <mesh position={[0, 0.12, 0]} material={materials.bodyMetallic}>
          <boxGeometry args={[1.5, 0.24, 3.4]} />
        </mesh>
        <mesh position={[0, 0.78, 0]} material={materials.bodyMetallic}>
          <boxGeometry args={[1.5, 0.2, 3.4]} />
        </mesh>

        {/* 6. Aerodynamic Roof */}
        <mesh position={[0, 0.92, 0]} material={materials.roofDark}>
          <boxGeometry args={[1.44, 0.12, 3.38]} />
        </mesh>

        {/* 7. Gold Accent Waist Stripes */}
        <mesh position={[0, 0.24, 0]} material={materials.goldTrim}>
          <boxGeometry args={[1.52, 0.05, 3.42]} />
        </mesh>
        <mesh position={[0, 0.05, 0]} material={materials.goldTrim}>
          <boxGeometry args={[1.52, 0.04, 3.42]} />
        </mesh>

        {/* 8. Transparent Crystal Windows (Allows looking into the carriage!) */}
        {[-0.75, 0.75].map((xSide, sIdx) => (
          <mesh key={`win-side-${sIdx}`} position={[xSide, 0.52, 0]} material={materials.glassWindows}>
            <boxGeometry args={[0.03, 0.44, 2.9]} />
          </mesh>
        ))}

        {/* 9. Undercarriage Chassis & Bogies */}
        <mesh position={[0, -0.08, 0]} material={materials.undercarriage}>
          <boxGeometry args={[1.3, 0.16, 3.2]} />
        </mesh>

        {/* Bogies & Wheelsets */}
        {[-1.1, 1.1].map((bogieZ, bIdx) => (
          <group key={`bogie-${bIdx}`} position={[0, -0.22, bogieZ]}>
            <mesh material={materials.undercarriage}>
              <boxGeometry args={[1.2, 0.12, 0.7]} />
            </mesh>
            {[-0.6, 0.6].map((wX, wxIdx) =>
              [-0.24, 0.24].map((wZ, wzIdx) => (
                <mesh
                  key={`wheel-${wxIdx}-${wzIdx}`}
                  position={[wX, -0.05, wZ]}
                  rotation={[0, 0, Math.PI / 2]}
                  material={materials.wheels}
                  ref={(el) => {
                    if (el && !wheelsRef.current.includes(el)) {
                      wheelsRef.current.push(el);
                    }
                  }}
                >
                  <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} />
                </mesh>
              ))
            )}
          </group>
        ))}

        {/* Gangway Coupler */}
        <mesh position={[0, 0.38, 1.76]} material={materials.roofDark}>
          <boxGeometry args={[0.9, 0.75, 0.18]} />
        </mesh>
      </group>
    );
  };

  return (
    <group ref={trainGroupRef} position={[0, 0.52, 0]}>
      {/* 1. Bullet Nose Locomotive with Driver in Cockpit */}
      <group position={[0, 0, 0]}>
        {/* Cockpit Interior & Conductor */}
        <pointLight position={[0, 0.55, -0.8]} color="#FFE29A" intensity={2.5} distance={3.0} />
        {renderPassenger('conductor', [0, 0.15, -0.9], 0, materials.conductorUniform, materials.passengerSkin1)}

        {/* Locomotive Cockpit Controls Dashboard */}
        <mesh position={[0, 0.38, -1.35]} material={materials.bodyMetallic}>
          <boxGeometry args={[1.1, 0.2, 0.3]} />
        </mesh>

        {/* Main Locomotive Body */}
        <mesh position={[0, 0.12, 0]} material={materials.bodyMetallic} castShadow>
          <boxGeometry args={[1.5, 0.24, 3.4]} />
        </mesh>
        <mesh position={[0, 0.78, 0]} material={materials.bodyMetallic} castShadow>
          <boxGeometry args={[1.5, 0.2, 3.4]} />
        </mesh>

        {/* Sleek Aerodynamic Nose Cone (Tapered front) */}
        <mesh position={[0, 0.35, -2.1]} rotation={[Math.PI / 8, 0, 0]} material={materials.bodyMetallic} castShadow>
          <boxGeometry args={[1.48, 0.75, 1.2]} />
        </mesh>

        {/* Golden Nose Trim Strip */}
        <mesh position={[0, 0.15, -2.6]} material={materials.goldTrim}>
          <boxGeometry args={[1.3, 0.08, 0.4]} />
        </mesh>

        {/* Cockpit Panoramic Windshield (Transparent) */}
        <mesh position={[0, 0.65, -1.6]} rotation={[-Math.PI / 6, 0, 0]} material={materials.glassWindows}>
          <boxGeometry args={[1.35, 0.38, 0.06]} />
        </mesh>

        {/* Gold Body Stripes */}
        <mesh position={[0, 0.24, 0]} material={materials.goldTrim}>
          <boxGeometry args={[1.52, 0.05, 3.42]} />
        </mesh>
        <mesh position={[0, 0.05, 0]} material={materials.goldTrim}>
          <boxGeometry args={[1.52, 0.04, 3.42]} />
        </mesh>

        {/* Side Windows (Transparent Crystal) */}
        {[-0.75, 0.75].map((xSide, sIdx) => (
          <mesh key={`loco-win-${sIdx}`} position={[xSide, 0.52, 0.4]} material={materials.glassWindows}>
            <boxGeometry args={[0.03, 0.44, 2.1]} />
          </mesh>
        ))}

        {/* High-Intensity Headlights */}
        <mesh position={[-0.45, 0.25, -2.72]} material={materials.headlights}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>
        <mesh position={[0.45, 0.25, -2.72]} material={materials.headlights}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>
        <mesh position={[0, 0.78, -1.8]} material={materials.headlights}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>

        {/* Headlight Projection SpotLights */}
        <spotLight
          position={[-0.45, 0.25, -2.72]}
          target-position={[-0.45, -0.5, -14]}
          color="#FFF2B2"
          intensity={12}
          angle={0.45}
          penumbra={0.6}
          distance={28}
          castShadow
        />
        <spotLight
          position={[0.45, 0.25, -2.72]}
          target-position={[0.45, -0.5, -14]}
          color="#FFF2B2"
          intensity={12}
          angle={0.45}
          penumbra={0.6}
          distance={28}
          castShadow
        />
        {/* Center High Beam */}
        <spotLight
          position={[0, 0.78, -1.8]}
          target-position={[0, -0.2, -22]}
          color="#FFEAA7"
          intensity={8}
          angle={0.35}
          penumbra={0.8}
          distance={35}
        />

        {/* Roof & Pantograph */}
        <mesh position={[0, 0.92, 0]} material={materials.roofDark}>
          <boxGeometry args={[1.44, 0.12, 3.38]} />
        </mesh>
        <group position={[0, 1.05, 0.8]}>
          <mesh material={materials.goldTrim}>
            <boxGeometry args={[0.4, 0.12, 0.6]} />
          </mesh>
          <mesh position={[0, 0.14, 0]} rotation={[0.3, 0, 0]} material={materials.goldTrim}>
            <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          </mesh>
          <mesh position={[0, 0.28, 0.05]} material={materials.goldTrim}>
            <boxGeometry args={[0.6, 0.02, 0.1]} />
          </mesh>
        </group>

        {/* Undercarriage & Wheels */}
        <mesh position={[0, -0.08, 0]} material={materials.undercarriage}>
          <boxGeometry args={[1.3, 0.16, 3.2]} />
        </mesh>
        {[-1.0, 0.8].map((bogieZ, bIdx) => (
          <group key={`loco-bogie-${bIdx}`} position={[0, -0.22, bogieZ]}>
            <mesh material={materials.undercarriage}>
              <boxGeometry args={[1.2, 0.12, 0.7]} />
            </mesh>
            {[-0.6, 0.6].map((wX, wxIdx) =>
              [-0.24, 0.24].map((wZ, wzIdx) => (
                <mesh
                  key={`loco-w-${wxIdx}-${wzIdx}`}
                  position={[wX, -0.05, wZ]}
                  rotation={[0, 0, Math.PI / 2]}
                  material={materials.wheels}
                  ref={(el) => {
                    if (el && !wheelsRef.current.includes(el)) {
                      wheelsRef.current.push(el);
                    }
                  }}
                >
                  <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} />
                </mesh>
              ))
            )}
          </group>
        ))}
      </group>

      {/* 2. Carriages Behind Locomotive (With Visible Passengers & Interiors) */}
      {renderCarriage(1, 3.65)}
      {renderCarriage(2, 7.3)}
      {renderCarriage(3, 10.95)}
    </group>
  );
};
