import { extend, useFrame } from "@react-three/fiber";
import { Color, DoubleSide } from "three";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

export default function Sea() {
  const seaShaderRef = useRef();
  const parameters = useControls("sea", {
    elevation: {
      value: 0.02,
      min: 0.0,
      max: 1.0,
      step: 0.001,
    },
    freq: {
      value: { x: 4, y: 1.5 },
      step: 0.1,
      joystick: "invertY",
    },
  });

  const SeaShaderMaterial = shaderMaterial(
    {
      uTime: 0,
      uBigWaveElevation: parameters.elevation,
      uBigWaveFreq: parameters.freq,
    },
    // vertex shader
    /*glsl*/ `
        varying vec2 vUv;
        uniform float uBigWaveElevation;
        uniform vec2 uBigWaveFreq;
        uniform float uTime;
        void main() {
          vec4 modelPosition=modelMatrix*vec4(position,1.0);

          float elevation=sin(modelPosition.x*uBigWaveFreq.x+uTime)*
                            sin(modelPosition.z*uBigWaveFreq.y+uTime)*
                            uBigWaveElevation;
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
  useFrame((status, delta) => {
    seaShaderRef.current.uTime = status.clock.getElapsedTime();
  });

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[2, 2, 128, 128]} />
      <seaShaderMaterial
        ref={seaShaderRef}
        side={DoubleSide}
        uBigWaveElevation={parameters.elevation}
        uBigWaveFreq={parameters.freq}
      />
    </mesh>
  );
}
