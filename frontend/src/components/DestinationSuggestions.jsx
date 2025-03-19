import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000",
    description: "The city of love with iconic landmarks, art, and cuisine.",
    interests: ["History & Culture", "Food & Dining"]
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000",
    description: "Tropical paradise with beautiful beaches, temples, and relaxation.",
    interests: ["Nature & Outdoors", "Relaxation"]
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000",
    description: "Blend of traditional culture and futuristic technology.",
    interests: ["Food & Dining", "Shopping", "History & Culture"]
  },
  {
    id: 4,
    name: "New York City, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000",
    description: "The Big Apple offers world-class entertainment, shopping, and dining.",
    interests: ["Shopping", "Nightlife", "Food & Dining"]
  },
  {
    id: 5,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000",
    description: "Stunning blue and white architecture overlooking the Mediterranean.",
    interests: ["Relaxation", "Nature & Outdoors"]
  },
  {
    id: 6,
    name: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1562303534-74a9001d8733?q=80&w=1000",
    description: "Beautiful coastal city with mountain views and diverse experiences.",
    interests: ["Adventure", "Nature & Outdoors"]
  }
];

const DestinationSuggestions = ({ onSelectDestination, selectedInterests = [] }) => {
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  
  useEffect(() => {
    if (selectedInterests.length > 0) {
      // Filter destinations that match at least one of the selected interests
      const filtered = destinations.filter(destination => 
        destination.interests.some(interest => selectedInterests.includes(interest))
      );
      setFilteredDestinations(filtered.length > 0 ? filtered : destinations);
    } else {
      setFilteredDestinations(destinations);
    }
  }, [selectedInterests]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Suggested Destinations</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDestinations.map((destination) => (
          <motion.div
            key={destination.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectDestination(destination.name)}
          >
            <div 
              className="h-48 bg-cover bg-center" 
              style={{ backgroundImage: `url(${destination.image})` }}
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold">{destination.name}</h4>
              <p className="text-sm text-gray-200 mt-1">{destination.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {destination.interests.map((interest) => (
                  <span 
                    key={interest} 
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedInterests.includes(interest) 
                        ? "bg-blue-500 text-white" 
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DestinationSuggestions; 