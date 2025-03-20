import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AIThinkingLoading = ({ text = "AI is planning your trip" }) => {
  const [dots, setDots] = useState("");
  
  // Animate the thinking dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 400);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Glassmorphism card */}
      <motion.div
        className="relative bg-white/20 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/30 max-w-md w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 0.1
        }}
      >
        <div className="flex flex-col items-center">
          {/* Centered gradient spinner */}
          <div className="relative w-24 h-24 mb-6">
            <motion.div 
              className="w-24 h-24 rounded-full absolute"
              style={{
                background: "conic-gradient(from 0deg, #60a5fa, #8b5cf6, #ec4899, #60a5fa)",
                backgroundSize: "400% 400%"
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 3,
                ease: "linear",
                repeat: Infinity
              }}
            />
            <div className="absolute inset-4 bg-black/40 backdrop-blur-md rounded-full" />
          </div>
          
          {/* Text with animated dots */}
          <div className="text-center">
            <motion.h3 
              className="text-xl font-medium text-white mb-2"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {text}
              <span className="inline-block w-8 text-left">{dots}</span>
            </motion.h3>
            
            <p className="text-white/70">We're crafting your perfect itinerary</p>
          </div>
          
          {/* Pulse rings around the card */}
          <div className="absolute -inset-2 -z-10">
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-40"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIThinkingLoading;