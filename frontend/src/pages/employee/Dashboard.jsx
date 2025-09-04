
import React from 'react';
import api from '../../api.js';
import { useQuery } from '@tanstack/react-query';

export default function EmployeeDashboard() {
  const { data: profile } = useQuery({
    queryKey: ['employee-profile'],
    queryFn: async () => (await api.get('/employee/me')).data
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
      {profile ? (
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-lg font-medium">{profile.name} ({profile.designation})</div>
          <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700 mt-2">
            <div>Employee ID: {profile.employeeId}</div>
            <div>Email: {profile.email}</div>
            <div>Contact: {profile.contactNumber}</div>
            <div>Manager: {profile.assignedManager ? profile.assignedManager.name : '-'}</div>
            <div>HR: {profile.assignedHR ? profile.assignedHR.name : '-'}</div>
          </div>
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
}
