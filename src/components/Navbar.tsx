
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Book Parking", href: "/book" },
    { name: "My Bookings", href: "/bookings" },
    { name: "Notifications", href: "/notifications" }
  ];

  return (
    <nav className="bg-white border-b border-gray-100 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-parkBlue-500 h-8 w-8 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-parkBlue-600 font-bold text-lg ml-2">ParkSmart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {isLoggedIn ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-gray-700 hover:text-parkBlue-500 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/profile">
                  <div className="h-8 w-8 bg-parkTeal-500 rounded-full flex items-center justify-center text-white font-medium cursor-pointer">
                    U
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsLoggedIn(true)}
                  className="text-parkBlue-500 hover:text-parkBlue-600 hover:bg-parkBlue-100"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => setIsLoggedIn(true)}
                  className="bg-parkBlue-500 hover:bg-parkBlue-600 text-white"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-6">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="h-10 w-10 bg-parkTeal-500 rounded-full flex items-center justify-center text-white font-medium">
                          U
                        </div>
                        <div>
                          <p className="font-medium">User Name</p>
                          <p className="text-sm text-gray-500">user@example.com</p>
                        </div>
                      </div>
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.name}>
                          <Link
                            to={link.href}
                            className="py-2 px-1 hover:text-parkBlue-500 transition-colors block"
                          >
                            {link.name}
                          </Link>
                        </SheetClose>
                      ))}
                      <SheetClose asChild>
                        <Link
                          to="/profile"
                          className="py-2 px-1 hover:text-parkBlue-500 transition-colors block"
                        >
                          My Profile
                        </Link>
                      </SheetClose>
                      <Button 
                        variant="outline"
                        className="mt-4"
                        onClick={() => setIsLoggedIn(false)}
                      >
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Button 
                          variant="ghost" 
                          onClick={() => setIsLoggedIn(true)}
                          className="text-parkBlue-500 w-full justify-start"
                        >
                          Login
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button 
                          onClick={() => setIsLoggedIn(true)}
                          className="bg-parkBlue-500 hover:bg-parkBlue-600 text-white w-full"
                        >
                          Sign Up
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
