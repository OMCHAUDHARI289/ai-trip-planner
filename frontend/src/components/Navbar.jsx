const Navbar = () => {
    return (
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/10 text-white py-4 px-8 flex justify-between items-center z-50 border-b border-white/20">
        <h1 className="text-2xl font-bold"> AI Trip Planner</h1>
        <ul className="flex gap-6">
          <li><a href="#" className="hover:text-gray-300">Discover</a></li>
          <li><a href="#" className="hover:text-gray-300">Explore</a></li>
          <li><a href="#" className="hover:text-gray-300">Reviews</a></li>
          <li><a href="#" className="hover:text-gray-300">Feedback</a></li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
  