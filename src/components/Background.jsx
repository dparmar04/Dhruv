import { Canvas, useThree } from '@react-three/fiber';
import BackScene from './BackScene';
import { Suspense, useEffect } from 'react';

const CameraAdjuster = () => {
  const { size, camera } = useThree();

  useEffect(() => {
    if (size.width < 768) {
      camera.position.set(2, 0, 10); // farther back for small screens
      camera.fov = 80;
    } else {
      camera.position.set(0, 0, 10); // default for larger screens
      camera.fov = 35;
    }
    camera.updateProjectionMatrix();
  }, [size, camera]);

  return null; // This component just adjusts the camera
};

const Background = () => {
  return (
    <Canvas
      camera={{ fov: 35, position: [0, 0, 10] }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Suspense fallback={null}>
        <ambientLight />
        <CameraAdjuster />
        <BackScene />
      </Suspense>
    </Canvas>
  );
};

export default Background;
