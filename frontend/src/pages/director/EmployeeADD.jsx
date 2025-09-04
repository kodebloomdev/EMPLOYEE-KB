import React, { useState } from "react";
import api from "../../api.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function EmployeeADD() {
  const [activeTab, setActiveTab] = useState("EMPLOYEE"); // EMPLOYEE | PM | HR
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const qc = useQueryClient();

  // Fetch lists
  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => (await api.get("/director/employees")).data,
  });

  const { data: hrs } = useQuery({
    queryKey: ["hrs"],
    queryFn: async () => (await api.get("/director/hrs")).data,
  });

  const { data: pms } = useQuery({
    queryKey: ["pms"],
    queryFn: async () => (await api.get("/director/pms")).data,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);

    if (activeTab === "EMPLOYEE") {
      await api.post("/director/employees", {
        name: fd.get("name"),
        dob: fd.get("dob"),
        contactNumber: fd.get("contactNumber"),
        email: fd.get("email"),
        employeeId: fd.get("employeeId"),
        designation: fd.get("designation"),
        assignedManager: fd.get("assignedManager"),
        assignedHR: fd.get("assignedHR"),
      });
      qc.invalidateQueries({ queryKey: ["employees"] });
    }

    if (activeTab === "HR") {
      await api.post("/director/create-hr", {
        name: fd.get("name"),
        email: fd.get("email"),
        password: fd.get("password"),
      });
      qc.invalidateQueries({ queryKey: ["hrs"] });
    }

    if (activeTab === "PM") {
      await api.post("/director/create-pm", {
        name: fd.get("name"),
        email: fd.get("email"),
        password: fd.get("password"),
      });
      qc.invalidateQueries({ queryKey: ["pms"] });
    }

    setShowModal(false);
    e.target.reset();
  };

  // Render table data
  const renderTable = (data, type) => (
    <div className="bg-white p-4 rounded-2xl shadow mt-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{type} List</h2>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
          onClick={() => setShowModal(true)}
        >
          + Add {type}
        </button>
      </div>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            {type === "Employee" && (
              <>
                <th className="p-2">Employee ID</th>
                <th className="p-2">Designation</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((u, i) => (
            <tr key={u._id} className="border-b hover:bg-gray-50">
              <td className="p-2 text-center">{i + 1}</td>
              <td className="p-2 text-center">{u.name}</td>
              <td className="p-2 text-center">{u.email}</td>
              {type === "Employee" && (
                <>
                  <td className="p-2 text-center">{u.employeeId}</td>
                  <td className="p-2 text-center">{u.designation}</td>
                </>
              )}
            </tr>
          ))}
          {!data?.length && (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No {type}s found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Director Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["EMPLOYEE", "PM", "HR"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl ${
              activeTab === t
                ? "bg-indigo-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Data Tables */}
      {activeTab === "EMPLOYEE" && renderTable(employees, "Employee")}
      {activeTab === "PM" && renderTable(pms, "Project Manager")}
      {activeTab === "HR" && renderTable(hrs, "HR")}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Create {activeTab === "EMPLOYEE" ? "Employee" : activeTab}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {activeTab === "EMPLOYEE" && (
                <>
                  <input
                    name="name"
                    placeholder="Name"
                    required
                    className="border px-3 py-2 rounded-xl"
                  />
                  <input
                    name="dob"
                    type="date"
                    placeholder="DOB"
                    className="border px-3 py-2 rounded-xl"
                  />
                  <input
                    name="contactNumber"
                    placeholder="Contact Number"
                    className="border px-3 py-2 rounded-xl"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="border px-3 py-2 rounded-xl"
                  />
                  <input
                    name="employeeId"
                    placeholder="Employee ID"
                    required
                    className="border px-3 py-2 rounded-xl"
                  />
                  <select
                    name="designation"
                    className="border px-3 py-2 rounded-xl"
                  >
                    {[
                      "Trainee Engineer",
                      "Junior Engineer",
                      "Engineer",
                      "Senior Engineer",
                      "Lead Engineer",
                      "Assistant Engineer",
                      "Manager",
                    ].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <select
                    name="assignedManager"
                    className="border px-3 py-2 rounded-xl"
                  >
                    <option value="">-- Select PM --</option>
                    {pms?.map((pm) => (
                      <option key={pm._id} value={pm._id}>
                        {pm.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="assignedHR"
                    className="border px-3 py-2 rounded-xl"
                  >
                    <option value="">-- Select HR --</option>
                    {hrs?.map((hr) => (
                      <option key={hr._id} value={hr._id}>
                        {hr.name}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {activeTab !== "EMPLOYEE" && (
                <>
                  <input
                    name="name"
                    placeholder="Name"
                    required
                    className="border px-3 py-2 rounded-xl"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="border px-3 py-2 rounded-xl"
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="border px-3 py-2 rounded-xl"
                  />
                </>
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
