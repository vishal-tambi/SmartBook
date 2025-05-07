
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Notification } from "@/utils/types";
import { format } from "date-fns";

interface NotificationCardProps {
  notification: Notification;
  onReadChange: (id: string, isRead: boolean) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onReadChange
}) => {
  const [isRead, setIsRead] = useState(notification.isRead);
  
  const handleMarkAsRead = () => {
    const newState = !isRead;
    setIsRead(newState);
    onReadChange(notification.id, newState);
  };
  
  const getNotificationTypeStyles = () => {
    switch (notification.type) {
      case 'success':
        return "bg-green-100 border-green-300 text-green-800";
      case 'warning':
        return "bg-amber-100 border-amber-300 text-amber-800";
      case 'error':
        return "bg-red-100 border-red-300 text-red-800";
      default:
        return "bg-blue-100 border-blue-300 text-blue-800";
    }
  };
  
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'success':
        return (
          <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center text-green-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="h-10 w-10 rounded-full bg-red-200 flex items-center justify-center text-red-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
    }
  };
  
  return (
    <div 
      className={cn(
        "border rounded-lg p-4 transition-all duration-200",
        isRead ? "bg-white" : "bg-blue-50",
        "hover:shadow-md"
      )}
    >
      <div className="flex items-start space-x-4">
        {getNotificationIcon()}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className={cn("font-medium", !isRead && "font-semibold")}>
              {notification.title}
            </h4>
            <span className="text-xs text-gray-500">
              {format(notification.createdAt, 'MMM d, h:mm a')}
            </span>
          </div>
          <p className="text-sm mt-1 text-gray-700">{notification.message}</p>
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleMarkAsRead}
              className="text-xs text-parkBlue-500 hover:text-parkBlue-700 font-medium"
            >
              Mark as {isRead ? 'unread' : 'read'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
