/* eslint-disable react/prop-types */
import { useState } from "react";

const ImageGlowCard = ({ image, link }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group w-full md:w-1/2 rounded-3xl overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Cursor-following glow */}
      {isHovering && (
        <div
          className="pointer-events-none absolute z-10 blur-2xl transition-opacity duration-300"
          style={{
            top: `${pos.y - 150}px`,
            left: `${pos.x - 150}px`,
            width: `800px`,
            height: `800px`,
            borderRadius: `9999px`,
            background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 80%)",
          }}
        />
      )}

      {/* Image */}
      <img
        src={image}
        alt="project"
        loading="lazy"
        className="w-full h-64 md:h-80 object-cover relative rounded-3xl z-20 transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white/10"
      />
    </a>
  );
};

export default ImageGlowCard;
