import * as THREE from "three";

import { Billboard, Text } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";

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

  if (!meshes.length) return null;

  //   const groupRef = useRef<THREE.Group>(null);
  //   const svgRef = useRef<THREE.Group>(null);

  // Центрираме SVG-то спрямо групата
  //   useEffect(() => {
  //     if (!svgRef.current) return;

  //     const box = new THREE.Box3().setFromObject(groupRef.current);
  //     const center = box.getCenter(new THREE.Vector3());
  //     groupRef.current.position.x -= center.x;
  //     groupRef.current.position.y -= center.y;
  //   }, [meshes]);

  return (
    <Billboard>
      <group>
        {/* SVG като mesh */}
        <group
          //   ref={svgRef}
          scale={[0.0055, -0.0055, 0.0055]}
          position={[0, 1, 0]}
        >
          {meshes.map((geometry, i) => (
            <mesh key={i} geometry={geometry}>
              {/* Чисто бяло, без светене */}
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
