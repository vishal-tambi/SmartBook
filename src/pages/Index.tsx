
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MallList from "@/components/MallList";
import { Button } from "@/components/ui/button";
import { notifications } from "@/utils/data";

const Index = () => {
  const [showPromo, setShowPromo] = useState(false);
  
  useEffect(() => {
    // Show promo after 2 seconds
    const timer = setTimeout(() => {
      setShowPromo(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-16">
        <Hero />
        <MallList />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-parkBlue-600 mb-4">
                Smart Parking Made Simple
              </h2>
              <p className="text-gray-600 mb-6">
                ParkSmart revolutionizes your mall parking experience with real-time availability, contactless entry, and indoor navigation. 
                Save time, reduce stress, and enjoy your shopping experience.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Find and reserve parking spots in advance",
                  "Get real-time availability updates",
                  "Navigate to your exact parking spot",
                  "Extend your parking time remotely",
                  "Earn rewards with every booking"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-parkTeal-100 text-parkTeal-700 flex items-center justify-center mr-2 flex-shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-parkBlue-500 hover:bg-parkBlue-600">
                Get Started
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1621928372481-72a98d7e55e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Parking Garage"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-parkBlue-600 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                ParkSmart offers a seamless parking experience from booking to exit. Follow these simple steps to transform your parking experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Search & Select",
                  description: "Find your mall and view available parking spots in real-time.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )
                },
                {
                  title: "Book & Pay",
                  description: "Reserve your spot and pay securely through the app.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  )
                },
                {
                  title: "Scan & Park",
                  description: "Use your QR code for seamless entry and find your spot.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  )
                },
                {
                  title: "Exit & Earn",
                  description: "Leave effortlessly and earn rewards for your next visit.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  )
                }
              ].map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                  <div className="h-16 w-16 rounded-full bg-parkBlue-100 text-parkBlue-600 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-parkBlue-600 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {showPromo && notifications.length > 0 && (
        <div className="fixed bottom-6 right-6 max-w-sm w-full bg-white shadow-xl rounded-lg border border-parkBlue-100 overflow-hidden animate-scale-in">
          <div className="bg-parkBlue-500 px-4 py-2 flex justify-between items-center">
            <h4 className="text-white font-medium">New Notification</h4>
            <button 
              onClick={() => setShowPromo(false)}
              className="text-white hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <h5 className="font-bold text-lg">{notifications[0].title}</h5>
            <p className="text-gray-700 mt-1">{notifications[0].message}</p>
            <div className="mt-4 flex justify-end">
              <Button 
                size="sm"
                className="bg-parkTeal-500 hover:bg-parkTeal-700 text-white"
                onClick={() => setShowPromo(false)}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
