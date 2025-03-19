import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "./Card";
import destinations from "../data/data";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const prevSlide = () => {
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

  return (
    <div className="relative h-screen w-screen overflow-hidden">


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
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-16">
            <div className="text-white">
              <h1 className="text-6xl font-bold uppercase">{destinations[currentIndex].name}</h1>
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

      <div className="absolute bottom-8 right-8 flex gap-4">
        {destinations.map((destination, index) => (
          <Card
            key={index}
            destination={destination}
            onClick={() => setCurrentIndex(index)}
            isActive={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
