import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const credentials = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee, empId } = location.state || {};

  if (!employee) {
    return (
      <div className="p-6">
        <p>No employee selected.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Give Credentials</h1>

      <div className="p-6 bg-white rounded-lg shadow border border-gray-200 space-y-3">
        <h2 className="text-xl font-semibold">{employee.name}</h2>
        <p><span className="font-medium">Email:</span> {employee.email}</p>
        <p><span className="font-medium">Role:</span> {employee.role}</p>
        <p><span className="font-medium">Department:</span> {employee.department}</p>
        <p><span className="font-medium">Status:</span> {employee.status}</p>

        {/* Dummy input for giving credentials */}
        <div className="mt-4 space-y-2">
          <label className="block font-medium">Username</label>
          <input
            type="text"
            defaultValue={employee.email}
            className="w-full border p-2 rounded"
          />

          <label className="block font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border p-2 rounded"
          />
        </div>

        <button onSubmit={alert("Save submitted")} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save Credentials
        </button>
      </div>
    </div>
  );
};

export default credentials;
