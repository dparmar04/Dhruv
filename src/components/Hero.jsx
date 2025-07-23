// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import { useEffect, useRef, useState, Suspense } from 'react';

// import { useProgress } from '@react-three/drei';
// import gsap from 'gsap';
// import Loader from './Loader.jsx';
// import Background from './Background.jsx';
// import Navbar from './Navbar.jsx';
// import '../styles.css';


// const Hero = ({ disabled = "false", className = "" }) => {
//   const animationDuration = "1s"
//   const headingRef = useRef(null);
//   const subHeadingRef = useRef(null);


//   const MIN_LOADER_TIME = 3000; // minimum time loader should stay
//   const { progress } = useProgress();
//   const [showLoader, setShowLoader] = useState(true); // show loader initially
//   const [isLoaded, setIsLoaded] = useState(false); // content show flag
//   const [minTimeDone, setMinTimeDone] = useState(false); // flag for minimum time
//   const [sceneReady, setSceneReady] = useState(false); // flag for 3D scene loaded

//   const finishLoading = () => {
//     setShowLoader(false);     // Hide loader
//     setIsLoaded(true);        // Show main content
//     sessionStorage.setItem('portfolioLoaded', 'true');
//   };

//   // Trigger minimum 2s wait
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setMinTimeDone(true);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (minTimeDone && sceneReady) {
//       // If 3D scene finished loading...
//       const checkIfMinTimePassed = setTimeout(() => {
//         finishLoading();
//       }, 1500);

//       return () => clearTimeout(checkIfMinTimePassed);
//     }
//   }, [minTimeDone, sceneReady]);

//   useEffect(() => {
//     if (progress === 100) {
//       setSceneReady(true); // 3D is loaded
//     }
//   }, [progress]);

//   // This function is called by the Loader component when its animation finishes.
//   const handleLoadingComplete = () => {
//     finishLoading();
//     setShowLoader(false); // Hide the loader component
//     setIsLoaded(true);    // Indicate that the main content can now be displayed and animated
//     sessionStorage.setItem('portfolioLoaded', 'true'); // Mark as loaded for the current session
//   };

//   // Effect for GSAP animations, which should only run once isLoaded is true.
//   useEffect(() => {
//     // Only run GSAP animations if the content is marked as loaded
//     if (!isLoaded) return;

//     // Create timeline for sequenced animations
//     const tl = gsap.timeline();

//     // Get heading text and create spans for each character for individual animation
//     const headingText = "Hi, I'm Dhruv";
//     if (headingRef.current) { // Ensure ref is not null
//       headingRef.current.innerHTML = ''; // Clear existing content
//       const headingChars = headingText.split('').map(char => {
//         const span = document.createElement('span');
//         span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
//         span.style.display = 'inline-block'; // Essential for individual character animation
//         headingRef.current.appendChild(span);
//         return span;
//       });

//       // Animate heading characters
//       tl.fromTo(headingChars, {
//         opacity: 0,
//         filter: 'blur(20px)',
//         y: 100,
//         rotateX: -90
//       }, {
//         opacity: 1,
//         filter: 'blur(0px)',
//         y: 0,
//         rotateX: 0,
//         duration: 1.2,
//         stagger: 0.08,
//         ease: "back.out(1.7)"
//       });
//     }


//     // Get subheading text and create spans for each character
//     const subHeadingText = "Front-end Developer";
//     if (subHeadingRef.current) { // Ensure ref is not null
//       subHeadingRef.current.innerHTML = '';
//       const subHeadingChars = subHeadingText.split('').map(char => {
//         const span = document.createElement('span');
//         span.textContent = char === ' ' ? '\u00A0' : char;
//         span.style.display = 'inline-block';
//         subHeadingRef.current.appendChild(span);
//         return span;
//       });

//       // Animate subheading characters
//       tl.fromTo(subHeadingChars, {
//         opacity: 0,
//         filter: 'blur(20px)',
//         y: 50
//       }, {
//         opacity: 1,
//         filter: 'blur(0px)',
//         y: 0,
//         duration: 1,
//         stagger: 0.05,
//         ease: "power4.out"
//       }, "-=1"); // Adjust timing to overlap with heading animation
//     }
//   }, [isLoaded]); // This effect now correctly depends only on isLoaded

//   return (
//     <div className='w-full overflow-x-hidden relative h-screen flex flex-row'>
//       <div className='w-full overflow-x-hidden relative h-screen flex flex-row bg-white bg-[radial-gradient(100%_50%_at_50%_20%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_70%,rgba(0,163,255,0)_100%)] text-black dark:bg-black dark:text-white transition-colors duration-500'>

//         <Navbar />

//         {/* Conditionally render the Loader based on showLoader state */}
//         {showLoader && <Loader onComplete={handleLoadingComplete} />}

//         {/* Render Background and content only when isLoaded is true */}
//         {isLoaded && (
//           <>
//             <div className="w-full h-screen absolute top-0 left-0">
//               <Suspense fallback={null}>
//                 <Background />
//               </Suspense>
//             </div>

//             <div className='relative greeting w-full text-black dark:text-white h-full font-bold flex flex-col items-start justify-center text-left pl-4 sm:pl-12 md:pl-28 z-10'>
//               {/* Responsive Heading */}
//               <h1 className='text-5xl h-max overflow-hidden sm:text-7xl md:text-8xl lg:text-9xl' ref={headingRef}>
//                 Hi,I&apos;m Dhruv
//               </h1>

//               {/* Responsive Subheading */}
//               <div
//                 className={`text-[#5b5353a4] dark:text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
//                 style={{
//                   backgroundImage: 'linear-gradient(to bottom, rgba(0, 163, 255, 1), rgba(0, 163, 255, 0.3), rgba(255, 255, 255, 0))',
//                   backgroundSize: '200% 100%',
//                   WebkitBackgroundClip: 'text',
//                   animationDuration: '2s',
//                 }}
//               >
//                 <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase my-3 h-max overflow-hidden' ref={subHeadingRef}>
//                   <span className="inline-block">Front-end Developer</span>
//                 </p>
//               </div>

//               {/* Responsive Scroll Indicator */}
//               <div className="absolute bottom-32 sm:bottom-28 left-1/2 transform -translate-x-1/2 w-max justify-center items-center flex flex-col gap-y-2 sm:hidden md:flex">
//                 <button className="w-[30px] h-[50px] rounded-full flex items-center justify-center bg-transparent border-none outline outline-2 outline-black dark:outline-[#c0c0c0] shadow-[0_0_30px_#c0c0c0] relative">
//                   <div className="w-[5px] h-[10px] rounded-full bg-black dark:bg-[#c0c0c0] shadow-[0_0_30px_#c0c0c0] animate-scroll"></div>
//                   <span className="absolute top-[140%] text-black dark:text-[whitesmoke] whitespace-nowrap uppercase tracking-[1.5px] text-xs">scroll smoothly</span>
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Hero;
/* eslint-disable no-unused-vars */

import Background from './Background.jsx';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Loader from './Loader.jsx';
import '../styles.css';
import CircularText from "./CircularText.jsx";
import DarkVeil from './DarkVeil.jsx';
import PropTypes from 'prop-types';

const Hero = ({ disabled = false, speed = 1, className = '' }) => {
  // State to control if the loader should be shown.
  // It checks sessionStorage on initial render. If 'portfolioLoaded' is 'true', it won't show.
  const [showLoader, setShowLoader] = useState(() => {
    return sessionStorage.getItem('portfolioLoaded') !== 'true';
  });

  // State to control if the main content (animations, background) should be visible.
  // This will be set to true once the loader completes.
  const [isLoaded, setIsLoaded] = useState(false);

  const animationDuration = `${speed}s`;
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);

  // This function is called by the Loader component when its animation finishes.
  const handleLoadingComplete = () => {
    setShowLoader(false); // Hide the loader component
    setIsLoaded(true);    // Indicate that the main content can now be displayed and animated
    sessionStorage.setItem('portfolioLoaded', 'true'); // Mark as loaded for the current session
  };

  useEffect(() => {
    // If the loader was skipped (because it was already loaded in this session),
    // we still need to set isLoaded to true so the content animations run.
    if (!showLoader && !isLoaded) {
      setIsLoaded(true);
    }
  }, [showLoader, isLoaded]); // Depend on showLoader and isLoaded to ensure this runs correctly

  // Effect for GSAP animations, which should only run once isLoaded is true.
  useEffect(() => {
    // Only run GSAP animations if the content is marked as loaded
    if (!isLoaded) return;

    // Create timeline for sequenced animations
    const tl = gsap.timeline();

    // Get heading text and create spans for each character for individual animation
    const headingText = "Hi, I'm Dhruv";
    if (headingRef.current) { // Ensure ref is not null
      headingRef.current.innerHTML = ''; // Clear existing content
      const headingChars = headingText.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
        span.style.display = 'inline-block'; // Essential for individual character animation
        headingRef.current.appendChild(span);
        return span;
      });

      // Animate heading characters
      tl.fromTo(headingChars, {
        opacity: 0,
        filter: 'blur(20px)',
        y: 100,
        rotateX: -90
      }, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "back.out(1.7)"
      });
    }


    // Get subheading text and create spans for each character
    const subHeadingText = "Full Stack Developer";
    if (subHeadingRef.current) { // Ensure ref is not null
      subHeadingRef.current.innerHTML = '';
      const subHeadingChars = subHeadingText.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        subHeadingRef.current.appendChild(span);
        return span;
      });

      // Animate subheading characters
      tl.fromTo(subHeadingChars, {
        opacity: 0,
        filter: 'blur(20px)',
        y: 50
      }, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out"
      }, "-=1"); // Adjust timing to overlap with heading animation
    }
  }, [isLoaded]); // This effect now correctly depends only on isLoaded

  return (
    <div className="w-full relative h-screen flex flex-row overflow-hidden">
      <div className='w-full relative h-screen flex flex-row'>

        <div className='w-full overflow-hidden relative h-screen flex flex-row bg-white dark:bg-black text-black dark:text-white transition-colors duration-500'>
          <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] dark:opacity-50 opacity-100 blur-[80px] dark:blur-[100px] transition-colors duration-500">
          </div>


          {/* Conditionally render the Loader based on showLoader state */}
          {showLoader && <Loader onComplete={handleLoadingComplete} />}

          {/* Render Background and content only when isLoaded is true */}
          {isLoaded && (
            <>
              <div className='relative greeting w-full text-black dark:text-white  h-full font-bold flex flex-col items-start justify-center text-left pl-4 sm:pl-12 md:pl-28 z-10'>
                {/* Responsive Heading */}
                <h1 className='text-5xl h-max overflow-hidden sm:text-7xl md:text-8xl lg:text-9xl' ref={headingRef}>
                  Hi,I&apos;m Dhruv
                </h1>

                {/* Responsive Subheading */}
                <div
                  className={`text-[#565353a4] dark:text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, rgba(0, 163, 255, 1), rgba(0, 163, 255, 0.3), rgba(255, 255, 255, 0))',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    animationDuration: '2s',
                  }}
                >
                  <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase my-3 h-max overflow-hidden' ref={subHeadingRef}>
                    <span className="inline-block">Full Stack Developer</span>
                  </p>
                </div>

                {/* Responsive Scroll Indicator */}
                <div className="absolute bottom-32 sm:bottom-14 left-1/2 transform -translate-x-1/2 w-max justify-center items-center flex flex-col gap-y-2 sm:hidden md:flex">
                  <CircularText
                    text="-SCROLL-SMOOTHLY"
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
Hero.propTypes = {
  disabled: PropTypes.bool,
  speed: PropTypes.number,
  className: PropTypes.string,
};

export default Hero;