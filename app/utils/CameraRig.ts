/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as THREE from "three";

import { useFrame, useThree } from "@react-three/fiber";

import { useRef } from "react";

export default function CameraRig({ input }: any) {
  const { camera } = useThree();

  const target = useRef(new THREE.Vector3());
  const current = useRef(new THREE.Vector3());

  useFrame(() => {
    const x = input.current.x;
    const y = input.current.y;

    // target position
    target.current.set(x * 0.4, y * 0.2 + 0.5, camera.position.z);

    // smooth lerp
    current.current.lerp(target.current, 0.05);

    // вместо директна промяна на x/y
    camera.position.copy(current.current);

    camera.lookAt(0, 0, 0);
  });

  return null;
}
