
import { Link } from "react-router-dom";
import { malls } from "@/utils/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MallList = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6">Popular Malls Nearby</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {malls.map((mall) => (
            <Link 
              to={`/mall/${mall.id}`} 
              key={mall.id}
              className="transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-parkBlue-300 rounded-xl"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={mall.image} 
                    alt={mall.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-parkBlue-500">
                      {mall.availableSpots} spots available
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-parkBlue-600 mb-1">{mall.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{mall.address}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-500">
                          {Array(5).fill(0).map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(mall.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">{mall.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{mall.distance}</p>
                      <p className="text-parkBlue-500 font-bold mt-1">${mall.pricePerHour.toFixed(2)}/hr</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {mall.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs font-normal">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MallList;
