"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Plane from "../galaxy01/Plane";
import { useControls } from "leva";

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 6, 14], fov: 42 }}>
      <color attach="background" args={["#dbecfb"]} />
      <OrbitControls />
      <Plane />
    </Canvas>
  );
}
