// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import * as THREE from "three";

// import { Bloom, EffectComposer } from "@react-three/postprocessing";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   ContactShadows,
//   Environment,
//   Lightformer,
//   MeshReflectorMaterial,
//   MeshTransmissionMaterial,
//   useGLTF,
//   useVideoTexture,
// } from "@react-three/drei";
// import { useEffect, useMemo, useRef } from "react";

// import { useMouse } from "../utils/useMouse";

// export default function HeroCanvas() {
//   const mouse = useMouse();

//   return (
//     <div className="w-full h-screen bg-black">
//       <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
//         <ambientLight intensity={0.4} />
//         <directionalLight position={[5, 5, 5]} intensity={2} />

//         <Environment preset="city" />

//         {/* <Podium /> */}
//         <Logo mouse={mouse} />

//         {/* LED Rings */}
//         <Ring
//           radius={8}
//           tube={0.1}
//           speed={0.1}
//           tilt={[Math.PI / 2.5, 0, 0]}
//           // arc={Math.PI * -1.4}
//         />
//         <Ring
//           radius={3.2}
//           tube={0.08}
//           speed={-0.3}
//           tilt={[0, 0, Math.PI / 3]}
//           // arc={Math.PI * 1.5}
//         />
//         <Ring
//           radius={2.5}
//           tube={0.06}
//           speed={0.6}
//           tilt={[Math.PI / 4, 0, Math.PI / 6]}
//           // arc={Math.PI * 1.3}
//         />

//         <EffectComposer>
//           <Bloom
//             intensity={1.5}
//             luminanceThreshold={0.2}
//             luminanceSmoothing={0.9}
//           />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   );
// }

// type RingProps = {
//   radius: number;
//   tube: number;
//   speed: number;
//   tilt: [number, number, number];
//   arc?: number;
// };

// function Ring({ radius, tube, speed, tilt, arc }: RingProps) {
//   const group = useRef<THREE.Group>(null!);

//   useFrame((_, delta) => {
//     group.current.rotation.y += delta * speed;
//   });

//   const geometry = useMemo(
//     () => new THREE.TorusGeometry(radius, tube, 32, 200, arc),
//     [radius, tube, arc]
//   );

//   return (
//     <group ref={group} rotation={tilt}>
//       <mesh geometry={geometry}>
//         <meshStandardMaterial
//           color="#ffffff"
//           emissive="#ffffff"
//           emissiveIntensity={1}
//           toneMapped={false}
//         />
//       </mesh>
//     </group>
//   );
// }

// function Podium() {
//   return (
//     <mesh receiveShadow position={[0, -3, 0]}>
//       <cylinderGeometry args={[2, 2, 0.2, 64]} />
//       <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
//     </mesh>
//   );
// }

// function Logo({ mouse }: any) {
//   const groupRef = useRef<THREE.Group>(null);
//   const { scene } = useGLTF("/elum.glb");

//   useFrame(() => {
//     if (!groupRef.current) return;

//     groupRef.current.rotation.y +=
//       (mouse.current.x * 0.5 - groupRef.current.rotation.y) * 0.05;

//     groupRef.current.rotation.x +=
//       (-mouse.current.y * 0.25 - groupRef.current.rotation.x) * 0.05;
//   });

//   return (
//     <group ref={groupRef} scale={32}>
//       {scene.children.map((child: any, i: number) =>
//         child.isMesh ? (
//           <mesh key={i} geometry={child.geometry}>
//             <MeshTransmissionMaterial
//               transmission={1}
//               thickness={10}
//               roughness={0.08}
//               ior={1.45}
//               chromaticAberration={0.03}
//               anisotropy={0.8}
//               distortion={1}
//               distortionScale={1}
//               temporalDistortion={0.15}
//               resolution={1024}
//               backside
//             />
//           </mesh>
//         ) : null
//       )}
//     </group>
//   );
// }

// /* 🔥 preload */
// useGLTF.preload("/elum.glb");
