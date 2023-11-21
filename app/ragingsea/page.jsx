"use client";
import { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import Sea from "../../sea/Sea";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <Leva />
      <Canvas camera={{ position: [0, 6, 5], fov: 30 }}>
        <color attach="background" args={["#000000"]} />
        <OrbitControls />
        <Sea />
      </Canvas>
    </>
  );
}
