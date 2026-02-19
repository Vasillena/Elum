/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as THREE from "three";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import {
  CameraControls,
  ContactShadows,
  CubeCamera,
  Environment,
  Float,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  PresentationControls,
  SoftShadows,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import CavasText from "./Text";
import Image from "next/image";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import Text from "./Text";
import { easing } from "maath";
import logoFull from "@/public/elum-full.svg";
import { useMouse } from "../utils/useMouse";
import { useRef } from "react";

export default function Canv() {
  const mouse = useMouse();

  return (
    <div className="relative mx-auto w-full h-screen overflow-hidden">
      <Canvas
        className="absolute inset-0"
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [-1.8, 0.5, 7],
        }}
        shadows
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <color attach="background" args={["#05080f"]} />

        {/* Lights */}
        <ambientLight intensity={1.5} color="#222233" />
        <directionalLight position={[3, 3, 5]} intensity={2} />
        <directionalLight position={[-3, 1, -5]} intensity={3} />

        {/* Scene */}

        <group position={[0, 0, 0]}>
          <group position={[-1.2, 0, 0]} rotation={[0, 0.3, 0]} scale={0.95}>
            <Ring />
            <Podium />
            <PodiumRing />
            {/* <PresentationControls
              global
              rotation={[0.13, 0.1, 0]}
              polar={[-0.4, 0.2]}
              azimuth={[-1, 0.75]}
              config={{ mass: 2, tension: 400 }}
              snap
            > */}
            {/* <Float rotationIntensity={0.2}> */}
            <Model mouse={mouse} />
            {/* </Float> */}
            {/* </PresentationControls> */}
          </group>

          <group position={[1.5, 0, 0]}>
            <CavasText />
          </group>
        </group>

        {/* HDR reflections */}
        {/* <Environment preset="studio" environmentIntensity={0.04} /> */}
        <Environment preset="warehouse" environmentIntensity={0.6} />

        {/* Bloom glow */}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            radius={0.7}
          />
        </EffectComposer>

        <ContactShadows
          position={[-1.2, -1.7, 0.3]} // под подиума
          opacity={0.4}
          scale={3} // голям скейл за 32x модела
          blur={3}
        />
      </Canvas>
    </div>
  );
}

function Model({ mouse }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/elum.glb");

  // rotation state
  const target = useRef(0);
  const current = useRef(0);
  const lastMouse = useRef(0);

  const baseY = 0.4;

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // ===== Mouse velocity rotation =====
    const dx = mouse.current.x - lastMouse.current;
    lastMouse.current = mouse.current.x;

    target.current += dx * 1.5;

    current.current += (target.current - current.current) * 0.08;

    // плавно връщане към центъра
    target.current *= 0.95;

    groupRef.current.rotation.y = current.current;

    // ===== Stable floating (no drift) =====
    groupRef.current.position.y = baseY + Math.sin(time * 1.2) * 0.08;
  });

  return (
    <group ref={groupRef} position={[-0.5, baseY, 0.8]} scale={32}>
      {scene.children.map((child: any, i: number) =>
        child.isMesh ? (
          <mesh key={i} geometry={child.geometry} castShadow>
            <MeshTransmissionMaterial
              transmission={1}
              thickness={10}
              roughness={0.02}
              ior={1.45}
              chromaticAberration={0.03}
              anisotropy={0.8}
              distortion={1}
              distortionScale={2}
              temporalDistortion={0.1}
              resolution={1024}
              backside
              background={new THREE.TextureLoader().load("/matcap-1.png")}
            />
          </mesh>
        ) : null
      )}
    </group>
  );
}

function Ring() {
  return (
    <mesh position-z={-1} rotation={[Math.PI / 1, 0, 2.35]}>
      {/* <torusGeometry args={[2.8, 0.05, 32, 200, Math.PI * 1.5]} /> */}
      <torusGeometry args={[3, 0.05, 32, 200]} />

      <meshBasicMaterial color="white" />
    </mesh>
  );
}

function Podium() {
  const hdr = useLoader(RGBELoader, "/metal.hdr");

  const envMap = hdr.clone();
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  return (
    <mesh
      position={[0, -2.8, 0]}
      receiveShadow
      //   rotation={[-Math.PI / 2, 0, 0]}
      //   scale={[1.4, 1, 1]}
    >
      <cylinderGeometry args={[2, 2, 2, 64]} />

      <meshPhysicalMaterial
        color="#050505"
        metalness={1}
        roughness={0}
        // envMap={hdr} // 🔥 само тук
        // envMapIntensity={0.5}
      />
    </mesh>
  );
}

function PodiumRing() {
  return (
    <mesh position-y={-2.2} rotation-x={Math.PI / 2}>
      {/* Малък torus, прилепнал към подиума */}
      <torusGeometry args={[1.95, 0.06, 16, 100]} />
      <meshStandardMaterial
        color="#ffffff" // цвят на LED
        emissive="#ffffff" // самосветещ
        emissiveIntensity={2} // сила на светене
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}

// function Podium() {
//   return (
//     <CubeCamera resolution={256} frames={Infinity}>
//       {(texture) => (
//         <mesh position={[0, -3, 0]}>
//           <cylinderGeometry args={[2, 2, 2, 64]} />
//           <meshPhysicalMaterial envMap={texture} metalness={1} roughness={0} />
//         </mesh>
//       )}
//     </CubeCamera>
//   );
// }

useGLTF.preload("/elum.glb");
