import { useControls } from "leva";
import { useMemo } from "react";
import { AdditiveBlending } from "three";
import { useControls } from "leva";

import { extend } from "@react-three/fiber";

import { Stars } from "@react-three/drei";
extend({ Stars });
export default function Galaxy() {
  const parameters = useControls("galaxy", {
    count: {
      value: 1000,
      min: 100,
      max: 1000,
      step: 10,
    },
    size: {
      value: 0.02,
      min: 0,
      max: 1,
      step: 0.001,
    },
    radius: {
      value: 2,
      min: 0,
      max: 20,
      step: 0.1,
    },
    branches: { value: 5, min: 0, max: 20, step: 0.1 },
    spin: { value: 1 },
    randomness: { value: 0.2 },
    randomnessPower: { value: 3 },
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  });

  const positions = useMemo(() => {
    // console.log("hi");
    const position = new Float32Array(parameters.count * 3);
    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      const radius = Math.random() * parameters.radius;

      const spinAngle = radius * parameters.spin;
      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      position[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      position[i3 + 1] = randomY;
      position[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    }
    return position;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={parameters.count}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial
        size={parameters.size}
        sizeAttenuation={true}
        depthWright={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
