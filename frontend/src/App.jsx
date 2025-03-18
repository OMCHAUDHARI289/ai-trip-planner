import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import WhyThisWebsite from "./components/WhyThisWebsite";
import ReviewPage from "./components/ReviewPage";

const App = () => {
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Landing />} /> {/* Discover */}
            <Route path="/explore" element={<WhyThisWebsite />} /> {/* Explore */}
            <Route path="/reviews" element={<ReviewPage />} /> {/* Reviews */}
            <Route path="/feedback" element={<ReviewPage />} /> {/* Feedback */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
