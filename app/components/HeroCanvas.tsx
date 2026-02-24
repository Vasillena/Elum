"use client";

import * as THREE from "three";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Environment, SpotLight, useGLTF } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import CavasText from "./Text";
import LogoModel from "./Model/LogoModel";
import Podium from "./Model/Podium";
import PodiumRing from "./Model/PodiumRing";
import ResponsiveGroup from "./Model/ResponsiveGroup";
import Ring from "./Model/RingModel";
import SmoothGroupPosition from "./Model/SmoothGroupPosition";
import { useBreakpoints } from "../utils/useBreakpoints";
import { useMouse } from "../utils/useMouse";

export default function HeroCanvas() {
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
        dpr={[1, 1.5]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
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
        {/* <directionalLight position={[-3, 1, -5]} intensity={1.5} /> */}
        <directionalLight
          position={[1, 6, 1]}
          intensity={20}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={50}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <SpotLight
          position={[6.5, 3.28, 0]}
          distance={280}
          angle={10}
          attenuation={6}
          anglePower={10}
        />

        <ResponsiveGroup>
          <group position={[0, 0, 0]}>
            {/* MODEL */}
            <SmoothGroupPosition
              targetPosition={[modelX, modelY, 0]}
              rotation={isMobile ? [0, 0, 0] : [0, 0.3, 0]}
              scale={0.95}
            >
              <Ring />
              <Podium />
              <PodiumRing />
              <LogoModel mouse={mouse} />
            </SmoothGroupPosition>

            {/* TEXT */}
            <SmoothGroupPosition targetPosition={[textX, textY, 0]}>
              <CavasText />
            </SmoothGroupPosition>
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
          position={[0, 5.8, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
          far={10}
        /> */}
      </Canvas>
    </div>
  );
}

useGLTF.preload("/elum.glb");
