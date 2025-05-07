
import { Mall, ParkingSlot, Notification } from './types';

export const malls: Mall[] = [
  {
    id: 'm1',
    name: 'Central Plaza Mall',
    address: '123 Main Street, Downtown',
    distance: '0.5 miles',
    image: 'https://images.unsplash.com/photo-1581541234263-31f7c8f5dddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    totalSpots: 500,
    availableSpots: 120,
    pricePerHour: 3.50,
    amenities: ['Restaurants', 'Cinema', 'EV Charging'],
    rating: 4.5,
    latitude: 40.7128,
    longitude: -74.0060
  },
  {
    id: 'm2',
    name: 'Waterfront Shopping Center',
    address: '456 Harbor View, Bayside',
    distance: '1.2 miles',
    image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    totalSpots: 750,
    availableSpots: 230,
    pricePerHour: 4.00,
    amenities: ['Food Court', 'Kids Area', 'Valet'],
    rating: 4.7,
    latitude: 40.7282,
    longitude: -74.0776
  },
  {
    id: 'm3',
    name: 'Greenfield Mall',
    address: '789 Park Avenue, Suburb',
    distance: '2.8 miles',
    image: 'https://images.unsplash.com/photo-1519567770579-c2fc5208d84f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    totalSpots: 350,
    availableSpots: 90,
    pricePerHour: 2.50,
    amenities: ['Free Wifi', 'Supermarket', 'Food Court'],
    rating: 4.2,
    latitude: 40.7023,
    longitude: -74.0232
  },
  {
    id: 'm4',
    name: 'Tech Heights Mall',
    address: '101 Innovation Drive, Tech District',
    distance: '3.5 miles',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b46265f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    totalSpots: 600,
    availableSpots: 150,
    pricePerHour: 5.00,
    amenities: ['EV Charging', 'Smart Lockers', 'Premium Stores'],
    rating: 4.8,
    latitude: 40.7589,
    longitude: -73.9851
  }
];

export const parkingSlots: ParkingSlot[] = [
  { id: 's1', floor: 1, section: 'A', number: 1, type: 'regular', isAvailable: true, isNearExit: true, isShaded: false },
  { id: 's2', floor: 1, section: 'A', number: 2, type: 'regular', isAvailable: false, isNearExit: true, isShaded: false },
  { id: 's3', floor: 1, section: 'A', number: 3, type: 'premium', isAvailable: true, isNearExit: false, isShaded: true },
  { id: 's4', floor: 1, section: 'A', number: 4, type: 'disabled', isAvailable: true, isNearExit: true, isShaded: true },
  { id: 's5', floor: 1, section: 'B', number: 5, type: 'regular', isAvailable: true, isNearExit: false, isShaded: false },
  { id: 's6', floor: 1, section: 'B', number: 6, type: 'regular', isAvailable: false, isNearExit: false, isShaded: false },
  { id: 's7', floor: 1, section: 'B', number: 7, type: 'electric', isAvailable: true, isNearExit: false, isShaded: false },
  { id: 's8', floor: 1, section: 'B', number: 8, type: 'regular', isAvailable: true, isNearExit: false, isShaded: false },
  { id: 's9', floor: 2, section: 'C', number: 9, type: 'regular', isAvailable: true, isNearExit: true, isShaded: false },
  { id: 's10', floor: 2, section: 'C', number: 10, type: 'regular', isAvailable: true, isNearExit: true, isShaded: false },
  { id: 's11', floor: 2, section: 'C', number: 11, type: 'premium', isAvailable: false, isNearExit: false, isShaded: true },
  { id: 's12', floor: 2, section: 'C', number: 12, type: 'regular', isAvailable: true, isNearExit: false, isShaded: true },
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u1',
    title: 'Booking Confirmed',
    message: 'Your parking slot at Central Plaza Mall has been confirmed for today at 2:00 PM.',
    type: 'success',
    isRead: false,
    createdAt: new Date()
  },
  {
    id: 'n2',
    userId: 'u1',
    title: 'Parking Expiring Soon',
    message: 'Your parking time at Waterfront Shopping Center will expire in 30 minutes. Extend now to avoid penalties.',
    type: 'warning',
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: 'n3',
    userId: 'u1',
    title: 'Special Offer',
    message: 'Get 20% off on your next parking booking at Tech Heights Mall!',
    type: 'info',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];
