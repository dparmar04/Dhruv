/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Background from './Background.jsx';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Loader from './Loader.jsx';
import '../styles.css';

const Hero = ({ disabled = false, speed = 1, className = '' }) => {
  const [isCanvasRendered, setIsCanvasRendered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationDuration = `${speed}s`;
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    setIsCanvasRendered(true);

    if (!isLoaded) return;

    // Create timeline for sequenced animations
    const tl = gsap.timeline();

    // Get heading text and create spans for each character
    const headingText = "Hi,I'm Dhruv"; // Hardcode the text instead of getting from ref
    headingRef.current.innerHTML = ''; // Clear existing content
    const headingChars = headingText.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
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

    // Get subheading text and create spans for each character
    const subHeadingText = "Front-end Developer";
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
  }, [isLoaded]);

  return (
    <div className='w-full overflow-x-hidden relative h-screen flex flex-row bg-white text-black dark:bg-black dark:text-white transition-colors duration-500'>
      {!isLoaded && <Loader onComplete={handleLoadingComplete} />}

      {isCanvasRendered && (
        <div className="w-full h-screen absolute top-0 left-0">
          <Background />
        </div>
      )}

      {isLoaded && (
        <>
          <div className='relative greeting w-full text-black dark:text-white h-full font-bold flex flex-col items-start justify-center text-left pl-4 sm:pl-12 md:pl-28 z-10'>
            {/* Responsive Heading */}
            <h1 className='text-5xl h-max overflow-hidden sm:text-7xl md:text-8xl lg:text-9xl' ref={headingRef}>
              Hi,I&apos;m Dhruv
            </h1>

            {/* Responsive Subheading */}
            <div
              className={`text-[#5b5353a4] dark:text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
              style={{
                backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                animationDuration: '2s',
              }}
            >
              <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase my-3 h-max overflow-hidden' ref={subHeadingRef}>
                <span className="inline-block">Front-end Developer</span>
              </p>
            </div>

            {/* Responsive Scroll Indicator */}
            <div className="absolute bottom-32 sm:bottom-28 left-1/2 transform -translate-x-1/2 w-max justify-center items-center flex flex-col gap-y-2 sm:hidden md:flex">
              <button className="w-[30px] h-[50px] rounded-full flex items-center justify-center bg-transparent border-none outline outline-2 outline-black dark:outline-[#c0c0c0] shadow-[0_0_30px_#c0c0c0] relative">
                <div className="w-[5px] h-[10px] rounded-full bg-black dark:bg-[#c0c0c0] shadow-[0_0_30px_#c0c0c0] animate-scroll"></div>
                <span className="absolute top-[140%] text-black dark:text-[whitesmoke] whitespace-nowrap uppercase tracking-[1.5px] text-xs">scroll smoothly</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;