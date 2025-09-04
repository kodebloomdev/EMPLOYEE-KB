
import React from 'react';
import api from '../../api.js';
import { useQuery } from '@tanstack/react-query';

export default function PMDashboard() {
  const { data: notifications } = useQuery({
    queryKey: ['pm-notifs'],
    queryFn: async () => (await api.get('/pm/notifications')).data
  });
  const { data: employees } = useQuery({
    queryKey: ['pm-employees'],
    queryFn: async () => (await api.get('/pm/employees')).data
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Project Manager Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Notifications</h2>
          <ul className="space-y-2">
            {notifications?.map(n => <li key={n._id} className="border rounded-xl p-2">{n.title}</li>)}
            {!notifications?.length && <li className="text-gray-600">No notifications</li>}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Your Employees</h2>
          <ul className="space-y-2">
            {employees?.map(e => <li key={e._id} className="border rounded-xl p-2">{e.employeeId} - {e.name} ({e.designation})</li>)}
            {!employees?.length && <li className="text-gray-600">No employees</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
