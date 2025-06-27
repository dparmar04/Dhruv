/* eslint-disable react/no-unknown-property */
import { useTexture, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react'
import * as THREE from 'three';

const Scene = () => {
  let tex = useTexture("./Group2.png");
  let cyl = useRef(null);

  useFrame(() => {
    if (cyl.current) {
      // Simple constant rotation
      cyl.current.rotation.y += 0.005; // Very slow constant rotation
    }
  });

  tex.wrapS = THREE.RepeatWrapping;

  return (
    <>
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        enableZoom={false}
        enableRotate={true} // Allow rotating the scene
        enablePan={false} // Disable panning (optional)
        maxPolarAngle={Math.PI / 2} // Restrict vertical movement (optional if zoom is needed)
        minPolarAngle={Math.PI / 2} // Prevent vertical movement (lock to horizontal)
      />
      <group position={[0, 0.1, 0]} rotation={[-0.3, 1.3, 0.5]}>
        <mesh ref={cyl}>
          <cylinderGeometry args={[1, 1, 1.2, 80, 80, true]} />
          <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
};

export default Scene