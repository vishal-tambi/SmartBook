
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { malls } from "@/utils/data";
import { format } from "date-fns";

// Mock bookings data
const mockBookings = [
  {
    id: "b1",
    mallId: "m1",
    slotId: "s3",
    startTime: new Date(2025, 4, 15, 10, 0),
    endTime: new Date(2025, 4, 15, 12, 0),
    status: "active",
  },
  {
    id: "b2",
    mallId: "m2",
    slotId: "s7",
    startTime: new Date(2025, 4, 20, 14, 0),
    endTime: new Date(2025, 4, 20, 16, 0),
    status: "confirmed",
  },
  {
    id: "b3",
    mallId: "m4",
    slotId: "s12",
    startTime: new Date(2025, 4, 2, 9, 0),
    endTime: new Date(2025, 4, 2, 11, 0),
    status: "completed",
  },
];

const ViewBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const upcomingBookings = mockBookings.filter(
    booking => booking.status === "confirmed" || booking.status === "active"
  );
  
  const pastBookings = mockBookings.filter(
    booking => booking.status === "completed"
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-parkBlue-600 mb-6">My Bookings</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="animate-fade-in">
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map(booking => {
                  const mall = malls.find(m => m.id === booking.mallId);
                  return (
                    <BookingCard 
                      key={booking.id} 
                      booking={booking} 
                      mall={mall}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No Upcoming Bookings</h3>
                <p className="text-gray-500 mb-6">
                  You don't have any upcoming parking reservations.
                </p>
                <Button className="bg-parkBlue-500 hover:bg-parkBlue-600">
                  Book Parking Now
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="animate-fade-in">
            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map(booking => {
                  const mall = malls.find(m => m.id === booking.mallId);
                  return (
                    <BookingCard 
                      key={booking.id} 
                      booking={booking} 
                      mall={mall}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No Past Bookings</h3>
                <p className="text-gray-500">
                  You don't have any past parking reservations.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const BookingCard = ({ booking, mall }: { booking: any, mall: any }) => {
  const getStatusStyles = () => {
    switch(booking.status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = () => {
    switch(booking.status) {
      case 'active':
        return 'Active';
      case 'confirmed':
        return 'Confirmed';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return booking.status;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-parkBlue-600">{mall?.name}</h2>
            <p className="text-gray-500">{mall?.address}</p>
          </div>
          <Badge className={getStatusStyles()}>
            {getStatusLabel()}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
            <p>{format(booking.startTime, 'MMM dd, yyyy')}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Time</h3>
            <p>{`${format(booking.startTime, 'h:mm a')} - ${format(booking.endTime, 'h:mm a')}`}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Slot</h3>
            <p>{booking.slotId.replace('s', '')}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          {booking.status === 'active' && (
            <>
              <Button variant="outline" className="text-parkBlue-600 border-parkBlue-600">
                Extend Time
              </Button>
              <Button className="bg-parkBlue-500 hover:bg-parkBlue-600">
                Get Directions
              </Button>
            </>
          )}
          {booking.status === 'confirmed' && (
            <>
              <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                Cancel
              </Button>
              <Button className="bg-parkBlue-500 hover:bg-parkBlue-600">
                View Details
              </Button>
            </>
          )}
          {booking.status === 'completed' && (
            <Button variant="outline">
              Book Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBookings;
