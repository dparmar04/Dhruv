import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

const Circular = () => {
   const [fov, setFov] = useState(20); // Default FOV

   useEffect(() => {
      const updateFov = () => {
         const width = window.innerWidth;
         if (width < 640) {
            setFov(50); // Mobile view (small screens)
         } else if (width < 1024) {
            setFov(35); // Tablet view
         } else {
            setFov(20); // Desktop view
         }
      };

      updateFov(); // Set FOV on mount
      window.addEventListener('resize', updateFov); // Update FOV on resize

      return () => window.removeEventListener('resize', updateFov);
   }, []);

   return (
      <div className="w-full h-screen bg-black">
         <Canvas camera={{ fov }}>
            <ambientLight />
            <Scene />
         </Canvas>
      </div>
   );
};

export default Circular;
