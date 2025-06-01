import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
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

    document.addEventListener("mousemove", handleMouseMove);

  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ width: "30px", height: "30px", transition: "width 0.2s, height 0.2s" }}
    >
      <svg
        className="transition-transform"
        width="30"
        height="30"
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon points="10,10 90,30 40,40 30,90 10,10" fill="black" stroke="white" strokeWidth="5" />
      </svg>

    </div>
  );
};

export default CustomCursor;
