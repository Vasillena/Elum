/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as THREE from "three";

import { useFrame, useThree } from "@react-three/fiber";

import { useRef } from "react";

export default function CameraRig({ input }: any) {
  const { camera } = useThree();

  const base = useRef(camera.position.clone());
  const target = useRef(new THREE.Vector3());
  const current = useRef(new THREE.Vector3());

  useFrame(() => {
    const x = input.current.x;
    const y = input.current.y;

    target.current.set(
      base.current.x + x * 0.8,
      base.current.y + y * 0.4,
      base.current.z
    );

    current.current.lerp(target.current, 0.08);

    camera.position.copy(current.current);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
