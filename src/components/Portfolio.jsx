import { useEffect, useRef, useState } from 'react'; // Import useState
import Circular from './Circular'; // Assuming this is your React Three Fiber component
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CurvedLoop from './CurvedLoop.jsx';
import StarBorder from './StarBorder'; // Assuming this is your button component
// Removed unused imports: StickyScroll, HoverCard, ImageGlowCard
// motion from framer-motion is kept in case it's used by other components like StarBorder or Circular,
// but direct project animations are now handled by GSAP.

// Register ScrollTrigger plugin for GSAP
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  // Refs to target individual elements of each project for GSAP animations
  const projectRefs = useRef([]); // Ref for the entire project section container
  const imageRefs = useRef([]);   // Ref for the project image
  const titleRefs = useRef([]);   // Ref for the project title
  const descriptionRefs = useRef([]); // Ref for the project description
  const buttonRefs = useRef([]);  // Ref for the "View Project" button
  const tooltipRefs = useRef([]); // Ref for each tooltip element

  // State to manage tooltip visibility and position for each project
  const [activeTooltip, setActiveTooltip] = useState(null); // Stores the index of the currently hovered project

  // Your project data
  const projects = [
    {
      title: "Ralph Lauren",
      description: "A premium landing page inspired by Ralph Lauren's elegant style. Designed with smooth animations, responsive layouts, and modern aesthetics using React.js and TailwindCSS to deliver a luxurious user experience across all devices.",
      image: "/photo5.png",
      link: "https://poloralphlauren.netlify.app/"
    },
    {
      title: "Hockerty",
      description: "A stylish and responsive landing page built for Hockerty, a custom clothing brand. Developed using React.js and TailwindCSS with elegant transitions and a sleek layout to showcase high-end fashion appeal.",
      image: "/photo4.png",
      link: "https://hockerty.netlify.app/"
    },
    {
      title: "Celestara",
      description: "Developed a visually engaging website with advanced animations and responsive design, leveraging React.js to ensure a seamless user experience across devices",
      image: "/photo1.png",
      link: "https://celestara.vercel.app/"
    },
    {
      title: "HealDoc",
      description: "As a Frontend Developer, I designed and developed the entire website from scratch using React.js, ensuring a smooth user experience and responsive design.",
      link: "https://healdoc.ai/",
      image: "/photo2.png",
    },
    {
      title: "Helverse",
      description: "It features a modern, clean design with smooth transitions and animations, creating an appealing user experience.",
      link: "https://helverse.netlify.app/",
      image: "/photo3.png",
    },
  ];

  // useEffect for GSAP animations
  useEffect(() => {
    // Create a GSAP context to manage all animations within this component
    // This helps in cleaning up animations when the component unmounts
    let ctx = gsap.context(() => {
      // Marquee animation for "FEATURED WORK"
      const marquee = gsap.utils.toArray('.marquee');
      gsap.to(marquee, {
        xPercent: -100, // Animate horizontally by 100% of its width
        ease: "none", // Linear animation for continuous loop
        duration: 10, // Duration of one full loop
        repeat: -1, // Repeat indefinitely
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 0) // Ensures a seamless looping effect
        }
      });

      // Animations for each individual project section
      // Loop through each project's elements using their refs
      projectRefs.current.forEach((section, i) => {
        // Ensure the ref exists before trying to animate its elements
        if (!section) return;

        const image = imageRefs.current[i];
        const title = titleRefs.current[i];
        const description = descriptionRefs.current[i];
        const button = buttonRefs.current[i];

        // Create a GSAP timeline for each project section.
        // This allows sequencing animations for elements within that section.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section, // The element that triggers the animation
            start: "top 75%", // Animation starts when the top of the section hits 75% down from the viewport top
            end: "bottom 25%", // Animation ends when the bottom of the section hits 25% up from the viewport bottom
            toggleActions: "play none none none", // Play animation once when entering the scroll area
            // markers: true, // Uncomment for debugging ScrollTrigger start/end points
          }
        });

        // Animation for the project image
        tl.fromTo(image, {
          opacity: 0,    // Start invisible
          scale: 0.8,    // Start smaller
          y: 50,         // Start slightly below its final position
          filter: 'blur(10px)' // Start blurred
        }, {
          opacity: 1,    // End fully visible
          scale: 1,      // End at original size
          y: 0,          // End at original Y position
          filter: 'blur(0px)', // End unblurred
          duration: 1,   // Animation duration
          ease: "power3.out" // Easing function for a smooth finish
        });

        // Animation for the project title
        tl.fromTo(title, {
          opacity: 0,
          y: 30,
          skewX: -10 // Add a slight skew for dynamic entry
        }, {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6"); // Start this animation 0.6 seconds before the previous one ends (overlap)

        // Animation for the project description
        tl.fromTo(description, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out"
        }, "-=0.4"); // Overlap with the title animation

        // Animation for the "View Project" button
        tl.fromTo(button, {
          opacity: 0,
          scale: 0.7
        }, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)" // A spring-like easing for a more impactful pop
        }, "-=0.2"); // Overlap with the description animation
      });
    });

    // Cleanup function: Revert all GSAP animations created in this context when the component unmounts
    return () => ctx.revert();
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Handle image hover for scaling and tooltip visibility/position
  const handleMouseEnter = (index) => {
    setActiveTooltip(index); // Set the active tooltip index
    gsap.to(imageRefs.current[index], { scale: 1.05, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (index) => {
    setActiveTooltip(null); // Hide tooltip
    gsap.to(imageRefs.current[index], { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseMove = (e, index) => {
    // Only update tooltip position if it's the active one and on desktop
    if (activeTooltip === index && window.innerWidth >= 768) { // 768px is Tailwind's 'md' breakpoint
      const tooltipElement = tooltipRefs.current[index];
      if (tooltipElement) {
        // Calculate position relative to the image wrapper
        const imageRect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - imageRect.left + 15; // Offset from cursor X
        const y = e.clientY - imageRect.top + 15;  // Offset from cursor Y

        gsap.to(tooltipElement, {
          x: x,
          y: y,
          duration: 0.1, // Quick movement
          ease: "none"
        });
      }
    }
  };

  return (
    <div className="dark:bg-black bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.20)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] min-h-screen transition-colors duration-500">

      {/* <div class="absolute top-0 z-[-2] h-screen w-screen bg-white "></div> */}

      {/* React Three Fiber component for background visual flair */}
      <div className='w-full h-full md:h-screen md:pt-16 overflow-hidden'>
        <Circular />
      </div>

      <div className='w-full bg-white dark:bg-black'>

        {/* Marquee for "FEATURED WORK" */}
        <CurvedLoop marqueeText="Explore Work 🚀" />

        {/* Portfolio Projects Section - Each project is now an immersive, animated section */}
        <div className="relative h-full mt-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-20 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index} // Using index as key is acceptable here as the array is static
                ref={el => (projectRefs.current[index] = el)} // Attach ref to the main project section div
                // Responsive layout: flex-col on small screens, flex-row on medium and up
                // Reverse order for every second project on medium+ screens for alternating layout
                className={`project-section relative flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 py-20`}
              >
                {/* Project Image/Video Wrapper - Enhanced with hover effects and subtle shadow/glow */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-image-wrapper relative w-full md:w-1/2 rounded-3xl overflow-hidden shadow-2xl group" // Removed hover:shadow-blue-500/50 as it's now handled by GSAP
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                >
                  <img
                    ref={el => (imageRefs.current[index] = el)} // Attach ref to the image
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    // Responsive image size and object-fit for consistent appearance
                    // Removed group-hover:scale-105 as it's now handled by GSAP
                    className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-3xl transform-gpu" // Added transform-gpu for smoother animations
                  />
                  {/* Tooltip overlay on hover */}
                  <div
                    ref={el => (tooltipRefs.current[index] = el)} // Attach ref to the tooltip
                    className={`absolute bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap pointer-events-none z-10 transition-opacity duration-200
                                ${activeTooltip === index ? 'opacity-100' : 'opacity-0'}
                                hidden md:block`}
                    style={{ transform: 'translate(-50%, -50%)' }} // Initial center transform, will be overridden by JS
                  >
                    <span>{project.title}</span>
                  </div>
                </a>

                {/* Project Content Area (Title, Description, Button) */}
                <div className="project-content w-full md:w-1/2 text-center md:text-left p-4">
                  <h2 ref={el => (titleRefs.current[index] = el)} // Attach ref to the title
                    // Responsive font sizes for impact
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-black dark:text-white"
                  >
                    {project.title}
                  </h2>
                  <p
                    ref={el => (descriptionRefs.current[index] = el)} // Attach ref to the description
                    // Responsive font size and line height for readability
                    className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
                  >
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={el => (buttonRefs.current[index] = el)} // Attach ref to the button
                    // Stylish button with hover effects
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action section */}
        <div className='flex flex-col items-center py-10'>
          <p className='text-white text-[18px] sm:text-[24px] px-5 font-space my-4'>Create, Innovate, Dominate – Contact Now!</p>
          <StarBorder onClick={() => window.location.href = '/contact'}>
            Get in touch
          </StarBorder>
        </div>
      </div>
    </div >
  );
};

export default Portfolio;