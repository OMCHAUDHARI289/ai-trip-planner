import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

const destinations = [
    {
      name: "mumbai",
      image: "/images/mumbai.jpg",
      description: "Experience the bustling city life of Mumbai, the financial capital of India, with iconic landmarks and vibrant culture.",
    },
    {
      name: "Goa",
      image: "/images/goa.jpg",
      description: "Relax on the golden beaches of Goa, enjoy thrilling water sports, and explore its Portuguese heritage.",
    },
    {
      name: "Manali",
      image: "/images/manali.jpg",
      description: "Escape to the snow-capped mountains of Manali, a paradise for nature lovers and adventure seekers.",
    },
    {
      name: "Jammu",
      image: "/images/jammu.jpg",
      description: "Discover the spiritual and scenic beauty of Jammu, known for its temples, lakes, and picturesque landscapes.",
    },
    {
      name: "LEH LADAKH",
      image: "/images/leh.jpg",
      description: "A breathtaking land of high passes, serene monasteries, and stunning landscapes. Experience adventure, pristine lakes, and Himalayan beauty like never before." 







,
    },
  ];
  

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length);
  };

  // Auto change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background Transition Effect */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-cover bg-center filter brightness-110 contrast-125 saturate-150"
          style={{ backgroundImage: `url(${destinations[currentIndex].image})` }}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-16">
            {/* Destination Name & Description */}
            <div className="text-white">
              <h1 className="text-6xl font-bold uppercase">{destinations[currentIndex].name}</h1>
              <p className="text-lg mt-4 w-1/2">{destinations[currentIndex].description}</p>

            

              {/* "Plan Your Trip Now" Button */}
              <motion.button
                className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md 
                           hover:bg-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Plan Your Trip Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Horizontal Destination Cards at Bottom Right */}
      <div className="absolute bottom-8 right-8 flex gap-4">
        {destinations.map((destination, index) => (
          <motion.div
            key={index}
            className={`w-32 h-48 bg-cover bg-center rounded-lg cursor-pointer transition-all shadow-lg
              ${index === currentIndex ? "border-4 border-white scale-110" : "opacity-70"}`}
            style={{ backgroundImage: `url(${destination.image})` }}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
