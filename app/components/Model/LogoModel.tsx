/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as THREE from "three";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { useBreakpoints } from "../../utils/useBreakpoints";

export default function LogoModel({ mouse }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const svgData = useLoader(SVGLoader, "/logo.svg");

  const target = useRef(0);
  const current = useRef(0);
  const lastMouse = useRef(0);

  const { down } = useBreakpoints();

  const isMobile = down("md");

  const baseY = 0.4;

  const geometry = useMemo(() => {
    const shapes = svgData.paths.flatMap((path) =>
      SVGLoader.createShapes(path)
    );

    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 60,
      bevelEnabled: true,
      bevelThickness: 0.5,
      bevelSize: 4,
      bevelSegments: 1,
      curveSegments: 12,
      // curveSegments: 34,
    });

    geo.center();
    geo.computeVertexNormals();

    return geo;
  }, [svgData]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    const dx = mouse.current.x - lastMouse.current;
    lastMouse.current = mouse.current.x;

    target.current += dx * 1.5;
    current.current += (target.current - current.current) * 0.08;
    target.current *= 0.95;

    groupRef.current.rotation.y = current.current;
    groupRef.current.position.y = baseY + Math.sin(time * 1.2) * 0.08;
  });

  return (
    <group
      ref={groupRef}
      position={isMobile ? [0, baseY, 0] : [-0.5, baseY, 0.8]}
      scale={[0.01, -0.01, 0.01]}
    >
      <mesh geometry={geometry} castShadow>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={4}
          roughness={0.01}
          ior={1.45}
          chromaticAberration={0.03}
          anisotropy={0.8}
          distortion={10}
          distortionScale={6}
          temporalDistortion={0.2}
          // resolution={1024}
          resolution={isMobile ? 256 : 512}
          backside
        />
      </mesh>
      {/* <mesh geometry={geometry} castShadow>
        <meshStandardMaterial color="black" transparent opacity={0} />
      </mesh> */}
    </group>
  );
}
