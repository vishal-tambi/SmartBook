
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/book");
  };

  return (
    <div className="relative bg-parkBlue-600 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl animate-fade-in">
            Smart Parking Made <span className="text-parkTeal-300">Simple</span>
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Find, book, and navigate to the perfect parking spot at your favorite mall in seconds.
          </p>
          <form onSubmit={handleSearch} className="mt-10 w-full max-w-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Enter mall name or location"
                  className="pl-10 h-12 bg-white/90 border-0 focus:ring-2 focus:ring-parkTeal-500"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              <Button 
                type="submit" 
                className="h-12 px-6 bg-parkTeal-500 hover:bg-parkTeal-700 text-white font-medium"
              >
                Find Parking
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
