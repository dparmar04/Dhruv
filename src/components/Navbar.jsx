import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react'; // Or any icons you like
import gsap from 'gsap';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const aboutRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {

    // Helper function to animate text
    const animateText = (ref) => {
      const text = ref.current.textContent;
      ref.current.textContent = '';
      const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        ref.current.appendChild(span);
        return span;
      });
      return chars;
    };

    const titleChars = animateText(titleRef);

    // Animate title with wave effect
    gsap.to(titleChars, {
      y: -10,
      stagger: {
        each: 0.05,
        repeat: 1,
        yoyo: true,
        onComplete: () => {
          gsap.to(titleChars, { y: 0, duration: 1, ease: "power2.out" });
        }
      },
      ease: "sine.inOut",
      duration: 0.5
    });


  }, []);

  return (
    <nav className="w-full z-20 text-black bg-trasparent dark:text-white  px-6 py-4 flex items-center justify-between absolute transition-colors duration-500">
      {/* Logo */}
      <h1
        onClick={() => window.location.href = '/'}
        className="text-4xl font-bold cursor-pointer"
        ref={titleRef}
      >
        Portfolio
      </h1>

      {/* Desktop Navigation */}
      <div className='hidden md:flex bg-white/10 dark:bg-white/10 border border-white/20 backdrop-blur-md rounded-full bg-clip-padding px-5 py-4'>

        <ul className="hidden md:flex justify-between gap-x-16 overflow-hidden">
          <li>
            <a href="/" data-link="About" className="relative group text-xl cursor-pointer "
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname !== "/") {
                  window.location.href = "/";
                } else {
                  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span ref={aboutRef} className="inline-block">About</span>
            </a>
          </li>
          <li>
            <a href="/projects" data-link="Portfolio" className="relative group text-xl cursor-pointer ">
              <span ref={portfolioRef} className="inline-block">Portfolio</span>
            </a>
          </li>
          <li>
            <a href="/contact" data-link="Contact" className="relative group text-xl cursor-pointer ">
              <span ref={contactRef} className="inline-block">Contact</span>
            </a>
          </li>
        </ul>


      </div>

      <div className='flex items-center gap-10'>

        <button
          onClick={toggleTheme}
          className="p-3 rounded-full border border-white/30 backdrop-blur-md bg-white/10 dark:bg-white/10 bg-clip-padding hover:scale-110 transition-transform"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>


        {/* Mobile Menu Button */}
        <div className="md:hidden z-50 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`w-8 h-1 rounded-md bg-black dark:bg-white mb-2 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
          <div className={`w-8 h-1 rounded-md bg-black dark:bg-white mb-2 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-8 h-1 rounded-md bg-black dark:bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef} className={`fixed top-0 left-0 w-full h-screen z-40 bg-white dark:bg-black flex flex-col items-center justify-center transform transition-transform duration-500 ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <ul className="flex flex-col gap-8 text-3xl text-center">
          <li><a href="/" className="cursor-pointer uppercase" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="/projects" className="cursor-pointer uppercase" onClick={() => setMenuOpen(false)}>Portfolio</a></li>
          <li><a href="/contact" className="cursor-pointer uppercase" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
