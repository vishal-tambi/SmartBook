
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCode from "./QRCode";

const UserProfileCard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+1 234 567 890");
  const [vehicles, setVehicles] = useState([
    { id: "v1", type: "sedan", licensePlate: "ABC123", size: "medium" }
  ]);

  const [newVehicleType, setNewVehicleType] = useState("sedan");
  const [newVehiclePlate, setNewVehiclePlate] = useState("");
  const [newVehicleSize, setNewVehicleSize] = useState("medium");

  const handleAddVehicle = () => {
    if (newVehiclePlate.trim() === "") return;

    setVehicles([
      ...vehicles,
      {
        id: `v${vehicles.length + 1}`,
        type: newVehicleType as any,
        licensePlate: newVehiclePlate,
        size: newVehicleSize as any
      }
    ]);

    setNewVehiclePlate("");
  };

  const handleRemoveVehicle = (id: string) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-md">
      <CardHeader className="bg-parkBlue-500 text-white">
        <CardTitle className="text-2xl">My Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile" className="flex-1">Profile Details</TabsTrigger>
            <TabsTrigger value="vehicles" className="flex-1">My Vehicles</TabsTrigger>
            <TabsTrigger value="qrcode" className="flex-1">My QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={fullName} 
                    onChange={e => setFullName(e.target.value)} 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-parkBlue-500 hover:bg-parkBlue-600">
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Registered Vehicles</h3>
                <p className="text-sm text-gray-500">
                  Add your vehicles to quickly complete bookings
                </p>
              </div>

              {vehicles.length > 0 ? (
                <div className="space-y-3">
                  {vehicles.map(vehicle => (
                    <div 
                      key={vehicle.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="uppercase font-medium">{vehicle.licensePlate}</span>
                          <span className="text-xs bg-parkBlue-100 text-parkBlue-700 px-2 py-1 rounded-full">
                            {vehicle.type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 capitalize">{vehicle.size} size</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveVehicle(vehicle.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-4 text-center text-gray-500">
                  No vehicles added yet
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="text-md font-medium mb-2">Add New Vehicle</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="vehicle-type">Type</Label>
                    <Select value={newVehicleType} onValueChange={setNewVehicleType}>
                      <SelectTrigger id="vehicle-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="license-plate">License Plate</Label>
                    <Input 
                      id="license-plate" 
                      value={newVehiclePlate} 
                      onChange={e => setNewVehiclePlate(e.target.value)} 
                      placeholder="ABC123" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicle-size">Size</Label>
                    <Select value={newVehicleSize} onValueChange={setNewVehicleSize}>
                      <SelectTrigger id="vehicle-size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button 
                  onClick={handleAddVehicle}
                  disabled={!newVehiclePlate.trim()}
                  className="mt-4 bg-parkBlue-500 hover:bg-parkBlue-600"
                >
                  Add Vehicle
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qrcode" className="animate-fade-in">
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <h3 className="text-xl font-medium">Your Parking Access Code</h3>
              <p className="text-sm text-gray-500 text-center max-w-md">
                Show this QR code at the mall entrance for quick access to your reserved parking spot
              </p>
              <div className="my-6">
                <QRCode value={`parksmart:user:u1:${Date.now()}`} size={200} />
              </div>
              <Button variant="outline" className="mt-4">
                Download QR Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
