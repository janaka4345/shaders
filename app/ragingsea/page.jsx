"use client";
import { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import Sea from "../../sea/Sea";

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 6, 5], fov: 30 }}>
      <color attach="background" args={["#000000"]} />
      <OrbitControls />
      <Sea />
    </Canvas>
  );
}
