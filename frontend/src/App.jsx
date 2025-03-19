import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import WhyThisWebsite from "./components/WhyThisWebsite";
import PlanTrip from "./pages/PlanTrip";

const App = () => {
  return (
    <Router>
      <div className="h-screen w-screen flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Landing />} /> {/* Discover */}
            <Route path="/explore" element={<WhyThisWebsite />} /> {/* Explore */}
            <Route path="/plan-trip" element={<PlanTrip />} /> {/* AI Trip Planner */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
