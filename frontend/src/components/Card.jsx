import { motion } from "framer-motion";

const Card = ({ destination, onClick, isActive }) => {
  return (
    <motion.div
      className={`w-32 h-48 bg-cover bg-center rounded-lg cursor-pointer transition-all shadow-lg
        ${isActive ? "border-4 border-white scale-110" : "opacity-70"}`}
      style={{ backgroundImage: `url(${destination.image})` }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default Card;
