import { useRef } from 'react';
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
      // Avoid unnecessary updates by reducing random movement speed and complexity
      const movementSpeed = 0.01;

      // Random roaming for ring1 (simplified and reduced)
      ring1.current.position.x += Math.sin(state.clock.elapsedTime) * movementSpeed;
      ring1.current.position.y += Math.cos(state.clock.elapsedTime * 0.5) * movementSpeed;
      ring1.current.position.z += Math.sin(state.clock.elapsedTime * 0.7) * movementSpeed;

      // Simplified rotation updates for ring1
      ring1.current.rotation.x += delta * 0.2;
      ring1.current.rotation.y += delta * 0.15;

      // Random roaming for ring2 (simplified and reduced)
      ring2.current.position.x += Math.sin(state.clock.elapsedTime) * movementSpeed;
      ring2.current.position.y += Math.cos(state.clock.elapsedTime * 0.7) * movementSpeed;
      ring2.current.position.z += Math.sin(state.clock.elapsedTime * 0.5) * movementSpeed;

      // Simplified rotation updates for ring2
      ring2.current.rotation.x += delta * 0.2;
      ring2.current.rotation.y += delta * 0.15;

      // Update time
      time.current += delta;

      // Only flower (crystal) moves with mouse
      if (flower.current) {
         flower.current.rotation.x = Math.sin(time.current) * 0.05; // Reduced rotation speed for performance
         flower.current.rotation.y = time.current * 0.25; // Reduced speed for smoother movement
      }

      // Rings have fixed rotation but reduced movement
      if (ring1.current) {
         ring1.current.rotation.x = Math.cos(time.current) * 0.1; // Reduced rotation intensity
         ring1.current.rotation.y = time.current * 0.25; // Adjusted speed for performance
      }

      if (ring2.current) {
         ring2.current.rotation.x = Math.sin(time.current * 0.3) * 0.1; // Reduced intensity for rotation
         ring2.current.rotation.y = time.current * 0.25; // Adjusted speed for performance
      }
   });

   return (
      <group>
         {/* Diamond structure */}
         <mesh ref={flower} position={[2, 0, 3]} rotation={[-6.2, 5.3, -4.5]}>
            <octahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
               color="#ffffff"
               metalness={0.9}
               roughness={0.1}
               envMap={envMap}
               clearcoat={1}
               clearcoatRoughness={0.05}
               transmission={0.95}
               thickness={0.5}
               ior={2.4}
               reflectivity={1}
            />
         </mesh>

         {/* Ring structures */}
         <mesh ref={ring1} position={[-1.5, 2.5, -10]} rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1, 0.2, 8, 64]} /> {/* Reduced segments for performance */}
            <meshPhysicalMaterial
               color="#c0c0c0"
               metalness={1}
               roughness={0.2}
               envMap={envMap}
            />
         </mesh>

         <mesh ref={ring2} position={[-5, 0, -1]} rotation={[Math.PI / 1, 5, 1]}>
            <torusGeometry args={[1, 0.2, 8, 48]} /> {/* Reduced segments for performance */}
            <meshPhysicalMaterial
               color="#c0c0c0"
               metalness={1}
               roughness={0.1}
               envMap={envMap}
            />
         </mesh>
      </group>
   );
};

export default BackScene;
