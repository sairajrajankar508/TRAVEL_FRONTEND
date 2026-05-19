import { useEffect, useState } from "react";

import {

  FaPlane,

  FaClock,

  FaCheck,

  FaTimes,

} from "react-icons/fa";

const EmployeeDashboard = () => {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const res =
            await fetch(
              "http://localhost:8080/employee/requests",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          setRequests(data);

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchData();

  });

  // COUNTS
  const total =
    requests.length;

  const pending =
    requests.filter(
      (r) =>
        r.status === "SUBMITTED" ||
        r.status === "DRAFT"
    ).length;

  const approved =
    requests.filter(
      (r) =>
        r.status ===
        "MANAGER_APPROVED"
    ).length;

  const rejected =
    requests.filter(
      (r) =>
        r.status === "REJECTED"
    ).length;

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 p-6">



      {/* STATS CARDS (admin style same) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* TOTAL */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">

          <div className="flex justify-between">

            <h2 className="text-gray-500">

              Total Requests

            </h2>

            <FaPlane className="text-blue-500" />

          </div>

          <p className="text-3xl font-bold mt-2">

            {total}

          </p>

        </div>

        {/* PENDING */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">

          <div className="flex justify-between">

            <h2 className="text-gray-500">

              Pending

            </h2>

            <FaClock className="text-yellow-500" />

          </div>

          <p className="text-3xl font-bold mt-2">

            {pending}

          </p>

        </div>

        {/* APPROVED */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">

          <div className="flex justify-between">

            <h2 className="text-gray-500">

              Approved

            </h2>

            <FaCheck className="text-green-500" />

          </div>

          <p className="text-3xl font-bold mt-2">

            {approved}

          </p>

        </div>

        {/* REJECTED */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">

          <div className="flex justify-between">

            <h2 className="text-gray-500">

              Rejected

            </h2>

            <FaTimes className="text-red-500" />

          </div>

          <p className="text-3xl font-bold mt-2">

            {rejected}

          </p>

        </div>

      </div>

      {/* TABLE SECTION */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-lg font-semibold mb-4">

          My Travel Requests

        </h2>

        {loading ? (

          <p>Loading...</p>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-3 text-left">

                  Destination

                </th>

                <th className="p-3 text-left">

                  Date

                </th>

                <th className="p-3 text-left">

                  Status

                </th>

              </tr>

            </thead>

            <tbody>

              {requests.map(
                (r) => (

                  <tr
                    key={r.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-3">

                      {r.destination}

                    </td>

                    <td className="p-3">

                      {r.travelDate}

                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          r.status ===
                          "APPROVED" ||
                          r.status ===
                            "MANAGER_APPROVED"
                            ? "bg-green-100 text-green-700"
                            : r.status ===
                              "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {r.status}

                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default EmployeeDashboard;