
import React from "react";
import { cn } from "@/lib/utils";
import { ParkingSlot as ParkingSlotType } from "@/utils/types";

interface ParkingSlotProps {
  slot: ParkingSlotType;
  isSelected: boolean;
  onSelect: (slotId: string) => void;
}

const ParkingSlot: React.FC<ParkingSlotProps> = ({ 
  slot, 
  isSelected, 
  onSelect
}) => {
  const handleClick = () => {
    if (slot.isAvailable) {
      onSelect(slot.id);
    }
  };

  // Determine the styling based on the slot type and availability
  const getSlotStyles = () => {
    let baseStyles = "h-12 w-16 rounded-md flex items-center justify-center cursor-pointer transition-all border";
    
    if (!slot.isAvailable) {
      return `${baseStyles} bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed`;
    }
    
    if (isSelected) {
      return `${baseStyles} bg-parkTeal-500 border-parkTeal-700 text-white font-medium transform scale-105 shadow-md`;
    }
    
    switch (slot.type) {
      case 'premium':
        return `${baseStyles} bg-parkTeal-100 border-parkTeal-300 text-parkTeal-700 hover:bg-parkTeal-200`;
      case 'disabled':
        return `${baseStyles} bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200`;
      case 'electric':
        return `${baseStyles} bg-green-100 border-green-300 text-green-700 hover:bg-green-200`;
      default:
        return `${baseStyles} bg-white border-gray-200 hover:bg-gray-50 text-gray-700`;
    }
  };

  // Icon based on slot type
  const renderSlotIcon = () => {
    switch (slot.type) {
      case 'disabled':
        return (
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2M12 5v9m-3 0h6" />
          </svg>
        );
      case 'electric':
        return (
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'premium':
        return (
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l6 6L17 3M3 12h18M5 21l6-6 6 6" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(getSlotStyles(), "select-none")}
      onClick={handleClick}
      title={`Slot ${slot.section}${slot.number} - ${slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}`}
    >
      <div className="flex items-center">
        {renderSlotIcon()}
        <span>{slot.section}{slot.number}</span>
      </div>
    </div>
  );
};

export default ParkingSlot;
