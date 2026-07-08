'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';

function Planet() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      {/* Outer Wireframe Grid (Digital/Modern vibe) */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 4]} />
        <meshStandardMaterial 
          color="#34d399" 
          wireframe={true} 
          emissive="#10b981"
          emissiveIntensity={1}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      
      {/* Inner Core (Solid Planet) */}
      <mesh>
        <icosahedronGeometry args={[2.4, 4]} />
        <meshStandardMaterial 
          color="#064e3b" 
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Atmospheric Glow */}
      <mesh>
        <sphereGeometry args={[2.7, 32, 32]} />
        <meshBasicMaterial 
          color="#a7f3d0" 
          transparent={true} 
          opacity={0.05} 
        />
      </mesh>
    </Float>
  );
}

export default function Planet3D() {
  return (
    <div className="w-full h-[400px] lg:h-[600px] relative z-20 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#10b981" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#059669" />
        
        {/* Animated Starfield Background */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
        
        <Planet />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.8} 
        />
      </Canvas>
    </div>
  );
}
