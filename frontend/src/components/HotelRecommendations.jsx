import { useState, useEffect } from "react";
import { motion } from "framer-motion";


const HotelRecommendations = ({ destination, budget, aiHotelRecommendations = [] }) => {
  const [hotels, setHotels] = useState([]);
  
  useEffect(() => {
    if (!aiHotelRecommendations || aiHotelRecommendations.length === 0) {
      // No hotel recommendations provided, don't display anything
      setHotels([]);
      return;
    }
    
    // Format AI hotel recommendations for display
    const formattedHotels = aiHotelRecommendations.map((hotel, index) => ({
      name: hotel.name,
      image: hotel.image || defaultHotelImages[index % defaultHotelImages.length],
      description: hotel.description,
      price: hotel.priceRange || (budget === "luxury" ? "€€€" : (budget === "medium" ? "€€" : "€")),
      rating: hotel.rating || (4.0 + (Math.random() * 0.9)).toFixed(1), // Generate a random rating if not provided
      amenities: hotel.amenities || ["Free Wifi", "Breakfast", "Air Conditioning"]
    }));
    
    setHotels(formattedHotels);
  }, [aiHotelRecommendations, budget]);

  // Don't render anything if there are no hotels
  if (hotels.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Recommended Hotels</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotels.map((hotel, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: `url(${hotel.image})` }}
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold">{hotel.name}</h4>
                <span className="text-blue-300 font-medium">{hotel.price}</span>
              </div>
              
              <div className="flex items-center mb-2">
                <div className="flex mr-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? "text-yellow-300" : "text-gray-400"}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-200">{hotel.rating}</span>
              </div>
              
              <p className="text-sm text-gray-300 mb-3">{hotel.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {hotel.amenities.slice(0, 3).map((amenity, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-1 bg-white/10 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {hotel.amenities.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    +{hotel.amenities.length - 3} more
                  </span>
                )}
              </div>
              
              <button
                className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HotelRecommendations; 