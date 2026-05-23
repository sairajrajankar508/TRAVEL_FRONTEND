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

  // ================= FETCH DATA =================
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

          setRequests([]);

        } finally {

          setLoading(false);
        }
      };

    fetchData();

  }, [token]);

  // ================= COUNTS =================
  const total =
    requests.length;

  const pending =
    requests.filter(
      (r) =>
        r.status ===
          "SUBMITTED" ||
        r.status ===
          "DRAFT"
    ).length;

  const approved =
    requests.filter(
      (r) =>
        r.status ===
          "MANAGER_APPROVED" ||
        r.status ===
          "FINANCE_APPROVED"
    ).length;

  const rejected =
    requests.filter(
      (r) =>
        r.status ===
        "REJECTED"
    ).length;

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 p-6 space-y-8">

      

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Requests"
          value={total}
          icon={<FaPlane />}
          color="blue"
        />

        <StatCard
          title="Pending Requests"
          value={pending}
          icon={<FaClock />}
          color="yellow"
        />

        <StatCard
          title="Approved Requests"
          value={approved}
          icon={<FaCheck />}
          color="green"
        />

        <StatCard
          title="Rejected Requests"
          value={rejected}
          icon={<FaTimes />}
          color="red"
        />

      </div>

      {/* ================= REQUEST TABLE ================= */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="p-6 border-b border-slate-200">

          <h2 className="text-2xl font-bold text-slate-800">

            My Travel Requests

          </h2>

          <p className="text-slate-500 mt-1">

            View all submitted travel requests

          </p>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          {loading ? (

            <div className="p-10 text-center text-slate-500">

              Loading requests...

            </div>

          ) : requests.length === 0 ? (

            <div className="p-10 text-center text-slate-500">

              No travel requests found

            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-slate-100">

  <tr>

    <th className="p-5 text-center font-semibold text-slate-700">
      Destination
    </th>

    <th className="p-5 text-center font-semibold text-slate-700">
      Start Date
    </th>

    <th className="p-5 text-center font-semibold text-slate-700">
      End Date
    </th>

    <th className="p-5 text-center font-semibold text-slate-700">
      Status
    </th>

  </tr>

</thead>

              <tbody>

                {requests.map((r) => (

                  <tr
                    key={r.id}
                    className="hover:bg-slate-50 transition border-t border-slate-100"
                  >

                    {/* DESTINATION */}
                    <td className="p-5 text-center">

                      <div className="flex flex-col items-center">

                        

                        <div>

                          <h3 className="font-bold text-slate-800 text-lg">

                            {r.destination}

                          </h3>

                          <p className="text-sm text-slate-500 mt-1">

                            Request ID:
                            {" "}
                            {r.id}

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* START DATE */}
                    <td className="p-5 text-center">

                      <div className="flex flex-col items-center">


                        <div>

                          

                          <h4 className="font-semibold text-slate-800">

                            {r.startDate}

                          </h4>

                        </div>

                      </div>

                    </td>

                    {/* END DATE */}
                    <td className="p-5 text-center">

                      <div className="flex flex-col items-center">

                        
                        <div>

                          

                          <h4 className="font-semibold text-slate-800">

                            {r.endDate}

                          </h4>

                        </div>

                      </div>

                    </td>

                    {/* STATUS */}
                    <td className="p-5 text-center">

                      
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          r.status === "APPROVED" ||
                          r.status === "MANAGER_APPROVED" ||
                          r.status === "FINANCE_APPROVED"
                            ? "bg-green-100 text-green-700"
                            : r.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {r.status}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
};

/* ================= STAT CARD ================= */

const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {

  const colors = {

    blue: {
      border:
        "border-blue-500",
      bg:
        "bg-blue-100",
      text:
        "text-blue-700",
    },

    yellow: {
      border:
        "border-yellow-500",
      bg:
        "bg-yellow-100",
      text:
        "text-yellow-700",
    },

    green: {
      border:
        "border-green-500",
      bg:
        "bg-green-100",
      text:
        "text-green-700",
    },

    red: {
      border:
        "border-red-500",
      bg:
        "bg-red-100",
      text:
        "text-red-700",
    },
  };

  return (

    <div
      className={`bg-white rounded-3xl shadow-lg p-6 border-l-4 ${colors[color].border}`}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 font-medium">

            {title}

          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-3">

            {value}

          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${colors[color].bg} ${colors[color].text}`}
        >

          {icon}

        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;