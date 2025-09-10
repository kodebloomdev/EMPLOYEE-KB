import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployeeCredentials = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/fetchEmployees")
      .then((response) => {
        setEmployeeDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">All Employee Details</h1>

      {loading ? (
        <p>Loading employees...</p>
      ) : employeeDetails.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="grid gap-6">
          {employeeDetails.map((employee) => (
            <div
              key={employee.id}
              className="p-6 bg-white rounded-lg shadow border border-gray-200 space-y-3"
            >
              <h2 className="text-xl font-semibold">{employee.name}</h2>
              <p><span className="font-medium">Position:</span> {employee.position}</p>
              <p><span className="font-medium">Role:</span> {employee.role}</p>
              <p><span className="font-medium">Department:</span> {employee.department}</p>
              <p><span className="font-medium">Salary:</span> {employee.salary}</p>
              <p><span className="font-medium">Email:</span> {employee.email}</p>
              <p><span className="font-medium">Mobile:</span> {employee.mobile}</p>
              <p><span className="font-medium">Status:</span> {employee.status}</p>
              <p><span className="font-medium">DOB:</span> {employee.dob}</p>

              <button
                onClick={() =>
                  navigate("/hr/credentials", {
                    state: { employee, empId: employee.id },
                  })
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Give Credentials
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddEmployeeCredentials;
