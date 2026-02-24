import * as THREE from "three";

import { useEffect, useMemo } from "react";

export default function Podium() {
  const geometry = useMemo(() => new THREE.CylinderGeometry(2, 2, 8, 64), []);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <mesh geometry={geometry} position={[0, -5.8, 0]} receiveShadow>
      {/* <cylinderGeometry args={[2, 2, 8, 64]} /> */}
      {/* 
      <meshPhysicalMaterial color="#050505" metalness={1} roughness={0} /> */}

      <meshPhysicalMaterial color="#050505" metalness={0.8} roughness={0.4} />
    </mesh>
  );
}
