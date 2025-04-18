import { Canvas } from '@react-three/fiber';
// import './styles.css'
import BackScene from './BackScene';
import { Suspense } from "react";

const Background = () => {
  return (
    <Canvas camera={{ fov: 35, position: [0, 0, 10] }}>
      <Suspense fallback={null}>
        <ambientLight />
        <BackScene />
        {/* <EffectComposer>
            <Bloom
               mipmapBlur
               intensity={1.5} // Increased bloom intensity
               luminanceThreshold={0.5} // Lowered threshold to catch more light
               luminanceSmoothing={0.2}
            />
         </EffectComposer> */}
      </Suspense>
    </Canvas>
  )
}

export default Background