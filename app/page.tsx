"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import Plane from "../galaxy01/Plane";

import Galaxy from "../galaxy01/Galaxy";
import { useControls } from "leva";
import { Stars } from "@react-three/drei";

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 6, 14], fov: 42 }}>
      <color attach="background" args={["#000000"]} />
      <OrbitControls />
      {/* <Plane /> */}
      <Galaxy />
      {/* <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      /> */}
    </Canvas>
  );
}
