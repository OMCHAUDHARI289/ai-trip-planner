import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import destinations from "../data/data";
import Footer from "./Footer";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-cover bg-center filter brightness-110 contrast-125 saturate-150"
          style={{ backgroundImage: `url(${destinations[currentIndex].image})` }}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-16">
            <div className="text-white">
              <motion.h1 
                className="text-7xl font-bold uppercase mb-4"
                key={destinations[currentIndex].name}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {destinations[currentIndex].name}
              </motion.h1>
              <motion.h2 
                className="text-5xl font-semibold mb-6"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Journey Begins Here
              </motion.h2>
              <p className="text-lg mt-4 w-1/2">{destinations[currentIndex].description}</p>

              <Link to="/plan-trip">
                <motion.button
                  className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md 
                             hover:bg-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Plan Your Trip Now
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Wavy image container */}
      <div className="absolute bottom-0 w-full overflow-hidden h-48">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full">
          <path 
            fill="rgba(0,0,0,0.5)" 
            fillOpacity="0.8" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 z-10">
          {destinations.slice(0, 5).map((destination, index) => (
            <motion.div
              key={index}
              className="relative"
              custom={index}
              initial={{ y: index % 2 === 0 ? 10 : -10 }}
              animate={{ y: index % 2 === 0 ? -10 : 10 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
                delay: index * 0.3
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ 
                scale: 1.15,
                rotate: index % 2 === 0 ? 5 : -5,
                y: -20,
                zIndex: 50,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }
              }}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            >
              <motion.div 
                className="relative w-32 h-32 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                initial={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" }}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4"
                  >
                    <p className="text-white text-sm text-center font-semibold">{destination.name}</p>
                    <p className="text-white text-xs text-center mt-1 opacity-80">Explore now</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
