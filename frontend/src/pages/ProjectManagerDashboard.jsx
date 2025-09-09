import React, { useState, useEffect } from "react";
import { Bell, FileText, Users, CheckCircle } from "lucide-react";

const dummyNotifications = [
  {
    id: 1,
    title: "Website Redesign",
    description: "HR assigned project to redesign the company website.",
    timeline: "2025-09-15 to 2025-12-01",
    files: ["wireframe.pdf", "requirements.docx"],
    status: "Pending",
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "HR assigned project for mobile app launch.",
    timeline: "2025-10-01 to 2026-01-10",
    files: ["app-flow.pptx"],
    status: "In Progress",
  },
];

export default function ProjectManagerDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [assignType, setAssignType] = useState("team");

  useEffect(() => {
    // Later fetch from backend:
    // axios.get("/api/projects/assigned-to-pm").then(res => setNotifications(res.data));
    setNotifications(dummyNotifications);
  }, []);

  const handleAssign = () => {
    alert(
      `Project "${selectedProject.title}" assigned to ${assignType === "team" ? "Team" : "Individual"}`
    );
    setSelectedProject(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-xl font-bold text-blue-600 mb-6">PM Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Bell size={18} /> Notifications
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <FileText size={18} /> Projects
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Users size={18} /> Teams
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <CheckCircle size={18} /> Status
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Assigned Projects</h1>
        {notifications.length === 0 ? (
          <p>No new project notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((note) => (
              <li
                key={note.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedProject(note)}
              >
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <p className="text-gray-600">{note.description}</p>
                <span className="text-sm text-gray-500">{note.timeline}</span>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">
            <h2 className="text-xl font-bold mb-2">{selectedProject.title}</h2>
            <p className="mb-3">{selectedProject.description}</p>
            <p className="text-sm text-gray-600 mb-2">
              Timeline: {selectedProject.timeline}
            </p>
            <p className="text-sm font-medium">Attached Files:</p>
            <ul className="list-disc pl-6 mb-3">
              {selectedProject.files.map((file, idx) => (
                <li key={idx}>{file}</li>
              ))}
            </ul>
            <p className="mb-3">
              <span className="font-semibold">Status:</span>{" "}
              {selectedProject.status}
            </p>

            {/* Assign Section */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">Assign To:</label>
              <select
                className="border rounded p-2 w-full"
                value={assignType}
                onChange={(e) => setAssignType(e.target.value)}
              >
                <option value="team">Team</option>
                <option value="individual">Individual</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={handleAssign}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
