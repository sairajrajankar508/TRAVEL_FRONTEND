import { useEffect, useState } from "react";

import {

  FaClipboardList,

  FaCheckCircle,

  FaTimesCircle,

  FaClock,

} from "react-icons/fa";

const ManagerDashboard = () => {

  const token =
    localStorage.getItem("token");

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH REQUESTS
  useEffect(() => {

    const fetchRequests =
      async () => {

        try {

          const res =
            await fetch(
              "http://localhost:8080/manager/requests",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          if (!res.ok) {
            throw new Error(
              "Failed to fetch requests"
            );
          }

          const data =
            await res.json();

          setRequests(
            Array.isArray(data)
              ? data
              : []
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchRequests();

  }, [token]);

  // COUNTS
  const totalRequests =
    requests.length;

  const pendingRequests =
    requests.filter(
      (r) =>
        r.status ===
          "SUBMITTED" ||
        r.status ===
          "PENDING"
    ).length;

  const approvedRequests =
    requests.filter(
      (r) =>
        r.status ===
          "MANAGER_APPROVED"
    ).length;

  const rejectedRequests =
    requests.filter(
      (r) =>
        r.status ===
          "REJECTED"
    ).length;

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 p-6">

      {/* PAGE TITLE */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">

          Manager Dashboard

        </h1>

        <p className="text-slate-500 mt-1">

          Monitor and manage employee travel requests

        </p>

      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* TOTAL */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Total Requests
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalRequests}
              </h2>

            </div>

            <FaClipboardList className="text-4xl text-blue-500" />

          </div>

        </div>

        {/* PENDING */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Pending
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {pendingRequests}
              </h2>

            </div>

            <FaClock className="text-4xl text-yellow-500" />

          </div>

        </div>

        {/* APPROVED */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Approved
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {approvedRequests}
              </h2>

            </div>

            <FaCheckCircle className="text-4xl text-green-500" />

          </div>

        </div>

        {/* REJECTED */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Rejected
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {rejectedRequests}
              </h2>

            </div>

            <FaTimesCircle className="text-4xl text-red-500" />

          </div>

        </div>

      </div>

      {/* REQUEST TABLE */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-xl font-semibold text-slate-800">

            Recent Travel Requests

          </h2>

        </div>

        {loading ? (

          <div className="p-6">

            <p>Loading requests...</p>

          </div>

        ) : requests.length === 0 ? (

          <div className="p-6">

            <p className="text-slate-500">

              No travel requests found

            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="p-4 text-left">
                    Employee
                  </th>

                  <th className="p-4 text-left">
                    Destination
                  </th>

                  <th className="p-4 text-left">
                    Purpose
                  </th>

                  <th className="p-4 text-left">
                    Budget
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {requests.map((req) => (

                  <tr
                    key={req.id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    <td className="p-4 font-medium">

                      {req.employeeName ||
                        "Employee"}

                    </td>

                    <td className="p-4">

                      {req.destination}

                    </td>

                    <td className="p-4">

                      {req.purpose}

                    </td>

                    <td className="p-4">

                      ₹ {req.budget}

                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          req.status ===
                          "MANAGER_APPROVED"
                            ? "bg-green-100 text-green-700"
                            : req.status ===
                              "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {req.status}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );
};

export default ManagerDashboard;