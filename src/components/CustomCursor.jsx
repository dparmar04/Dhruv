import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  useEffect(() => {
    const cursor = cursorRef.current;

    // Move cursor smoothly with the mouse
    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        ease: "power3.out",
        duration: 0.01,
      });
    };

    // Scale and bounce effect for clickable elements
    const handleMouseEnter = () => {
      setIsHovered(true);
      setCursorText("Click");
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: "power3.out",
        yoyo: true,
        repeat: 1,
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Attach event listeners dynamically to avoid missing elements
    const addHoverListeners = () => {
      document.querySelectorAll(".projectImg").forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    addHoverListeners(); // Initial attachment

    // MutationObserver to detect dynamically added elements
    const observer = new MutationObserver(() => {
      addHoverListeners(); // Re-attach on content updates
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ width: "30px", height: "30px", transition: "width 0.2s, height 0.2s" }}
    >
      {isHovered ? (
        <div className="w-[60px] h-[30px] bg-black p-2 text-white text-s flex items-center justify-center rounded mix-blend-difference bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400">
          {cursorText}
        </div>
      ) : (
        <svg
          className={`transition-transform ${isHovered ? "scale-150" : "scale-200"}`}
          width="30"
          height="30"
          viewBox="0 0 100 100"
          fill="none"
        >
          <polygon points="10,10 90,30 40,40 30,90 10,10" fill="black" stroke="white" strokeWidth="5" />
        </svg>
      )}
    </div>
  );
};

export default CustomCursor;
