'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function LowPolyTree({ isActive, sizeMultiplier }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate faster if active/selected
      groupRef.current.rotation.y += delta * (isActive ? 1.5 : 0.2);
      
      // Slight floating effect if active
      if (isActive) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.1;
      } else {
        groupRef.current.position.y = 0;
      }
    }
  });

  return (
    <group ref={groupRef} scale={[sizeMultiplier, sizeMultiplier, sizeMultiplier]} position={[0, -0.5, 0]}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1, 5]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      
      {/* Bottom Canopy */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[1, 1, 6]} />
        <meshStandardMaterial color={isActive ? "#34d399" : "#10b981"} roughness={0.7} flatShading />
      </mesh>
      
      {/* Middle Canopy */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.8, 1, 6]} />
        <meshStandardMaterial color={isActive ? "#6ee7b7" : "#34d399"} roughness={0.7} flatShading />
      </mesh>
      
      {/* Top Canopy */}
      <mesh position={[0, 2.3, 0]}>
        <coneGeometry args={[0.5, 0.8, 6]} />
        <meshStandardMaterial color={isActive ? "#a7f3d0" : "#6ee7b7"} roughness={0.7} flatShading />
      </mesh>
    </group>
  );
}

export default function TreeIcon3D({ isActive, count }) {
  // Adjust scale slightly based on how many trees it represents
  const sizeMultiplier = count >= 100 ? 1.2 : count >= 20 ? 1.1 : count >= 5 ? 1 : 0.9;
  
  return (
    <div className="w-full h-24 mb-2 pointer-events-none">
      <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#a7f3d0" />
        
        <LowPolyTree isActive={isActive} sizeMultiplier={sizeMultiplier} />
      </Canvas>
    </div>
  );
}
