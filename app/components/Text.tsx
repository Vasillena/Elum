"use client";

import * as THREE from "three";

import { Billboard, Text } from "@react-three/drei";
import { useEffect, useMemo } from "react";

import { SVGLoader } from "three/examples/jsm/Addons.js";
import { useLoader } from "@react-three/fiber";

export default function CavasText() {
  const data = useLoader(SVGLoader, "/elum-full.svg");

  const meshes = useMemo(() => {
    if (!data) return [];

    return data.paths.flatMap((path) =>
      path.toShapes(true).map((shape) => new THREE.ShapeGeometry(shape))
    );
  }, [data]);

  useEffect(() => {
    return () => {
      meshes.forEach((geo) => geo.dispose());
    };
  }, [meshes]);

  if (!meshes.length) return null;

  return (
    <Billboard follow lockX lockZ>
      <group>
        <group scale={[0.0055, -0.0055, 0.0055]} position={[0, 1, 0]}>
          {meshes.map((geometry, i) => (
            <mesh key={i} geometry={geometry} frustumCulled={false}>
              <meshBasicMaterial color="white" toneMapped={false} />
            </mesh>
          ))}
        </group>

        <Text
          position={[0.05, 0, 0]}
          fontSize={0.3}
          letterSpacing={0.48}
          color="white"
          anchorX="left"
          font="/Gilroy-Light.ttf"
        >
          NIGHT PROJECT
        </Text>

        <Text
          position={[2.55, -0.8, 0]}
          fontSize={0.2}
          letterSpacing={0.2}
          color="white"
          anchorX="left"
          font="/Gilroy-Light.ttf"
        >
          STAY TUNED
        </Text>
      </group>
    </Billboard>
  );
}
