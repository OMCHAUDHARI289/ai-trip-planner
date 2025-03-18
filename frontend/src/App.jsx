import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ReviewPage from "./components/ReviewPage";
import WhyThisWebsite from "./components/WhyThisWebsite";

function App() {
  return (
    <div className="h-screen w-full">
      <Navbar />
    <HeroSection />
    <WhyThisWebsite />
    <ReviewPage />  
  </div>
  );
}

export default App;
