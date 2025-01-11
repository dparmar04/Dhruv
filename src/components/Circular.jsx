import React from 'react'
import { OrbitControls } from '@react-three/drei';
import Scene from './Scene';
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber';

const Circular = () => {
   return (
      <div className='w-full h-screen bg-black'>
         <Canvas camera={{ fov: 20 }}>
            {/* <OrbitControls enableZoom={false} /> */}
            <ambientLight />
            <Scene />
            {/* <EffectComposer>
               <Bloom
                  mipmapBlur
                  intensity={6.5} // The bloom intensity.
                  luminanceThreshold={0.6}
                  // luminanceThreshold={0.36} // luminance threshold. Raise this value to mask out darker elements in the scene.
                  luminanceSmoothing={0.3} // smoothness of the luminance threshold. Range is [0, 1]
               />
               <ToneMapping adaptive />
            </EffectComposer> */}
         </Canvas>
      </div>
   )
}

export default Circular
