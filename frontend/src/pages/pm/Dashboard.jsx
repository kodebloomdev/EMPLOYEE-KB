import React from "react";
import api from "../../api.js";
import { useQuery } from "@tanstack/react-query";

export default function PMDashboard() {
  // Fetch notifications
  const {
    data: notifications = [],
    isLoading: notifLoading,
    isError: notifError,
  } = useQuery({
    queryKey: ["pm-notifs"],
    queryFn: async () => {
      const res = await api.get("/api/pm/notifications");
      // Ensure always return array
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Fetch employees
  const {
    data: employees = [],
    isLoading: empLoading,
    isError: empError,
  } = useQuery({
    queryKey: ["pm-employees"],
    queryFn: async () => {
      const res = await api.get("/api/pm/employees");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Project Manager Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Notifications</h2>
          {notifLoading && <p>Loading notifications...</p>}
          {notifError && <p className="text-red-500">Error loading notifications</p>}
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li key={n._id} className="border rounded-xl p-2">
                {n.title}
              </li>
            ))}
            {notifications.length === 0 && !notifLoading && (
              <li className="text-gray-600">No notifications</li>
            )}
          </ul>
        </div>

        {/* Employees */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Your Employees</h2>
          {empLoading && <p>Loading employees...</p>}
          {empError && <p className="text-red-500">Error loading employees</p>}
          <ul className="space-y-2">
            {employees.map((e) => (
              <li key={e._id} className="border rounded-xl p-2">
                {e.employeeId} - {e.name} ({e.designation})
              </li>
            ))}
            {employees.length === 0 && !empLoading && (
              <li className="text-gray-600">No employees</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
