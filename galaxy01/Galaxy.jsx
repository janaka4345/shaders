import { useControls } from "leva";
import { useMemo } from "react";
import { AdditiveBlending } from "three";
import { useControls } from "leva";
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
  });

  const positions = useMemo(() => {
    // console.log("hi");
    const position = new Float32Array(parameters.count * 3);
    for (let index = 0; index < parameters.count; index++) {
      position[index * 3 + 0] = (Math.random() - 0.5) * parameters.radius;
      position[index * 3 + 1] = 0;
      position[index * 3 + 2] = 0;
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
