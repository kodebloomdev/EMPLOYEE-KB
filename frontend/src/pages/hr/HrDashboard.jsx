import React, { useState, useEffect } from "react";
import HrWelcomePage from "./HRWelcomepage";


const HrDashboard = () => {
  const [lastLoginTime, setLastLoginTime] = useState("");

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

  return (
    <div className="min-h-screen bg-white flex justify-center px-4 py-6">
      <div className="w-full max-w-7xl space-y-6">
        {/* HrWelcomePage - moved up */}
        <div className="mb-4">
          <HrWelcomePage />
        </div>

        {/* HR Section */}
        <div className="border-2 border-gray-300 rounded-lg p-6 space-y-6 bg-white shadow">
          {/* Large HR Details Card with Image */}
          <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
              <img
                src="https://via.placeholder.com/150"
                alt="HR Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">HR Details</h2>
              <p className="text-gray-700 mt-3">Name: John Director</p>
              <p className="text-gray-700">Email: john.director@kodebloom.com</p>
              <p className="text-gray-700">Department: Human Resources</p>
              <p className="text-gray-500 text-lg mt-2">
                Profile created on: Jan 15, 2018
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Last login: {lastLoginTime}
              </p>
            </div>
          </div>

          {/* Two smaller cards below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800">Employees Assigned</h2>
              <p className="text-4xl font-extrabold text-blue-900 mt-4">25</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800">Teams </h2>
              <p className="text-4xl font-extrabold text-blue-900 mt-4">15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
