import { useState } from "react";
import { motion } from "framer-motion";
import { generateTripPlan } from "../utils/geminiAPI";
import HotelRecommendations from "../components/HotelRecommendations";

const PlanTrip = () => {
  const [formData, setFormData] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: 1,
    budget: "medium",
    interests: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const [error, setError] = useState(null);
  const [usedFallback, setUsedFallback] = useState(false);
  
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setIsLoading(true);
    setError(null);
    setUsedFallback(false);
    
    try {
      // Validate form data
      if (!formData.destination || !formData.departureDate || !formData.returnDate) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }
      
      // Ensure at least one interest is selected
      if (formData.interests.length === 0) {
        setFormData({
          ...formData,
          interests: ["Travel"] // Add a default interest if none selected
        });
      }
      
      // Use the Gemini API to generate a trip plan
      const aiGeneratedPlan = await generateTripPlan(formData);
      
      // Check if we got a valid plan with at least the basic fields
      const isPlanValid = aiGeneratedPlan && 
                         aiGeneratedPlan.destination && 
                         aiGeneratedPlan.itinerary && 
                         Array.isArray(aiGeneratedPlan.itinerary);
      
      if (isPlanValid) {
        // Set the trip plan
        setTripPlan(aiGeneratedPlan);
        
        // Check if it's a fallback plan
        if (aiGeneratedPlan.localTips && aiGeneratedPlan.localTips.includes("fallback plan")) {
          setUsedFallback(true);
          setError("We encountered an issue generating your complete AI trip plan. Here's a simplified version instead.");
        }
      } else {
        throw new Error("Invalid plan format received");
      }
    } catch (error) {
      console.error("Error generating trip plan:", error);
      setError("We couldn't generate your trip plan. Please try again later.");
      setUsedFallback(true);
      
      // Create a basic fallback plan
      setTripPlan({
        destination: formData.destination,
        dates: `${formData.departureDate} to ${formData.returnDate}`,
        itinerary: [
          {
            day: 1,
            activities: ["Check-in to hotel", "Local dinner at recommended restaurant"]
          },
          {
            day: 2,
            activities: ["Morning sightseeing", "Afternoon museum visit", "Evening entertainment"]
          },
          {
            day: 3,
            activities: ["Guided tour", "Free time for shopping", "Special dinner experience"]
          }
        ],
        accommodations: "Suggested 4-star hotel in city center",
        transportation: "Local public transit and walking recommended",
        localTips: "This is a basic plan as we couldn't generate a customized AI plan. Please try again later.",
        estimatedCost: "Varies based on your selections"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setTripPlan(null);
    setError(null);
    setUsedFallback(false);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-10 px-6 md:px-12 bg-gradient-to-b from-blue-900 to-purple-900 text-white">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Plan Your Dream Trip</h1>
        
        {!tripPlan ? (
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Your Trip Plan with Gemini 1.5...
                  </span>
                ) : "Generate AI Trip Plan"}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {usedFallback && (
              <div className="mb-6 p-4 bg-yellow-500/20 rounded-lg text-white">
                <h3 className="text-lg font-semibold mb-1">Notice</h3>
                <p>{error || "We've generated a basic trip plan as a starting point."}</p>
              </div>
            )}
            
            {/* Destination Image */}
            <div className="mb-6">
              <div 
                className="w-full h-60 bg-cover bg-center rounded-xl overflow-hidden relative"
                style={{ backgroundImage: `url(${tripPlan.destinationImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000"})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <h2 className="text-4xl font-bold p-6 text-white">
                    Your Trip to {tripPlan.destination}
                  </h2>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Dates</h3>
                <p>{tripPlan.dates}</p>
              </div>
              
              {tripPlan.estimatedCost && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Estimated Cost</h3>
                  <p>{tripPlan.estimatedCost}</p>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Itinerary</h3>
              <div className="space-y-4">
                {tripPlan.itinerary.map((day) => (
                  <div key={day.day} className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Day {day.day}</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {day.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Accommodations</h3>
                <p>{tripPlan.accommodations}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Transportation</h3>
                <p>{tripPlan.transportation}</p>
              </div>
            </div>
            
            {tripPlan.localTips && !tripPlan.localTips.includes("fallback") && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Local Tips</h3>
                <p>{tripPlan.localTips}</p>
              </div>
            )}
            
            <HotelRecommendations 
              destination={tripPlan.destination}
              budget={formData.budget}
              aiHotelRecommendations={tripPlan.hotelRecommendations}
            />
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.button
                onClick={resetForm}
                className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Modify Plan
              </motion.button>
              <motion.button
                className="flex-1 py-3 px-6 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Plan
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PlanTrip; 