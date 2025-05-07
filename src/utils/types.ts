
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  vehicles: Vehicle[];
  qrCode?: string;
  loyaltyPoints: number;
}

export interface Vehicle {
  id: string;
  type: 'sedan' | 'suv' | 'compact' | 'truck' | 'motorcycle';
  licensePlate: string;
  size: 'small' | 'medium' | 'large';
}

export interface Mall {
  id: string;
  name: string;
  address: string;
  distance?: string;
  image: string;
  totalSpots: number;
  availableSpots: number;
  pricePerHour: number;
  amenities: string[];
  rating: number;
  latitude: number;
  longitude: number;
}

export interface ParkingSlot {
  id: string;
  floor: number;
  section: string;
  number: number;
  type: 'regular' | 'premium' | 'disabled' | 'electric';
  isAvailable: boolean;
  isNearExit: boolean;
  isShaded: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  mallId: string;
  slotId: string;
  vehicleId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  totalPrice: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: Date;
}
