/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const BackScene = () => {
  const flower = useRef(null);
  const ring1 = useRef(null);
  const ring2 = useRef(null);
  const time = useRef(0);

  // Load environment map for reflections
  const envMap = useLoader(THREE.TextureLoader, '/diamond.jpg');
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  useFrame((state, delta) => {
    // Simplified rotation updates for ring1
    ring1.current.rotation.x += delta * 0.2;
    ring1.current.rotation.y += delta * 0.15;

    // Simplified rotation updates for ring2
    ring2.current.rotation.x += delta * 0.2;
    ring2.current.rotation.y += delta * 0.15;

    flower.current.rotation.x = Math.sin(time.current) * 0.05;
    flower.current.rotation.y = time.current * 0.25;
    time.current += delta;
    // Update time

  });

  const Diamond = forwardRef(({ position, rotation, size }, ref) => {
    return (
      <mesh ref={ref} position={position} rotation={rotation}>
        <octahedronGeometry args={size} />
        <meshPhysicalMaterial
          metalness={1}
          roughness={0.1}
          envMap={envMap}
          clearcoat={1}
          transmission={0.95}
        />
      </mesh>
    );
  });
  Diamond.displayName = 'Diamond';

  const Triangle = forwardRef(({ position, rotation, size }, ref) => {
    return (
      <mesh ref={ref} position={position} rotation={rotation}>
        <torusGeometry args={size} />
        <meshPhysicalMaterial
          metalness={1}
          roughness={0.2}
          envMap={envMap}
        />
      </mesh>
    );
  });
  Triangle.displayName = 'Triangle';

  const Circle = forwardRef(({ position, rotation, size }, ref) => {
    return (
      <mesh ref={ref} position={position} rotation={rotation}>
        <torusGeometry args={size} />
        <meshPhysicalMaterial
          metalness={1}
          roughness={0.1}
          envMap={envMap}
        />
      </mesh>
    );
  });
  Circle.displayName = 'Circle';

  return (
    <group>
      <Diamond ref={flower} position={[1, 1.5, 1]} rotation={[-6.2, 5.3, -4.5]} size={[1, 0]} />

      <Triangle ref={ring1} position={[3, 0, 3]} rotation={[Math.PI / 4, 0, 0]} size={[1, 0.2, 8, 3]} />

      <Circle ref={ring2} position={[-5, 2, -1]} rotation={[Math.PI / 1, 5, 1]} size={[1, 0.2, 8, 48]} />
    </group >

  );
};

export default BackScene;
