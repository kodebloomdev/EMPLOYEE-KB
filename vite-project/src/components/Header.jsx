import { useState, useEffect } from "react";

const Header = ({ toggleSidebar }) => {
  const [lastLoginTime, setLastLoginTime] = useState("");

  useEffect(() => {
    const now = new Date();
    // Format: Fri, Aug 29, 2025, 12:12:25 PM
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

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white px-6 h-16 fixed top-0 left-0 right-0 z-50 flex justify-between items-center shadow-lg">
      {/* Left Section - Logo + Company */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle (mobile only) */}
        <button
          className="menu-toggle md:hidden text-white text-2xl"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i>
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
        <div className="login-time bg-blue-800 text-white py-1 px-4 rounded-full text-sm shadow-md">
          Last login: <span className="font-medium">{lastLoginTime}</span>
        </div>

        {/* User Profile */}
        <div className="user-profile flex items-center gap-3">
          <div className="profile-img w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow">
            JD
          </div>
          <div className="font-medium">John Director</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
