// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import * as THREE from "three";

// import { Bloom, EffectComposer } from "@react-three/postprocessing";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import {
//   ContactShadows,
//   Environment,
//   Lightformer,
//   MeshReflectorMaterial,
//   MeshTransmissionMaterial,
//   Text,
//   useGLTF,
//   useTexture,
//   useVideoTexture,
// } from "@react-three/drei";
// import { RGBELoader, SVGLoader } from "three/examples/jsm/Addons.js";
// import { Suspense, useEffect, useMemo, useRef } from "react";

// import { useMouse } from "../utils/useMouse";

// export default function HeroCanvasCopy() {
//   const mouse = useMouse();
//   // const videoRef = useRef<HTMLVideoElement>(null);

//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-[url(/bg-l.jpg)]">
//       {/* <video
//         ref={videoRef}
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//         src="/hero.mp4"
//       /> */}
//       <Canvas
//         className="absolute inset-0"
//         camera={{ position: [0, 0, 7], fov: 50 }}
//         gl={{ antialias: true }}
//         // onCreated={({ gl }) => {
//         //   gl.toneMapping = THREE.ACESFilmicToneMapping;
//         //   gl.toneMappingExposure = 1.6; // 🔥 ключово
//         // }}
//       >
//         {/* <mesh rotation={[-Math.PI / 8, 0, 0]}>
//           <planeGeometry args={[50, 50]} />
//           <MeshReflectorMaterial
//             blur={[300, 100]}
//             resolution={2048}
//             mixBlur={1}
//             mixStrength={80}
//             roughness={1}
//             depthScale={1.2}
//             minDepthThreshold={0.4}
//             maxDepthThreshold={1.4}
//             color="#050505"
//             metalness={0.5}
//           />
//         </mesh> */}

//         {/* 🌫 Background color */}
//         {/* <color attach="background" args={["#050505"]} /> */}

//         {/* <fog attach="fog" args={["#050508", 10, 40]} /> */}

//         {/* 🌌 LED RINGS */}
//         {/* <ClubBackground /> */}

//         {/* 💡 LIGHTING */}
//         {/* <ambientLight intensity={0.3} /> */}

//         {/* <directionalLight position={[5, 5, 5]} intensity={2} /> */}

//         {/* <Environment preset="studio" /> */}

//         {/* 🔥 Accent light */}
//         {/* <pointLight
//           position={[0, 2, 5]}
//           color="#00ffff"
//           intensity={10}
//           distance={50}
//         /> */}

//         {/* <ContactShadows
//           resolution={1024}
//           frames={1}
//           position={[0, -1.2, 0]}
//           scale={15}
//           blur={1}
//           opacity={0.7}
//           far={20}
//           /> */}

//         {/* <Environment files="/env-map.hdr" /> */}
//         {/* <Environment preset="night" blur={10} /> */}
//         {/* <Environment background={false}>
//           <Lightformer
//             intensity={0.05}
//             position={[0, 5, 5]}
//             scale={[30, 30, 30]}
//             color="blue"
//           />
//         </Environment> */}

//         {/* <MouseSpotlight /> */}

//         <BackgroundParallax mouse={mouse}>
//           {/* <GlowStrip /> */}
//           <Suspense fallback={null}>
//             <ELUMText />
//           </Suspense>
//         </BackgroundParallax>

//         {/* 🎛 LOGO */}
//         <Logo mouse={mouse} />

//         {/* ✨ BLOOM */}
//         <EffectComposer>
//           <Bloom
//             intensity={0.5}
//             luminanceThreshold={6}
//             luminanceSmoothing={8}
//           />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   );
// }

// // function GlowStrip() {
// //   return (
// //     <>
// //       <mesh position={[0, 2, -1.5]}>
// //         <planeGeometry args={[16, 0.1]} />{" "}
// //         {/* 12 единици дължина, 0.1 височина */}
// //         <meshStandardMaterial
// //           color="#ffffff"
// //           emissive="#003C8C"
// //           emissiveIntensity={3}
// //           toneMapped={false}
// //         />
// //       </mesh>
// //       <mesh position={[0, -2, -1.5]}>
// //         <planeGeometry args={[16, 0.1]} />{" "}
// //         {/* 12 единици дължина, 0.1 височина */}
// //         <meshStandardMaterial
// //           color="#ffffff"
// //           emissive="#003C8C"
// //           emissiveIntensity={8}
// //           toneMapped={false}
// //         />
// //       </mesh>
// //       <mesh position={[0, -3.5, -1.5]}>
// //         <planeGeometry args={[16, 0.1]} />{" "}
// //         {/* 12 единици дължина, 0.1 височина */}
// //         <meshStandardMaterial
// //           color="#ffffff"
// //           emissive="#003C8C"
// //           emissiveIntensity={8}
// //           toneMapped={false}
// //         />
// //       </mesh>
// //       <mesh position={[0, 3.5, -1.5]}>
// //         <planeGeometry args={[16, 0.1]} />{" "}
// //         {/* 12 единици дължина, 0.1 височина */}
// //         <meshStandardMaterial
// //           color="#ffffff"
// //           emissive="#003C8C"
// //           emissiveIntensity={8}
// //           toneMapped={false}
// //         />
// //       </mesh>
// //       {/* <mesh position={[7, 0, -2]}>
// //         <planeGeometry args={[0.1, 12]} />
// //         <meshStandardMaterial
// //           color="#ffffff"
// //           emissive="#ffffff"
// //           emissiveIntensity={1}
// //           toneMapped={false}
// //         />
// //       </mesh> */}
// //       {/* <mesh position={[-7, 0, -2]}>
// //         <planeGeometry args={[0.1, 12]} />
// //         <meshStandardMaterial
// //           color="#ffffff"
// //           emissive="#ffffff"
// //           emissiveIntensity={3}
// //           toneMapped={false}
// //         />
// //       </mesh> */}
// //     </>
// //   );
// // }

// /* ======================= */
// /* ===== LED RINGS ======= */
// /* ======================= */

// function Background() {
//   const texture = useLoader(THREE.TextureLoader, "/bg.jpg"); // пътя към картинката
//   return <primitive object={texture} attach="background" />;
// }

// function ClubBackground() {
//   const ringRefs = useRef<THREE.Mesh[]>([]);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();

//     ringRefs.current.forEach((ring, i) => {
//       if (!ring) return;

//       ring.rotation.y = t * 0.2 * (i % 2 === 0 ? 1 : -1);

//       const mat = ring.material as THREE.MeshStandardMaterial;
//       mat.emissiveIntensity = 10 + Math.sin(t + i) * 5;
//     });
//   });

//   return (
//     <>
//       {[...Array(5)].map((_, i) => (
//         <mesh
//           key={i}
//           ref={(el) => (ringRefs.current[i] = el!)}
//           rotation={[-Math.PI / 2, 0, 0]}
//           scale={[2 + i * 1.2, 2 + i * 1.2, 2 + i * 1.2]}
//         >
//           <ringGeometry args={[0.8 + i * 0.6, 1 + i * 0.6, 128]} />
//           <meshStandardMaterial
//             color="#00ffff"
//             emissive="#00ffff"
//             emissiveIntensity={12}
//             roughness={0.1}
//             metalness={0}
//             toneMapped={false} // 🔥 важно за glow
//             side={THREE.DoubleSide}
//           />
//         </mesh>
//       ))}
//     </>
//   );
// }

// function BackgroundParallax({ children, mouse }: any) {
//   const groupRef = useRef<THREE.Group>(null);

//   const target = useRef({ x: 0, y: 0 });
//   const current = useRef({ x: 0, y: 0 });
//   const lastMouse = useRef({ x: 0, y: 0 });

//   useFrame(() => {
//     if (!groupRef.current) return;

//     // изчисляваме скоростта на мишката
//     const dx = mouse.current.x - lastMouse.current.x;
//     const dy = mouse.current.y - lastMouse.current.y;

//     lastMouse.current.x = mouse.current.x;
//     lastMouse.current.y = mouse.current.y;

//     // добавяме сила (много по-малка от логото)
//     target.current.y += dx * 0.02;
//     target.current.x += -dy * 0.02;

//     // плавно доближаване
//     current.current.x += (target.current.x - current.current.x) * 0.06;
//     current.current.y += (target.current.y - current.current.y) * 0.06;

//     // връщане към центъра
//     target.current.x *= 0.93;
//     target.current.y *= 0.93;

//     groupRef.current.rotation.x = current.current.x;
//     groupRef.current.rotation.y = current.current.y;
//   });

//   return <group ref={groupRef}>{children}</group>;
// }

// function MouseSpotlight() {
//   const light = useRef<THREE.SpotLight>(null!);
//   const target = useRef<THREE.Object3D>(null!);

//   useFrame((state, delta) => {
//     if (!light.current || !target.current) return;

//     const x = state.pointer.x;
//     const y = state.pointer.y;

//     // движим светлината
//     light.current.position.lerp(new THREE.Vector3(x * 8, y * 4, 6), 0.15);

//     // target винаги гледа центъра
//     target.current.position.set(0, 0, 0);
//   });

//   return (
//     <>
//       <spotLight
//         ref={light}
//         angle={0.8}
//         penumbra={0.5}
//         intensity={2}
//         castShadow
//       />
//       <object3D ref={target} />
//     </>
//   );
// }

// // function ELUMText() {
// //   const data = useLoader(SVGLoader, "/elum-full-1.svg");
// //   const envMap = useLoader(RGBELoader, "/2355.hdr");
// //   envMap.mapping = THREE.EquirectangularReflectionMapping;

// //   const meshes = useMemo(() => {
// //     if (!data) return [];

// //     const tempGroup = new THREE.Group();

// //     const allMeshes = data.paths.flatMap((path) =>
// //       path.toShapes(true).map((shape) => {
// //         const geometry = new THREE.ShapeGeometry(shape);

// //         const material = new THREE.MeshStandardMaterial({
// //           color: "#00ffff", // основен цвят
// //           emissive: new THREE.Color("#ffffff"), // цвят на светене
// //           emissiveIntensity: 8, // сила на светене
// //           roughness: 0,
// //           metalness: 0.5,
// //           toneMapped: false, // 🔥 важно за Bloom да не се намалява
// //         });

// //         const mesh = new THREE.Mesh(geometry, material);
// //         tempGroup.add(mesh);
// //         return mesh;
// //       })
// //     );

// //     const box = new THREE.Box3().setFromObject(tempGroup);
// //     const center = box.getCenter(new THREE.Vector3());

// //     allMeshes.forEach((mesh) => {
// //       mesh.position.x -= center.x;
// //       mesh.position.y -= center.y;
// //     });

// //     return allMeshes;
// //   }, [data, envMap]);

// //   if (!meshes.length) return null;

// //   return (
// //     <group scale={[0.019, -0.019, 0.019]} position={[0, 0, -1.5]}>
// //       {meshes.map((mesh, i) => (
// //         <primitive object={mesh} key={i} />
// //       ))}
// //     </group>
// //   );
// // }

// function ELUMText() {
//   const data = useLoader(SVGLoader, "/elum-full-1.svg");
//   const envMap = useLoader(RGBELoader, "/env-map-1.hdr");
//   const backgroundTex = useLoader(THREE.TextureLoader, "/water.jpg");

//   envMap.mapping = THREE.EquirectangularReflectionMapping;

//   const meshes = useMemo(() => {
//     if (!data) return [];

//     return data.paths.flatMap((path) =>
//       path.toShapes(true).map((shape) => {
//         const geometry = new THREE.ShapeGeometry(shape);
//         return geometry;
//       })
//     );
//   }, [data]);

//   if (!meshes.length) return null;

//   // Създаваме група с всички mesh-ове
//   const groupRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     if (!groupRef.current) return;

//     const box = new THREE.Box3().setFromObject(groupRef.current);
//     const center = box.getCenter(new THREE.Vector3());
//     groupRef.current.position.x -= center.x;
//     groupRef.current.position.y -= center.y;
//     // Z остава непроменено
//   }, [meshes]);

//   return (
//     <group
//       ref={groupRef}
//       scale={[0.019, -0.019, 0.019]}
//       position={[0, 0, -1.5]}
//     >
//       {meshes.map((geometry, i) => (
//         <mesh key={i} geometry={geometry}>
//           <MeshTransmissionMaterial
//             transmission={1}
//             thickness={10}
//             roughness={0.08}
//             ior={1.45}
//             chromaticAberration={0.03}
//             anisotropy={0.8}
//             distortion={2}
//             distortionScale={3}
//             temporalDistortion={0.15}
//             resolution={1024}
//             backside
//             background={backgroundTex}
//           />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// function Logo({ mouse }: any) {
//   const groupRef = useRef<THREE.Group>(null);
//   const data = useLoader(SVGLoader, "/logo.svg"); // <-- смени с твоя SVG
//   const backgroundTex = useLoader(THREE.TextureLoader, "/sep09.jpg");

//   const geometries = useMemo(() => {
//     if (!data) return [];

//     return data.paths.flatMap((path) =>
//       path.toShapes(true).map((shape) => {
//         const geometry = new THREE.ExtrudeGeometry(shape, {
//           depth: 60,
//           bevelEnabled: true,
//           bevelThickness: 0.4,
//           bevelSize: 0.25,
//           bevelSegments: 8,
//           curveSegments: 32,
//         });

//         geometry.center();
//         geometry.computeVertexNormals();

//         return geometry;
//       })
//     );
//   }, [data]);

//   // mouse inertia logic
//   const target = useRef({ x: 0, y: 0 });
//   const current = useRef({ x: 0, y: 0 });
//   const lastMouse = useRef({ x: 0, y: 0 });

//   useFrame(() => {
//     if (!groupRef.current) return;

//     const dx = mouse.current.x - lastMouse.current.x;
//     const dy = mouse.current.y - lastMouse.current.y;

//     lastMouse.current.x = mouse.current.x;
//     lastMouse.current.y = mouse.current.y;

//     target.current.y += dx * 1;
//     target.current.x += -dy * 0.5;

//     current.current.x += (target.current.x - current.current.x) * 0.08;
//     current.current.y += (target.current.y - current.current.y) * 0.08;

//     target.current.x *= 0.95;
//     target.current.y *= 0.95;

//     groupRef.current.rotation.x = current.current.x;
//     groupRef.current.rotation.y = current.current.y;
//   });

//   if (!geometries.length) return null;

//   return (
//     <group ref={groupRef} scale={0.01} position={[0, 0, 0]}>
//       {geometries.map((geometry, i) => (
//         <mesh key={i} geometry={geometry}>
//           <MeshTransmissionMaterial
//             transmission={1}
//             thickness={10}
//             roughness={0.08}
//             ior={1.45}
//             chromaticAberration={0.03}
//             anisotropy={0.8}
//             distortion={8}
//             distortionScale={8}
//             temporalDistortion={0.15}
//             resolution={1024}
//             backside
//             background={new THREE.TextureLoader().load("/1053.jpg")}
//           />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// /* 🔥 preload */
// useGLTF.preload("/elum.glb");
