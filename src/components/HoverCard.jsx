import { useState } from 'react';
import { useTheme } from './ThemeContext';
import PropTypes from 'prop-types';

const HoverCard = ({ title, description }) => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // get X within card
    const y = e.clientY - rect.top;  // get Y within card
    setMousePosition({ x, y });
  };

  return (
    <div
      className="relative group w-full max-w-md mx-auto overflow-hidden rounded-3xl transition-transform duration-500 hover:scale-105"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Cursor-following glow */}
      {isHovering && (
        <div
          className="absolute z-0 pointer-events-none transition-opacity duration-300"
          style={{
            top: `${mousePosition.y - 150}px`,
            left: `${mousePosition.x - 150}px`,
            width: `300px`,
            height: `300px`,
            borderRadius: '9999px',
            position: 'absolute',
            background: 'radial-gradient(circle, rgba(160,160,160,0.4) 0%, rgba(80,80,80,0) 80%)',
            opacity: 1,
          }}
        >
          {/* Light mode: blackish glow */}
          <div className="block dark:hidden w-full h-full rounded-full" style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0) 80%)',
          }}></div>

          {/* Dark mode: silvery glow */}
          <div className="hidden dark:block w-full h-full rounded-full" style={{
            background: 'radial-gradient(circle, rgba(192,192,192,0.4) 10%, rgba(128,128,128,0) 80%)',
          }}></div>
        </div>
      )}

      {/* Overlay Content */}
      <div
        className="relative z-20 flex flex-col justify-end p-6 rounded-3xl bg-black/40 backdrop-blur-sm dark:text-white text-black transition-all duration-500 font-bold"
        style={
          theme === 'dark'
            ? {
              backgroundImage:
                'linear-gradient(90deg, rgba(192, 192, 192, 0.5) 0%, rgba(146, 146, 146, 0.2) 10%, rgba(0, 0, 0, 0.5) 50%)',
            }
            : {
              backgroundImage:
                'linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(46, 46, 46, 0.5) 10%, rgba(192, 192, 192, 0.5) 50%)',
            }
        }
      >
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

HoverCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HoverCard;
