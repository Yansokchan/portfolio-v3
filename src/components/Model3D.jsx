import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Model3D({ modelPath }) {
  const modelRef = useRef();
  const { scene } = useGLTF(modelPath);

  useFrame((state, delta) => {
    modelRef.current.rotation.y += delta * 0.5;
  });

  return (
    <primitive ref={modelRef} object={scene} scale={1} position={[0, 0, 0]} />
  );
}
