import { useControls } from "leva";
export default function Plane() {
  const props = useControls("plane", {
    x: {
      value: 4,
      min: 0,
      max: 10,
      step: 1,
    },
    y: {
      value: 4,
      min: 0,
      max: 10,
      step: 1,
    },
    z: {
      value: 4,
      min: 0,
      max: 10,
      step: 1,
    },
  });
  return (
    <mesh>
      <planeGeometry rotation={[props.x, props.y, props.z]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
}
