import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HrCredentialsAdd = () => {
  const [fetchHr, setFetchHr] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/fetchnotifications")
      .then((res) => setFetchHr(res.data))
      .catch((err) => console.error("Error fetching notifications:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">All HR Details</h1>

      {loading ? (
        <p>Loading HR...</p>
      ) : fetchHr.length === 0 ? (
        <p>No HR found.</p>
      ) : (
        <div className="grid gap-6">
          {fetchHr
            .filter((hr) => hr.data?.role?.toLowerCase() === "hr")
            .map((hr) => (
              <div
                key={hr._id}
                className="p-6 bg-white rounded-lg shadow border border-gray-200 space-y-3"
              >
                <h2 className="text-xl font-semibold">{hr.data.name}</h2>
                <p>
                  <span className="font-medium">Role:</span> {hr.data.role}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {hr.data.email}
                </p>
                <p>
                  <span className="font-medium">Mobile:</span> {hr.data.mobile}
                </p>

                {/* Assign button */}
                <button
                  onClick={() =>
                    navigate(
                      `/director/assign-credentials/${hr.data.employeeId}`,
                      { state: { hrData: hr.data, notificationId: hr._id } }
                    )
                  }
                  className="mt-3 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Assign Credentials
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default HrCredentialsAdd;
