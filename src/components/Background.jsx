import React from 'react';
import { Canvas } from '@react-three/fiber';
// import './styles.css'
import { OrbitControls } from '@react-three/drei';
import BackScene from './BackScene';
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing';


const Background = () => {
   return (
      <Canvas camera={{ fov: 25, position: [0, 0, 10] }}>
         <ambientLight intensity={1.5} />
         <BackScene />
         {/* <EffectComposer>
            <Bloom
               mipmapBlur
               intensity={1.5} // Increased bloom intensity
               luminanceThreshold={0.5} // Lowered threshold to catch more light
               luminanceSmoothing={0.2}
            />
         </EffectComposer> */}
      </Canvas>
   )
}

export default Background



// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import BackScene from './BackScene';
// import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing';

// const Background = () => {
//    return (
//       <Canvas
//          camera={{ fov: 25, position: [0, 0, 10] }}
//          performance={{ min: 0.5, max: 1 }} // Minimize canvas resolution to reduce GPU usage
//          frameloop="demand" // Only render when necessary
//          dpr={[1, 2]} // Adjust device pixel ratio for lower resolution rendering on some devices
//       >
//          {/* Avoid orbit controls unless interaction is needed */}
//          {/* <OrbitControls enableZoom={false} /> */}

//          {/* Ambient lighting - avoid too many light sources */}
//          <ambientLight intensity={1.5} />
//          <pointLight position={[10, 20, 30]} intensity={3} />
//          <pointLight position={[-10, -10, -10]} intensity={1.5} />

//          {/* Spotlight for the crystal */}
//          <spotLight
//             position={[2, 5, 5]}
//             intensity={4}
//             angle={0.5}
//             penumbra={1}
//             target-position={[2, 0, 3]}
//          />

//          {/* BackScene: this component could be optimized by lowering geometry complexity or adding LOD */}
//          <BackScene />

//          {/* Post-processing effects */}
//          <EffectComposer>
//             <Bloom
//                mipmapBlur
//                intensity={1.5} // Reduce intensity for performance
//                luminanceThreshold={0.5}
//                luminanceSmoothing={0.2}
//             />
//             <ToneMapping
//                adaptive
//                luminanceAveraging={0.7}
//                toneMapping={3}
//             />
//          </EffectComposer>
//       </Canvas>
//    );
// };

// export default Background;
