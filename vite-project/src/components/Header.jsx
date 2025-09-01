import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";


const Header = ({ toggleSidebar }) => {
  const [lastLoginTime, setLastLoginTime] = useState("");
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    setLastLoginTime(formattedDate);
  }, []);

  const clearNotifications = () => {
    setNotificationCount(0);
    setShowNotifications(false);
  };

  const notifications = [
    { id: 1, text: "New message from Sarah", time: "10 mins ago" },
    { id: 2, text: "Meeting starts in 15 minutes", time: "25 mins ago" },
    { id: 3, text: "Your report is ready", time: "2 hours ago" }
  ];

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-900 to-blue-900 text-white px-6 h-16 fixed top-0 left-0 right-0 z-50 flex justify-between items-center shadow-lg">
      {/* Left Section - Logo + Company */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle (mobile only) */}
        <button
          className="menu-toggle md:hidden text-white text-2xl"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Logo */}
        <div className="logo w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-blue-900 text-lg shadow-md">
          KB
        </div>

        {/* Company Name */}
        <div className="company-name leading-tight">
          <h1 className="text-xl font-bold">KodeBloom</h1>
          <p className="text-xs opacity-90">Technology and Services Pvt. Ltd.</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="header-right flex items-center gap-5">
        {/* Last Login pill */}
        <div className="login-time bg-blue-900 text-white py-1 px-4 rounded-full text-sm shadow-md hidden md:block">
          Last login: <span className="font-medium">{lastLoginTime}</span>
        </div>

        {/* Notification Bell Icon - WHITE */}
        <div className="relative">
          <button 
            className="text-white p-2 rounded-full hover:bg-blue-900 transition-colors relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            {/* White bell icon */}
            <FontAwesomeIcon icon={faBell} className="text-xl text-white" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
          
          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
              <div className="p-3 bg-blue-900 text-white font-bold flex justify-between items-center">
                <span>Notifications ({notificationCount})</span>
                <button 
                  onClick={clearNotifications}
                  className="text-xs bg-blue-900 hover:bg-blue-900 px-2 py-1 rounded"
                >
                  Clear All
                </button>
              </div>
              
              <div className="max-h-60 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className="border-b border-gray-100 last:border-b-0">
                    <div className="p-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-2 text-center bg-gray-100">
                <button className="text-blue-900 text-sm hover:text-blue-900">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="user-profile flex items-center gap-3">
          <div className="profile-img w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow">
            JD
          </div>
          <div className="font-medium hidden md:block">John Director</div>
        </div>
      </div>
    </header>
  );
};

export default Header;