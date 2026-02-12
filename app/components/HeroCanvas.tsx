/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as THREE from "three";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import { useGLTF } from "@react-three/drei";
import { useMouse } from "../utils/useMouse";

export default function HeroCanvas() {
  const mouse = useMouse();
  const videoRef = useRef<HTMLVideoElement>(null);

  // 🔥 Video parallax (извън Three)
  useEffect(() => {
    const animate = () => {
      if (videoRef.current) {
        const x = mouse.current.x * 20;
        const y = mouse.current.y * 20;

        videoRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [mouse]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 🎥 VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
      />

      {/* 🧊 THREE CANVAS */}
      <Canvas
        className="absolute inset-0"
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1} />

        <Logo mouse={mouse} />
      </Canvas>
    </div>
  );
}

/* ========================= */
/* ===== 3D LOGO PART ====== */
/* ========================= */

function Logo({ mouse }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/elum.glb");

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y +=
      (mouse.current.x * 0.5 - groupRef.current.rotation.y) * 0.05;

    groupRef.current.rotation.x +=
      (-mouse.current.y * 0.3 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={0.4}
      // rotation={[Math.PI / 2, 0, 0]}
    />
  );
}

useGLTF.preload("/models/logo.glb");
