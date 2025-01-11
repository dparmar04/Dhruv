import React, { useState, useRef, useEffect } from 'react'
import { Input } from "@material-tailwind/react";
import AnimatedPath from './AnimatedPath';
import gsap from 'gsap';

const Contact = ({ disabled = false, speed = 5, text = 'Send Message', className = '' }) => {


   const animationDuration = `${speed}s`;
   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
   const [status, setStatus] = useState('');
   const [loading, setLoading] = useState(false); // New state for showing "Sending..."
   const [showMessage, setShowMessage] = useState(false);
   const headingRef = useRef(null);
   const TitleRef = useRef(null);


   useEffect(() => {
      // Create timeline for sequenced animations
      const tl = gsap.timeline();

      // Get heading text and create spans for each character
      const TitleText = "Get in touch"; // Hardcode the text instead of getting from ref
      headingRef.current.innerHTML = ''; // Clear existing content

      const headingChars = TitleText.split('').map(char => {
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
      }
      );

   }, []);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true); // Set loading state to true

      try {
         const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         });

         const result = await response.json();

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
         setLoading(false); // Set loading state to false
      }
      // Show the message temporarily
      setShowMessage(true);
      setTimeout(() => {
         setShowMessage(false);
      }, 7000);
   };


   return (
      <div className='w-full bg-black flex justify-center items-center'>

         <h1 className='text-9xl text-white m-10' >
            <div
               ref={TitleRef}
               className={`text-[#b5b5b5a4] rounded-3xl bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
               style={{
                  backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  animationDuration: '2s',
               }}
            >
               <div className="line">How can we</div>
               <div className="line">collaborate?</div>
            </div>
         </h1>

         <div className='contact-container w-full mx-16 '>
            <form onSubmit={handleSubmit} className='h-full flex flex-col gap-y-6'>
               <div className='py-4'>
                  <h1 className='text-7xl text-center my-6 font-space uppercase text-white' ref={headingRef}>Get in touch</h1>
                  <Input
                     variant="standard"
                     label="Name"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     placeholder="Your name"
                     className="text-[24px] capitalize"
                     color='white' />
               </div>
               <div className='py-4'>
                  <Input variant="standard"
                     label="Email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="Your email"
                     color='white'
                     className="text-[24px]" />
               </div>
               <div className='py-4'>
                  <Input variant="standard"
                     label="Message"
                     name="message"
                     value={formData.message}
                     onChange={handleChange}
                     placeholder="Say hello!"
                     color='white'
                     className="text-[24px] capitalize" />
               </div>
               <div
                  className={`text-[#b5b5b5a4] rounded-full bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
                  style={{
                     backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
                     backgroundSize: '200% 100%',
                     WebkitBackgroundClip: 'text',
                     animationDuration: '2s',
                  }}
               >
                  <button type="submit" className='p-3 text-xl font-space transition-all duration-300 ease-in-out border border-[#b5b5b5a4] rounded-3xl ' disabled={loading} >
                     {loading ? 'Sending...' : text}
                  </button>
               </div>
            </form>
            {showMessage && (
               <div className="toast-message fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-4 rounded-lg shadow-md text-sm animate-toast">
                  {status}
               </div>
            )}
         </div>
      </div >
   )
}

export default Contact