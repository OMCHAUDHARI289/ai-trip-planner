import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIThinkingLoading from "./AIThinkingLoading";

const TripPlanForm = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    startDestination: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: 1,
    budget: "medium",
    interests: []
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const interestOptions = [
    "History & Culture", 
    "Nature & Outdoors", 
    "Food & Dining", 
    "Shopping", 
    "Relaxation", 
    "Adventure",
    "Nightlife",
    "Family-friendly"
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          interests: [...formData.interests, value]
        });
      } else {
        setFormData({
          ...formData,
          interests: formData.interests.filter(interest => interest !== value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Ensure at least one interest is selected
    if (formData.interests.length === 0) {
      const updatedFormData = {
        ...formData,
        interests: ["Travel"] // Add a default interest if none selected
      };
      setFormData(updatedFormData);
      onSubmit(updatedFormData);
    } else {
      onSubmit(formData);
    }
  };
  
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {!formSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg mb-6">Tell us about your dream vacation, and our AI will create a personalized trip plan for you.</p>
            
            {error && (
              <div className="mb-6 p-3 bg-red-500/20 rounded-lg text-white">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">Starting Point</label>
                  <input
                    type="text"
                    name="startDestination"
                    value={formData.startDestination}
                    onChange={handleChange}
                    placeholder="Where are you departing from?"
                    className="w-full px-4 py-3 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Destination</label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="Where do you want to go?"
                    className="w-full px-4 py-3 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Departure Date</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Number of Travelers</label>
                  <input
                    type="number"
                    name="travelers"
                    min="1"
                    max="20"
                    value={formData.travelers}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium">Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="budget">Budget-friendly</option>
                    <option value="medium">Medium</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block mb-3 font-medium">Interests</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interestOptions.map(interest => (
                    <div key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        id={interest}
                        name="interests"
                        value={interest}
                        checked={formData.interests.includes(interest)}
                        onChange={handleChange}
                        className="w-4 h-4 mr-2"
                      />
                      <label htmlFor={interest}>{interest}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <motion.button
                type="submit"
                className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-lg transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate AI Trip Plan
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="flex flex-col items-center justify-center min-h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Enhanced Loading Component - Centered */}
            <div className="flex flex-col items-center justify-center py-12">
              {/* Display destination info while loading */}
              <h3 className="text-xl font-medium mb-8 text-center">
                Creating your trip to {formData.destination || "your dream destination"}
              </h3>
              
              {/* Gradient spinner */}
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
              <AIThinkingLoading text="AI is planning your trip" />
              
              <p className="mt-6 text-center max-w-md">
                We're analyzing {formData.interests.length > 0 ? formData.interests.join(", ") : "your interests"} 
                to create your perfect {formData.budget} itinerary for {formData.travelers} {formData.travelers === 1 ? "traveler" : "travelers"}.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TripPlanForm;