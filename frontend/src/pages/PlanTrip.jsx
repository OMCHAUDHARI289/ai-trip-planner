import { useState } from "react";
import { motion } from "framer-motion";
import { generateTripPlan } from "../utils/geminiAPI";
import HotelRecommendations from "../components/HotelRecommendations";
import TripPlanForm from "../components/TripPlanForm";

const PlanTrip = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [usedFallback, setUsedFallback] = useState(false);
  
  const handleFormSubmit = async (formData) => {
    // Save form data for potential reuse
    setFormData(formData);
    
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
    } finally {
      // Add a slight delay before removing the loading state to prevent flashing
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  
  const resetForm = () => {
    setTripPlan(null);
    setError(null);
    setUsedFallback(false);
  };
  
  // Get Gemini-generated destination image if available
  const getDestinationImage = () => {
    if (!tripPlan) return null;
    
    // Check for different possible image properties that Gemini might return
    return tripPlan.destinationImageUrl || 
           tripPlan.destinationImage || 
           tripPlan.imageUrl || 
           tripPlan.image || 
           null;
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
          <TripPlanForm 
            onSubmit={handleFormSubmit} 
            isLoading={isLoading} 
            error={error}
          />
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
            
            {/* Destination Header with Gemini-generated image */}
            <div className="mb-6">
              {getDestinationImage() ? (
              <div 
                className="w-full h-60 bg-cover bg-center rounded-xl overflow-hidden relative"
                  style={{ backgroundImage: `url(${getDestinationImage()})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <h2 className="text-4xl font-bold p-6 text-white">
                    Your Trip to {tripPlan.destination}
                  </h2>
                </div>
              </div>
              ) : (
                <div className="w-full py-8 bg-blue-900/40 rounded-xl flex items-center justify-center">
                  <h2 className="text-4xl font-bold text-white text-center">
                    Your Trip to {tripPlan.destination}
                  </h2>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {tripPlan.startDestination && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Starting From</h3>
                  <p>{tripPlan.startDestination}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Dates</h3>
                <p>{tripPlan.dates}</p>
              </div>
              
              {tripPlan.estimatedCost && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Estimated Cost</h3>
                  <p>{tripPlan.estimatedCost.replace(/€+|₹+|\$+/g, '').trim() ? 
                      "₹" + tripPlan.estimatedCost.replace(/€+|₹+|\$+/g, '').trim() : 
                      formData?.budget === "budget" ? "₹ Budget-friendly" : 
                      formData?.budget === "medium" ? "₹₹ Moderate" : "₹₹₹ Luxury"}
                  </p>
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
            
            {/* Only show hotel recommendations if AI provided them */}
            {tripPlan.hotelRecommendations && tripPlan.hotelRecommendations.length > 0 && (
              <HotelRecommendations 
                destination={tripPlan.destination}
                budget={formData?.budget || "medium"}
                aiHotelRecommendations={tripPlan.hotelRecommendations.map(hotel => ({
                  ...hotel,
                  priceRange: hotel.priceRange.replace(/€+/g, '₹').replace(/\$+/g, '₹')
                }))}
              />
            )}
            
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