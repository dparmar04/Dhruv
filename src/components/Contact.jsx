import React from "react";

const Contact = () => {
   return (
      <div className="min-h-screen w-1/2 bg-gray-100 flex items-center justify-center">

         <form
            id="contactForm"
            method="post"
            action="https://script.google.com/macros/s/AKfycbz5vdMpt83-WIr9XK4yTjOz7-6yrCvUmnNHI4ttrFriO43y2OQ3WOw4t3h5k4LC98s/exec"
            className="p-4 bg-white rounded-lg"
         >
            {/* Name */}
            <label
               htmlFor="fname"
               className="block text-sm font-medium text-gray-700 mb-1"
            >
               Your Name
            </label>
            <input
               type="text"
               id="fname"
               name="firstname"
               placeholder="Your Name"
               required
               className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email */}
            <label
               htmlFor="email"
               className="block text-sm font-medium text-gray-700 mb-1"
            >
               Your Email
            </label>
            <input
               type="email"
               id="email"
               name="email"
               placeholder="Your Email"
               required
               className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Service */}
            <label
               htmlFor="service"
               className="block text-sm font-medium text-gray-700 mb-1"
            >
               Service Required
            </label>
            <input
               type="text"
               id="service"
               name="service"
               placeholder="Website type..."
               required
               className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Assigned Person */}
            <label
               htmlFor="person"
               className="block text-sm font-medium text-gray-700 mb-1"
            >
               Assigned Person's Name
            </label>
            <input
               type="text"
               id="person"
               name="person"
               placeholder="Person whom you want to give your work..."
               required
               className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Budget */}
            <label
               htmlFor="budget"
               className="block text-sm font-medium text-gray-700 mb-1"
            >
               Budget
            </label>
            <input
               type="number"
               id="budget"
               name="budget"
               placeholder="For ex: $300-500"
               required
               className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Request */}
            <label
               htmlFor="request"
               className="block text-sm font-medium text-gray-700 mb-1"
            >
               Any Other Request?
            </label>
            <textarea
               id="request"
               name="request"
               placeholder="Write something..."
               className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               rows="4"
            ></textarea>

            {/* Submit */}
            <button
               type="submit"
               className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
               Submit
            </button>
         </form>
      </div>
   );
};

export default Contact;
