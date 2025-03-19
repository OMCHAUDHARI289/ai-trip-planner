import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-2 z-20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.p 
          className="text-white text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Made with <span className="text-red-500">❤</span> by AI Trip Planner
        </motion.p>
        <motion.p 
          className="text-white text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          © {new Date().getFullYear()} All rights reserved
        </motion.p>
      </div>
    </div>
  );
};

export default Footer; 