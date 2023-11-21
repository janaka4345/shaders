import { extend } from "@react-three/fiber";
import { Color, DoubleSide } from "three";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";

export default function Sea() {
  const parameters = useControls("sea", {
    elevation: {
      value: 0.02,
      min: 0.0,
      max: 1.0,
      step: 0.001,
    },
  });

  const SeaShaderMaterial = shaderMaterial(
    { time: 0, uBigWaveElevation: parameters.elevation },
    // vertex shader
    /*glsl*/ `
        varying vec2 vUv;
        uniform float uBigWaveElevation;
        void main() {
          vec4 modelPosition=modelMatrix*vec4(position,1.0);

          float elevation=sin(modelPosition.x*4.0)*
                            sin(modelPosition.z*1.5)*
                            0.2;
          modelPosition.y+=elevation;
  
  
          vec4 viewPosition=viewMatrix*modelPosition;
          vec4 projectedPosition=projectionMatrix*viewPosition;
          vUv = uv;
          
          // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position=projectedPosition;
        }
      `,
    // fragment shader
    /*glsl*/ `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          // gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
          gl_FragColor=vec4(0.5,0.8,1.0,1.0);
        }
      `,
  );

  // declaratively
  extend({ SeaShaderMaterial });

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[2, 2, 128, 128]} />
      <seaShaderMaterial side={DoubleSide} />
    </mesh>
  );
}
