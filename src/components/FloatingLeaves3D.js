'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function FloatingLeaf({ position, color, speed, rotationSpeed }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y += speed * delta;
      meshRef.current.rotation.x += rotationSpeed.x * delta;
      meshRef.current.rotation.y += rotationSpeed.y * delta;
      meshRef.current.rotation.z += rotationSpeed.z * delta;

      // Wrap around screen
      if (meshRef.current.position.y > 10) {
        meshRef.current.position.y = -10;
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={0.2}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} flatShading />
      </mesh>
    </Float>
  );
}

export default function FloatingLeaves3D() {
  const leaves = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20, // x
        (Math.random() - 0.5) * 20, // y
        (Math.random() - 0.5) * 10 - 5 // z (push back a bit)
      ],
      color: Math.random() > 0.5 ? '#10b981' : '#34d399',
      speed: Math.random() * 0.5 + 0.1, // floating up
      rotationSpeed: {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5
      }
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {leaves.map((leaf, idx) => (
          <FloatingLeaf key={idx} {...leaf} />
        ))}
      </Canvas>
    </div>
  );
}
