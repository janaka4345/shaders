"use client";
import { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
// import Plane from "../galaxy01/Plane";

import Galaxy from "../galaxy01/Galaxy";
import { useControls } from "leva";
import { Stars } from "@react-three/drei";
extend({ Stars });

export default function Home() {
  let spiralStars = [];
  useEffect(() => {
    for (let i = 0; i < 5000; i++) {
      const angle = i * 0.1;
      const radius = i * 0.01;
      const height = i * 0.01;

      const x = radius * Math.cos(angle);
      const y = 0;
      const z = radius * Math.sin(angle);

      spiralStars.push([x, y, z]);
      console.log(spiralStars);
    }
  }, []);
  return (
    <Canvas camera={{ position: [0, 6, 14], fov: 42 }}>
      <color attach="background" args={["#000000"]} />
      <OrbitControls />
      {/* <Plane /> */}
      <Galaxy />
    </Canvas>
  );
}
