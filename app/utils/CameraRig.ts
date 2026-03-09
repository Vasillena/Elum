/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as THREE from "three";

import { useFrame, useThree } from "@react-three/fiber";

import { useRef } from "react";

export default function CameraRig({ input }: any) {
  const { camera } = useThree();

  const basePosition = useRef(camera.position.clone());
  const offset = useRef(new THREE.Vector3());

  useFrame(() => {
    const x = input.current.x;
    const y = input.current.y;

    // много малък parallax offset
    offset.current.set(x * 0.2, y * 0.1, 0);

    // добавяме го към оригиналната позиция
    camera.position.lerp(
      basePosition.current.clone().add(offset.current),
      0.05
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}
