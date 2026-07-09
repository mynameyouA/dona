'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';

function CinematicSequence() {
  const coinRef = useRef();
  const treeRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const t = (state.clock.elapsedTime % 10); // 10 second loop

    // Phase 1: Coin Drop (0 - 2s)
    if (coinRef.current) {
      if (t < 2) {
        coinRef.current.position.y = 5 - (t * 2.5); // drops from 5 to 0
        coinRef.current.rotation.y = t * Math.PI * 4; // spins fast
        coinRef.current.scale.setScalar(1);
      } else if (t < 3) {
        coinRef.current.position.y = -(t - 2) * 2; // sinks into ground
        coinRef.current.scale.setScalar(1 - (t - 2)); // shrinks
      } else {
        coinRef.current.scale.setScalar(0);
      }
    }

    // Phase 2: Glow Explosion (2.5 - 3.5s)
    if (glowRef.current) {
      if (t > 2.5 && t < 3.5) {
        const glowPhase = t - 2.5;
        glowRef.current.scale.setScalar(glowPhase * 5);
        glowRef.current.material.opacity = 1 - glowPhase;
      } else {
        glowRef.current.scale.setScalar(0);
      }
    }

    // Phase 3: Tree Growth (3 - 6s)
    if (treeRef.current) {
      if (t < 3) {
        treeRef.current.scale.setScalar(0);
      } else if (t >= 3 && t < 6) {
        const growth = (t - 3) / 3;
        // ease out elastic roughly
        const scale = Math.sin(growth * Math.PI * 0.5);
        treeRef.current.scale.setScalar(scale * 1.5);
        treeRef.current.rotation.y = t * 0.5; // slowly rotates while growing
      } else {
        treeRef.current.scale.setScalar(1.5);
        treeRef.current.rotation.y = t * 0.5; // continues rotating
      }
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* The Coin */}
      <group ref={coinRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
        <Text
          position={[0, 0.11, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.5}
          color="#b45309"
          fontWeight="bold"
        >
          $10
        </Text>
      </group>

      {/* The Magic Glow */}
      <mesh ref={glowRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0} />
      </mesh>

      {/* The Tree */}
      <group ref={treeRef} scale={0}>
        {/* Trunk */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.3, 0.5, 2, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
        {/* Leaves Level 1 */}
        <mesh position={[0, 2.5, 0]}>
          <coneGeometry args={[2, 2, 8]} />
          <meshStandardMaterial color="#059669" roughness={0.7} flatShading />
        </mesh>
        {/* Leaves Level 2 */}
        <mesh position={[0, 3.5, 0]}>
          <coneGeometry args={[1.5, 2, 8]} />
          <meshStandardMaterial color="#10b981" roughness={0.7} flatShading />
        </mesh>
        {/* Leaves Level 3 */}
        <mesh position={[0, 4.5, 0]}>
          <coneGeometry args={[1, 1.5, 8]} />
          <meshStandardMaterial color="#34d399" roughness={0.7} flatShading />
        </mesh>
      </group>

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0f172a" opacity={0.1} transparent />
      </mesh>
    </group>
  );
}

export default function GrowthJourney() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10 mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          The Journey of <span className="text-emerald-400">$10</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Watch how a small donation transforms into a living, breathing ecosystem. Real impact, unfolding in real-time.
        </p>
      </div>

      {/* 3D Canvas Container */}
      <div className="w-full h-[500px] md:h-[600px] relative cursor-grab active:cursor-grabbing">
        {/* Decorative background glow behind the canvas */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px]"></div>
        
        <Canvas camera={{ position: [0, 2, 10], fov: 45 }} shadows>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <pointLight position={[-10, 5, -5]} intensity={1} color="#a7f3d0" />
          
          <CinematicSequence />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2} // don't go below ground
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>
      </div>
    </section>
  );
}
