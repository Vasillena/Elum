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
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { RGBELoader, SVGLoader } from "three/examples/jsm/Addons.js";
import { useEffect, useMemo, useRef, useState } from "react";

import CavasText from "./Text";
import { useBreakpoints } from "../utils/useBreakpoints";
import { useMouse } from "../utils/useMouse";

export default function Canv() {
  const mouse = useMouse();
  const { down } = useBreakpoints();

  const isMobile = down("md");

  const modelX = isMobile ? 0 : -2;
  const modelY = isMobile ? -1 : 0;

  const textX = isMobile ? -2.1 : 1.5;
  const textY = isMobile ? 3.5 : 0;

  return (
    <div className="relative mx-auto w-full h-screen overflow-hidden">
      <Canvas
        className="absolute inset-0"
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: isMobile ? [0, 0.5, 7] : [-1.8, 0.5, 7],
        }}
        shadows
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <color attach="background" args={["#05080f"]} />

        {/* Lights */}
        <ambientLight intensity={1.5} color="#222233" />
        {/* <directionalLight position={[3, 3, 5]} intensity={2} /> */}
        <directionalLight position={[-3, 1, -5]} intensity={3} />

        {/* Scene */}
        {/* <ResponsiveGroup>
          <group position={[0, 0, 0]}>
            <group position={[-2, 0, 0]} rotation={[0, 0.3, 0]} scale={0.95}>
              <Ring />
              <Podium />
              <PodiumRing />
              <Model mouse={mouse} />
            </group>

            <group position={[1.5, 0, 0]}>
              <CavasText />
            </group>
          </group>
        </ResponsiveGroup> */}

        <ResponsiveGroup>
          <group position={[0, 0, 0]}>
            {/* MODEL */}
            <SmoothGroup
              targetPosition={[modelX, modelY, 0]}
              rotation={isMobile ? [0, 0, 0] : [0, 0.3, 0]}
              scale={0.95}
            >
              <Ring />
              <Podium />
              <PodiumRing />
              <Model mouse={mouse} />
            </SmoothGroup>

            {/* TEXT */}
            <SmoothGroup targetPosition={[textX, textY, 0]}>
              <CavasText />
            </SmoothGroup>
          </group>
        </ResponsiveGroup>

        <Environment
          files="/matcap-15.hdr"
          // background
          blur={1}
          environmentIntensity={0.7}
        />

        {/* Bloom glow */}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            radius={0.7}
          />
        </EffectComposer>

        {/* <ContactShadows
          position={[-1.2, -1.6, 0.3]}
          opacity={0.4}
          scale={3}
          blur={2.5}
          far={2}
        /> */}
      </Canvas>
    </div>
  );
}

function SmoothGroup({ targetPosition, children, ...props }: any) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.position.lerp(new THREE.Vector3(...targetPosition), 0.08);
  });

  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  );
}

function Model({ mouse }: any) {
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
      curveSegments: 34,
    });

    geo.center();
    geo.computeVertexNormals();

    return geo;
  }, [svgData]);

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
          resolution={1024}
          backside
        />
      </mesh>
    </group>
  );
}

function Ring() {
  return (
    <mesh position-z={-1} rotation={[Math.PI / 1, 0, 2.35]}>
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
    <mesh position={[0, -5.8, 0]} receiveShadow>
      <cylinderGeometry args={[2, 2, 8, 64]} />

      <meshPhysicalMaterial color="#050505" metalness={1} roughness={0} />
    </mesh>
  );
}

function PodiumRing() {
  return (
    <mesh position-y={-2.2} rotation-x={Math.PI / 2}>
      <torusGeometry args={[1.95, 0.06, 16, 100]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={2}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}

function ResponsiveGroup({ children }: any) {
  const { size } = useThree();
  const { down } = useBreakpoints();
  const [scale, setScale] = useState(1);

  const isMobile = down("md");

  useEffect(() => {
    const factor = size.width / (isMobile ? 900 : 1500);
    setScale(factor);
  }, [isMobile, size.width]);

  return <group scale={[scale, scale, scale]}>{children}</group>;
}

useGLTF.preload("/elum.glb");
