
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ParkingSlot from "@/components/ParkingSlot";
import BookingForm from "@/components/BookingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { malls, parkingSlots } from "@/utils/data";

const MallDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>();
  const [activeFloor, setActiveFloor] = useState(1);
  
  const mall = malls.find(m => m.id === id);
  
  if (!mall) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Mall Not Found</h1>
          <p className="mb-6">The mall you are looking for does not exist.</p>
          <Link to="/book">
            <Button>Browse Available Malls</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const availableFloors = [...new Set(parkingSlots.map(slot => slot.floor))];
  const slotsForFloor = parkingSlots.filter(slot => slot.floor === activeFloor);
  
  // Group slots by section
  const slotsBySection: { [key: string]: typeof parkingSlots } = {};
  slotsForFloor.forEach(slot => {
    if (!slotsBySection[slot.section]) {
      slotsBySection[slot.section] = [];
    }
    slotsBySection[slot.section].push(slot);
  });
  
  const handleSelectSlot = (slotId: string) => {
    setSelectedSlot(slotId === selectedSlot ? undefined : slotId);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/book" className="text-parkBlue-600 hover:text-parkBlue-800 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Search
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 relative">
                <img 
                  src={mall.image} 
                  alt={mall.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h1 className="text-2xl font-bold">{mall.name}</h1>
                    <p className="text-white/90">{mall.address}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-parkTeal-500">
                    ${mall.pricePerHour.toFixed(2)}/hr
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {mall.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-4">Select a Parking Spot</h2>
                  <div className="mb-4 flex space-x-2">
                    {availableFloors.map(floor => (
                      <Button
                        key={floor}
                        variant={activeFloor === floor ? "default" : "outline"}
                        className={activeFloor === floor ? "bg-parkBlue-500" : ""}
                        onClick={() => setActiveFloor(floor)}
                      >
                        Floor {floor}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="mb-4 flex flex-wrap gap-2">
                    <div className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-white border border-gray-200 rounded"></div>
                      <span className="text-xs text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      <span className="text-xs text-gray-600">Occupied</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-parkTeal-100 border border-parkTeal-300 rounded"></div>
                      <span className="text-xs text-gray-600">Premium</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-blue-100 border border-blue-300 rounded"></div>
                      <span className="text-xs text-gray-600">Disabled</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-green-100 border border-green-300 rounded"></div>
                      <span className="text-xs text-gray-600">Electric</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    {Object.keys(slotsBySection).length > 0 ? (
                      <Tabs defaultValue={Object.keys(slotsBySection)[0]} className="w-full">
                        <TabsList className="mb-4 grid grid-cols-3">
                          {Object.keys(slotsBySection).map(section => (
                            <TabsTrigger key={section} value={section}>
                              Section {section}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        {Object.keys(slotsBySection).map(section => (
                          <TabsContent key={section} value={section} className="animate-fade-in">
                            <div className="flex flex-wrap gap-3">
                              {slotsBySection[section].map(slot => (
                                <ParkingSlot
                                  key={slot.id}
                                  slot={slot}
                                  isSelected={slot.id === selectedSlot}
                                  onSelect={handleSelectSlot}
                                />
                              ))}
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        No slots available on this floor
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-bold mb-4">Mall Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Available Spots</h3>
                      <p className="text-2xl font-bold text-parkBlue-500">
                        {mall.availableSpots} <span className="text-sm text-gray-500 font-normal">/ {mall.totalSpots}</span>
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Rating</h3>
                      <div className="flex items-center">
                        <div className="text-2xl font-bold text-parkBlue-500 mr-2">
                          {mall.rating.toFixed(1)}
                        </div>
                        <div className="flex text-yellow-400">
                          {Array(5).fill(0).map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(mall.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <BookingForm
              mallId={mall.id}
              mallName={mall.name}
              pricePerHour={mall.pricePerHour}
              selectedSlotId={selectedSlot}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallDetails;
