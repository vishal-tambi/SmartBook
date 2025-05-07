
import { useState } from "react";
import Navbar from "@/components/Navbar";
import NotificationCard from "@/components/NotificationCard";
import { Button } from "@/components/ui/button";
import { notifications as mockNotifications } from "@/utils/data";

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const handleReadChange = (id: string, isRead: boolean) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, isRead }
        : notification
    ));
  };
  
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-parkBlue-600">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 text-base bg-parkBlue-100 text-parkBlue-600 px-2 py-1 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </h1>
          <div className="space-x-3">
            {notifications.length > 0 && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleMarkAllRead}
                  className="text-xs"
                  disabled={unreadCount === 0}
                >
                  Mark All Read
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClearAll}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationCard 
                key={notification.id}
                notification={notification}
                onReadChange={handleReadChange}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No Notifications</h3>
              <p className="text-gray-500">
                You don't have any notifications at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
