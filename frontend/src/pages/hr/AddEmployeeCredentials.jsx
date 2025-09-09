import React from "react";
import { useNavigate } from "react-router-dom";

const employeeDetails = [
  { id: 1, name: "Alice Johnson", position: "Software Engineer", role: "Employee", joiningDate: "2025-09-01", salary: "$80,000", email :"Alice@gmail.com" },
  { id: 2, name: "Bob Smith", position: "Product Manager", role: "ProjectManager", joiningDate: "2025-05-15", salary: "$95,000", email: "Bob@gmail.com" },
  { id: 3, name: "Charlie Brown", position: "UX Designer", role: "Employee", joiningDate: "2021-11-20", salary: "$70,000", email: "Charlie@gmail.com" },
];

const AddEmployeeCredentials = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">All Employee Details</h1>

      <div className="grid gap-6">
        {employeeDetails.map((employee) => (
          <div
            key={employee.id}
            className="p-6 bg-white rounded-lg shadow border border-gray-200 space-y-3"
          >
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p><span className="font-medium">Position:</span> {employee.position}</p>
            <p><span className="font-medium">Role:</span> {employee.role}</p>
            <p><span className="font-medium">Joining Date:</span> {employee.joiningDate}</p>
            <p><span className="font-medium">Salary:</span> {employee.salary}</p>
            <p><span className="font-medium">Email:</span> {employee.email}</p>

            <button
              onClick={() =>
                navigate("/hr/credentials", {
                  state: { employee, empId: employee.id }, // ✅ send both
                })
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Give Credentials
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddEmployeeCredentials;
