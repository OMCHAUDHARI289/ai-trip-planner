import { useState } from "react";
import { motion } from "framer-motion";
import { Marquee } from "./Marquee";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([
    { name: "Aarav", rating: 5, feedback: "Amazing experience in Manali! Loved the snow!" },
    { name: "Priya", rating: 4, feedback: "Goa was fantastic, especially the beaches!" },
    { name: "Rohan", rating: 5, feedback: "Leh Ladakh was breathtaking! Highly recommended!" },
  ]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !feedback) return;
    const newReview = { name, rating, feedback };
    setReviews([newReview, ...reviews]); // Add new review at the top
    setName("");
    setRating(5);
    setFeedback("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🌟 User Reviews & Feedback</h1>

      {/* Review Form */}
      <motion.form
        className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-700 bg-gray-700 rounded mb-3 text-white"
          required
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-3 border border-gray-700 bg-gray-700 rounded mb-3 text-white"
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star} Stars
            </option>
          ))}
        </select>
        <textarea
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 border border-gray-700 bg-gray-700 rounded mb-3 text-white"
          required
        />
        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Review
        </motion.button>
      </motion.form>

      {/* Reviews Marquee */}
      <div className="mt-10 w-full max-w-5xl">
        <Marquee className="w-full" pauseOnHover repeat={3}>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 text-white p-4 mx-4 rounded-lg shadow-lg w-80 flex flex-col text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="font-bold text-lg">{review.name}</h2>
              <p className="text-yellow-400 text-lg">{"⭐".repeat(review.rating)}</p>
              <p className="mt-2 text-gray-300">{review.feedback}</p>
            </motion.div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default ReviewPage;
