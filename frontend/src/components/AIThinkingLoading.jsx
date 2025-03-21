import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AIThinkingLoading = ({ text = "AI is thinking", formData = {} }) => {
  const [dots, setDots] = useState("");
  
  // Convert budget display to use Rupees symbol
  const getBudgetDisplay = (budget) => {
    if (!budget) return "₹₹";
    
    switch(budget.toLowerCase()) {
      case "budget":
        return "₹";
      case "medium":
        return "₹₹";
      case "luxury":
        return "₹₹₹";
      default:
        return "₹";
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="text-xl font-medium text-center"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ 
          repeat: Infinity, 
          duration: 1, 
          repeatType: "reverse" 
        }}
      >
        {text}<span className="inline-block w-12 text-left">{dots}</span>
      </motion.div>
    </div>
  );
};

export default AIThinkingLoading; 