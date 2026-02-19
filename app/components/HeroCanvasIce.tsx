// "use client";

// import * as THREE from "three";

// import { Bloom, EffectComposer } from "@react-three/postprocessing";
// import { Canvas, useFrame } from "@react-three/fiber";

// import { useRef } from "react";

// function Logo() {
//   const ref = useRef<THREE.Mesh>(null!);

//   useFrame((state) => {
//     const t = state.clock.getElapsedTime();
//     ref.current.rotation.y = t * 0.4;
//   });

//   return (
//     <mesh ref={ref}>
//       {/* сложи тук твоя GLB */}
//       <torusKnotGeometry args={[1, 0.3, 200, 32]} />
//       <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.1} />
//     </mesh>
//   );
// }

// function GlowStrip() {
//   return (
//     <>
//       <mesh position={[0, 0, -3]}>
//         <planeGeometry args={[0.2, 10]} />
//         <meshBasicMaterial color="#ffffff" toneMapped={false} />
//       </mesh>
//       {/* <mesh position={[2, 0, -3]}>
//         <planeGeometry args={[0.2, 10]} />
//         <meshBasicMaterial color="#ffffff" toneMapped={false} />
//       </mesh>
//       <mesh position={[-2, 0, -3]}>
//         <planeGeometry args={[0.2, 10]} />
//         <meshBasicMaterial color="#ffffff" toneMapped={false} />
//       </mesh> */}
//     </>
//   );
// }

// function CameraDrift() {
//   useFrame((state) => {
//     const t = state.clock.getElapsedTime();
//     state.camera.position.x = Math.sin(t * 0.2) * 0.4;
//     state.camera.lookAt(0, 0, 0);
//   });
//   return null;
// }

// export default function HeroMonolithScene() {
//   return (
//     <div className="w-full h-screen bg-black">
//       <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
//         <color attach="background" args={["#000000"]} />
//         <fog attach="fog" args={["#000000", 8, 20]} />

//         {/* основна светлина */}
//         <directionalLight
//           position={[3, 5, 5]}
//           intensity={1.2}
//           color="#ffffff"
//         />

//         {/* rim light */}
//         <pointLight position={[-3, 2, -2]} intensity={2} color="#ffffff" />

//         <GlowStrip />
//         <Logo />

//         <EffectComposer>
//           <Bloom
//             intensity={1.2}
//             luminanceThreshold={0}
//             luminanceSmoothing={0.9}
//           />
//         </EffectComposer>

//         <CameraDrift />
//       </Canvas>
//     </div>
//   );
// }
