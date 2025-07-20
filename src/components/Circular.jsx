import { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Scene from './Scene';


const CameraAdjuster = () => {
  const { size, camera } = useThree();

  useEffect(() => {
    if (size.width < 768) {
      camera.fov = 30;
    } else {
      camera.fov = 20;
    }
    camera.updateProjectionMatrix();
  }, [size, camera]);

  return null; // This component just adjusts the camera
};

const Circular = () => {
  return (
    <div className="w-full h-[50vh] md:h-screen bg-transparent transition-colors duration-500">
      <Canvas camera={{ fov: 35 }}>
        <ambientLight />
        <CameraAdjuster />
        <Scene />
      </Canvas>
    </div>
  );
};

export default Circular;
