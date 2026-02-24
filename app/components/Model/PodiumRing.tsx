"use client";

import * as THREE from "three";

import { useEffect, useMemo } from "react";

export default function PodiumRing() {
  const geometry = useMemo(
    () => new THREE.TorusGeometry(1.95, 0.06, 12, 64),
    []
  );

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <mesh geometry={geometry} position-y={-2.2} rotation-x={Math.PI / 2}>
      {/* <torusGeometry args={[1.95, 0.06, 16, 64]} /> */}
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={2}
        metalness={0}
        roughness={1}
      />
    </mesh>
  );
}
