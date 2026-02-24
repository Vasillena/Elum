/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as THREE from "three";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function SmoothGroupPosition({
  targetPosition,
  children,
  ...props
}: any) {
  const ref = useRef<THREE.Group>(null);
  const targetVec = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!ref.current) return;

    targetVec.current.set(
      targetPosition[0],
      targetPosition[1],
      targetPosition[2]
    );

    ref.current.position.lerp(targetVec.current, 0.08);
  });

  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  );
}
