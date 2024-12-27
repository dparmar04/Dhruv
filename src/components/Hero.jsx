import Background from './Background.jsx';

const Hero = () => {
   return (
      <div className='w-full relative h-screen flex flex-row bg-black'>
         <div className='greeting w-full text-white h-screen font-bold flex flex-col items-start justify-center text-left pl-28 z-10 '>
            <h1 className='text-9xl'>
               Hi,I'm Dhruv
            </h1>
            <p className='text-5xl uppercase my-3'>Front-end Developer</p>
         </div>
         <div className='w-full h-full absolute top-0 left-0'>
            <Background />
         </div>
      </div>
   )
}

export default Hero