import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'
import * as THREE from 'three';

const Scene = () => {
   let tex = useTexture("./image1.png");
   let cyl = useRef(null);

   useFrame(() => {
      if (cyl.current) {
         // Simple constant rotation
         cyl.current.rotation.y += 0.005; // Very slow constant rotation
      }
   });

   tex.wrapS = THREE.RepeatWrapping;

   return (
      <group rotation={[-0.3, 1.3, 0.5]}>
         <mesh ref={cyl}>
            <cylinderGeometry args={[1, 1, 1.2, 80, 80, true]} />
            <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
         </mesh>
      </group>
   );
};

export default Scene