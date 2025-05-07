
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { malls } from "@/utils/data";

const BookParking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("nearby");
  
  const filteredMalls = malls.filter(mall => 
    mall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mall.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-parkBlue-600 mb-6">Find Parking</h1>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by mall name or location"
              className="pl-10 h-12"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-white rounded-xl shadow-md p-6">
            <TabsList className="mb-6 grid grid-cols-3 h-auto">
              <TabsTrigger value="nearby" className="py-2">Nearby</TabsTrigger>
              <TabsTrigger value="popular" className="py-2">Popular</TabsTrigger>
              <TabsTrigger value="favorites" className="py-2">Favorites</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nearby" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMalls.sort((a, b) => 
                  parseFloat(a.distance?.replace(' miles', '') || '0') - 
                  parseFloat(b.distance?.replace(' miles', '') || '0')
                ).map(mall => (
                  <MallCard key={mall.id} mall={mall} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMalls.sort((a, b) => b.rating - a.rating).map(mall => (
                  <MallCard key={mall.id} mall={mall} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="animate-fade-in">
              <div className="text-center py-10">
                <div className="h-20 w-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                <p className="text-gray-500 mb-6">
                  Add malls to your favorites for quick access
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("nearby")}
                >
                  Browse Nearby Malls
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const MallCard = ({ mall }: { mall: any }) => {
  return (
    <Link 
      to={`/mall/${mall.id}`}
      className="block bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex h-40">
        <div className="w-1/3 h-full overflow-hidden">
          <img 
            src={mall.image} 
            alt={mall.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-parkBlue-600">{mall.name}</h3>
              <span className="text-xs text-gray-500">{mall.distance}</span>
            </div>
            <p className="text-sm text-gray-500">{mall.address}</p>
            
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400 mr-1">
                {Array(5).fill(0).map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-3 h-3 ${i < Math.floor(mall.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-600 ml-1">{mall.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="bg-parkBlue-100 text-parkBlue-700 px-2 py-1 rounded-full text-xs">
              {mall.availableSpots} spots available
            </div>
            <p className="text-parkBlue-600 font-bold">${mall.pricePerHour.toFixed(2)}/hr</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookParking;
