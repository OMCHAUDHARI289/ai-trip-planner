import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with API key
// Note: In a production environment, you would want to handle this more securely
const API_KEY = "AIzaSyCE9mlaN1DmrfZYt8aNPKiCfdOKTwsoQqM"; // Replace with your actual API key if needed
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the Gemini 1.5 model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Default image for destinations
const defaultImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000";

/**
 * Generate a trip plan using Gemini 1.5 AI
 * @param {Object} tripData - The user's trip preferences
 * @returns {Object} - The generated trip plan
 */
export const generateTripPlan = async (tripData) => {
  try {
    // Create a prompt that describes what we want Gemini to do
    const prompt = `
    I need you to act as a travel planning assistant. 
    
    Create a detailed travel plan for the following trip requirements in JSON format:
    - Destination: ${tripData.destination}
    - Travel Dates: ${tripData.departureDate} to ${tripData.returnDate}
    - Number of Travelers: ${tripData.travelers}
    - Budget: ${tripData.budget} (budget, medium, or luxury)
    - Interests: ${tripData.interests.join(', ')}
    
    IMPORTANT INSTRUCTIONS:
    1. Your response must ONLY contain a valid JSON object
    2. Do NOT include any text before or after the JSON
    3. Do NOT use markdown formatting or code blocks
    4. Ensure all values are properly escaped and the JSON is valid
    5. Follow the exact structure shown below
    
    JSON STRUCTURE:
    {
      "destination": "Full destination name",
      "destinationImage": "A URL for a high-quality Unsplash image of this destination",
      "dates": "Formatted travel dates",
      "itinerary": [
        {
          "day": 1,
          "activities": ["Activity 1", "Activity 2", "Activity 3"]
        },
        {
          "day": 2,
          "activities": ["Activity 1", "Activity 2", "Activity 3"]
        },
        {
          "day": 3,
          "activities": ["Activity 1", "Activity 2", "Activity 3"]
        }
      ],
      "accommodations": "Recommended place to stay based on budget",
      "transportation": "Best ways to get around",
      "localTips": "Special insights about the destination",
      "estimatedCost": "Cost range based on the budget level",
      "hotelRecommendations": [
        {
          "name": "Hotel Name 1",
          "description": "Brief description of the hotel",
          "image": "URL to a high-quality Unsplash image of this hotel or similar",
          "priceRange": "€€€, €€, or € based on budget level",
          "rating": 4.5,
          "amenities": ["Amenity 1", "Amenity 2", "Amenity 3"]
        },
        {
          "name": "Hotel Name 2",
          "description": "Brief description of the hotel",
          "image": "URL to a high-quality Unsplash image of this hotel or similar",
          "priceRange": "€€€, €€, or € based on budget level",
          "rating": 4.7,
          "amenities": ["Amenity 1", "Amenity 2", "Amenity 3"]
        },
        {
          "name": "Hotel Name 3",
          "description": "Brief description of the hotel",
          "image": "URL to a high-quality Unsplash image of this hotel or similar",
          "priceRange": "€€€, €€, or € based on budget level",
          "rating": 4.3,
          "amenities": ["Amenity 1", "Amenity 2", "Amenity 3"]
        }
      ]
    }
    
    Specific instructions:
    1. For image URLs, use Unsplash (https://unsplash.com) images with format: https://images.unsplash.com/photo-[ID]?q=80&w=1000
    2. Include specific attractions, restaurants, and activities that match the interests
    3. Make recommendations appropriate for the specified budget level
    4. For "hotelRecommendations", include 3 specific hotels in ${tripData.destination} that match the budget level (${tripData.budget})
    5. Rating values should be between 3.0 and 5.0
    6. Price ranges should be € for budget, €€ for medium, and €€€ for luxury
    
    MOST IMPORTANTLY: Ensure your response is a single, valid JSON object that can be parsed with JSON.parse().
    `;

    // Generate content with Gemini 1.5
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Raw AI response:", text.substring(0, 500) + "..."); // Log first 500 chars for debugging

    // Try different approaches to extract the JSON
    let parsedResponse;
    
    // Approach 1: Try to parse the entire response directly
    try {
      parsedResponse = JSON.parse(text.trim());
      console.log("Parsed with direct approach");
      
      // Set default destination image if not provided
      if (!parsedResponse.destinationImage) {
        parsedResponse.destinationImage = defaultImage;
      }
      
      return parsedResponse;
    } catch (error) {
      console.log("Direct parsing failed, trying alternatives...");
    }
    
    // Approach 2: Extract from JSON code blocks
    try {
      const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/);
      if (jsonMatch && jsonMatch[1]) {
        parsedResponse = JSON.parse(jsonMatch[1].trim());
        console.log("Parsed from code block");
        
        // Set default destination image if not provided
        if (!parsedResponse.destinationImage) {
          parsedResponse.destinationImage = defaultImage;
        }
        
        return parsedResponse;
      }
    } catch (error) {
      console.log("Code block parsing failed, trying next approach...");
    }
    
    // Approach 3: Try to find a JSON object anywhere in the text
    try {
      const jsonRegex = /{[\s\S]*}/;
      const match = text.match(jsonRegex);
      if (match) {
        // Fix common JSON issues before parsing
        let jsonText = match[0];
        
        // Replace any trailing commas before closing brackets or braces
        jsonText = jsonText.replace(/,(\s*[\]}])/g, '$1');
        
        // Fix unescaped quotes in JSON values
        jsonText = jsonText.replace(/:\s*"(.*?)(?<!\\)"(.*?)"/g, ': "$1\\"$2"');
        
        parsedResponse = JSON.parse(jsonText);
        console.log("Parsed with regex extraction and fixes");
        
        // Set default destination image if not provided
        if (!parsedResponse.destinationImage) {
          parsedResponse.destinationImage = defaultImage;
        }
        
        return parsedResponse;
      }
    } catch (error) {
      console.log("Regex extraction failed:", error);
    }
    
    // If all parsing fails, create a fallback object
    console.error("All JSON parsing approaches failed");
    return createFallbackPlan(tripData);
  } catch (error) {
    console.error("Error generating trip plan with Gemini:", error);
    throw error;
  }
};

/**
 * Create a fallback trip plan when the AI response can't be parsed
 */
const createFallbackPlan = (tripData) => {
  return {
    destination: tripData.destination,
    destinationImage: defaultImage,
    dates: `${tripData.departureDate} to ${tripData.returnDate}`,
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
    localTips: "This is a fallback plan as we couldn't parse the AI response. Please try again later.",
    estimatedCost: "Varies based on your selections",
    hotelRecommendations: [
      {
        name: "City Center Hotel",
        description: "Conveniently located in the city center with modern amenities",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
        priceRange: tripData.budget === "luxury" ? "€€€" : (tripData.budget === "medium" ? "€€" : "€"),
        rating: 4.2,
        amenities: ["Free WiFi", "Breakfast Included", "Fitness Center"]
      },
      {
        name: "Riverside Lodge",
        description: "Charming accommodation with scenic views and excellent service",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1000",
        priceRange: tripData.budget === "luxury" ? "€€€" : (tripData.budget === "medium" ? "€€" : "€"),
        rating: 4.5,
        amenities: ["Free WiFi", "Restaurant", "Concierge Service"]
      },
      {
        name: "Traveler's Haven",
        description: "Comfortable and well-rated option with great value for money",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000",
        priceRange: tripData.budget === "luxury" ? "€€€" : (tripData.budget === "medium" ? "€€" : "€"),
        rating: 4.0,
        amenities: ["Free WiFi", "Airport Shuttle", "24-hour Reception"]
      }
    ]
  };
};

export default generateTripPlan; 