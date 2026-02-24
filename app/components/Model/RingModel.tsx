"use client";

import * as THREE from "three";

import { useEffect, useMemo } from "react";

export default function Ring() {
  const geometry = useMemo(() => new THREE.TorusGeometry(3, 0.05, 12, 64), []);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <mesh geometry={geometry} position-z={-1} rotation={[Math.PI / 1, 0, 2.35]}>
      {/* <torusGeometry args={[3, 0.05, 32, 200]} /> */}

      {/* <meshBasicMaterial color="white" /> */}
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={1}
        metalness={0}
        roughness={1}
      />
    </mesh>
  );
}
