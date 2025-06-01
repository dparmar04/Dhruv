/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { Input } from "@material-tailwind/react";
import { useTheme } from './ThemeContext';
import gsap from 'gsap';

const Contact = ({ disabled = false, speed = 5, text = 'Send Message', className = '' }) => {
  const { theme } = useTheme();
  // eslint-disable-next-line no-unused-vars
  const animationDuration = `${speed}s`;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const headingRef = useRef(null);
  const TitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const TitleText = "Get in touch";
    headingRef.current.innerHTML = '';

    const headingChars = TitleText.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      headingRef.current.appendChild(span);
      return span;
    });

    tl.fromTo(headingChars, {
      opacity: 0,
      filter: 'blur(20px)',
      y: -100,
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
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('⚠️ Please fill out all fields before submitting.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (response.ok) {
        setStatus('🌟 Message received! I’m excited to discuss how we can make your vision a reality.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(result.error || '⚠️ Failed to send your message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('⚠️ Failed to send your message. Please try again.');
    } finally {
      setLoading(false);
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 10000);
  };

  return (
    <div className="w-full h-[90vh] bg-white dark:bg-black flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-between items-center transition-colors duration-500">
      {/* Title Section */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-gray-800 dark:text-white m-6 lg:m-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[40%] text-center lg:text-left">
        <div
          ref={TitleRef}
          className={`text-[#000000a4] dark:text-[#b5b5b5a4] rounded-3xl bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
          style={{
            backgroundImage:
              theme === 'dark'
                ? 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)'
                : 'linear-gradient(120deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 60%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            animationDuration: '2s',
          }}
        >
          <div className="line">How can we</div>
          <div className="line">collaborate?</div>
        </div>
      </h1>



      {/* Contact Form */}
      <div className="contact-container w-[90%] sm:w-[80%] md:w-[70%] lg:w-[40%] mx-6 lg:mx-16">
        <form onSubmit={handleSubmit} className="h-full flex flex-col gap-y-4 md:gap-y-6">
          <div className="py-4">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center my-4 lg:my-6 font-space uppercase text-gray-900 dark:text-white"
              ref={headingRef}
            >
              Get in touch
            </h1>
            <Input
              variant="standard"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] capitalize
               text-black dark:text-white 
               placeholder:text-gray-400 dark:placeholder:text-gray-500"
              labelProps={{
                className: "text-black dark:text-white"
              }}
            />
          </div>
          <div className="py-4">
            <Input
              variant="standard"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] 
               text-black dark:text-white 
               placeholder:text-gray-400 dark:placeholder:text-gray-500"
              labelProps={{
                className: "text-black dark:text-white"
              }}
            />
          </div>
          <div className="py-4">
            <Input
              variant="standard"
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Say hello!"
              className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] capitalize 
               text-black dark:text-white 
               placeholder:text-gray-400 dark:placeholder:text-white"
              labelProps={{
                className: "text-black dark:text-white"
              }}
            />
          </div>
          <div
            className={`
              rounded-full bg-clip-text inline-block 
              ${disabled ? '' : 'animate-shine'} 
              ${className} 
              text-black/60 dark:text-[#b5b5b5a4]
            `}
            style={{
              backgroundImage: `
              linear-gradient(120deg,
              rgba(0, 0, 0, 0) 40%,
              rgba(0, 0, 0, 0.7) 50%,
              rgba(0, 0, 0, 0) 60%)`,
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              animationDuration: '2s',
            }}
          >
            <div
              className="dark:bg-gradient-to-r dark:from-transparent dark:via-white/80 dark:to-transparent dark:bg-[length:200%_100%] dark:bg-clip-text"
              style={{
                WebkitBackgroundClip: 'text',
                backgroundImage: `
                linear-gradient(120deg,
                rgba(255, 255, 255, 0) 40%,
                rgba(255, 255, 255, 0.8) 50%,
                rgba(255, 255, 255, 0) 60%)
                `,
              }}
            >
              <button
                type="submit"
                className="p-3 text-lg sm:text-xl font-space transition-all duration-300 ease-in-out 
                  border rounded-3xl border-black/40 dark:border-[#b5b5b5a4]"
                disabled={loading}
              >
                {loading ? 'Sending...' : text}
              </button>
            </div>
          </div>


        </form>

        {showMessage && (
          <div className="toast-message fixed bottom-5 left-5 mx-auto transform -translate-x-1/2 px-6 py-4 rounded-lg shadow-md text-sm animate-toast bg-black/90 dark:bg-gray-800 text-white">
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
