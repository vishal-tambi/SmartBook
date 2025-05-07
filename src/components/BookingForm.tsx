
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingFormProps {
  mallId: string;
  mallName: string;
  pricePerHour: number;
  selectedSlotId?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  mallId,
  mallName,
  pricePerHour,
  selectedSlotId,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("12:00");
  const [duration, setDuration] = useState("2");
  const [vehicleId, setVehicleId] = useState("v1");
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return parseFloat(duration) * pricePerHour;
  };

  const calculateEndTime = () => {
    if (!startTime) return "";
    
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHours = hours + parseInt(duration);
    
    if (endHours >= 24) {
      return `${endHours - 24}:${minutes.toString().padStart(2, "0")}`;
    }
    return `${endHours}:${minutes.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send booking data to an API
    console.log("Booking submitted:", {
      mallId,
      slotId: selectedSlotId,
      date,
      startTime,
      endTime: calculateEndTime(),
      duration,
      vehicleId,
      price: calculateTotalPrice()
    });

    // Show a success message and navigate to bookings page
    alert("Booking confirmed successfully!");
    navigate("/bookings");
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-parkBlue-50">
        <CardTitle className="text-parkBlue-600">Booking Details</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Location</h4>
            <p className="text-lg font-medium text-parkBlue-500">{mallName}</p>
          </div>
          
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-1">Date</h4>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-10"
                >
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Start Time</h4>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, "0");
                    return [
                      <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                        {`${hour}:00`}
                      </SelectItem>,
                      <SelectItem key={`${hour}:30`} value={`${hour}:30`}>
                        {`${hour}:30`}
                      </SelectItem>
                    ];
                  }).flat()}
                </SelectContent>
              </Select>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Duration</h4>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(hours => (
                    <SelectItem key={hours} value={hours.toString()}>
                      {hours} {hours === 1 ? "hour" : "hours"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Vehicle</h4>
            <Select value={vehicleId} onValueChange={setVehicleId}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v1">Sedan - ABC123</SelectItem>
                <SelectItem value="v2">SUV - XYZ789</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {selectedSlotId && (
            <div>
              <h4 className="text-sm font-medium mb-1">Slot Number</h4>
              <p className="text-lg font-medium text-parkTeal-500">{selectedSlotId.replace('s', '')}</p>
            </div>
          )}
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Parking Fee</h4>
              <p className="text-lg font-medium">${pricePerHour.toFixed(2)}/hr</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <h4 className="text-sm font-medium">Duration</h4>
              <p>{duration} {parseInt(duration) === 1 ? "hour" : "hours"}</p>
            </div>
            <div className="flex justify-between items-center mt-2 text-parkBlue-600 font-bold">
              <h4>Total</h4>
              <p>${calculateTotalPrice().toFixed(2)}</p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button 
          className="bg-parkBlue-500 hover:bg-parkBlue-600"
          onClick={handleSubmit}
          disabled={!selectedSlotId}
        >
          {selectedSlotId ? "Confirm & Pay" : "Select a Slot First"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
