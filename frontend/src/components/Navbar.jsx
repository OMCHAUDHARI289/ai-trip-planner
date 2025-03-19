import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/10 text-white py-4 px-8 flex justify-between items-center z-50 border-b border-white/20">
      <h1 className="text-2xl font-bold">AI Trip Planner</h1>
      <ul className="flex gap-6">
        <li><Link to="/" className="hover:text-gray-300">Discover</Link></li> {/* Home */}
        <li><Link to="/explore" className="hover:text-gray-300">Explore</Link></li> {/* WhyThisWebsite */}
        <li><Link to="/plan-trip" className="hover:text-gray-300 font-medium">Plan Trip</Link></li> {/* PlanTrip */}
        <li><Link to="/reviews" className="hover:text-gray-300">Reviews</Link></li> {/* ReviewPage */}
        <li><Link to="/feedback" className="hover:text-gray-300">Feedback</Link></li> {/* ReviewPage (same component) */}
      </ul>
    </nav>
  );
};

export default Navbar;
