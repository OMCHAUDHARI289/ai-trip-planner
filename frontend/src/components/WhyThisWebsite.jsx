import React from "react";
import { motion } from "framer-motion";

const WhyThisWebsite = () => {
  return (
    <section
      id="why-this-website"
      className="h-screen flex flex-col justify-center items-center text-white px-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)",
      }}
    >
      {/* Wavy Water Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `url('/images/waves.svg') repeat-x bottom`,
          opacity: 0.4,
        }}
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      />

      {/* Heading */}
      <motion.h2
        className="text-5xl font-bold mb-6 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Why This Website?
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-lg max-w-2xl text-center relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        Plan your dream vacation with <b>AI-powered recommendations</b>. Explore stunning
        destinations, get personalized travel plans, and book everything in one place.
      </motion.p>

      {/* Features Cards */}
      <motion.div
        className="mt-10 flex gap-8 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {[
          { icon: "🌍", title: "AI-Powered Planning", desc: "Get personalized travel plans based on your preferences." },
          { icon: "🏖️", title: "Top Destinations", desc: "Discover breathtaking places with real-time updates." },
          { icon: "✈️", title: "Easy Booking", desc: "Book flights, hotels, and activities in one go." }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="backdrop-blur-lg bg-white bg-opacity-10 p-6 rounded-lg shadow-md w-64 text-center relative"
            whileHover={{ scale: 1.05 }}
            animate={{
              y: [0, -5, 0],
              transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
          >
            <h3 className="text-xl font-semibold mb-2">{feature.icon} {feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Plan Your Trip Now Button */}
      <motion.a
        href="#plan-your-trip"
        className="mt-12 px-8 py-4 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-lg relative overflow-hidden transition-all"
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
      >
        Plan Your Trip Now ✈️
      </motion.a>
    </section>
  );
};

export default WhyThisWebsite;
