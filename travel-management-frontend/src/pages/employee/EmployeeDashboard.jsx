import { useEffect, useState } from "react";

import {
  FaPlane,
  FaClock,
  FaCheck,
  FaTimes,
  FaRoute,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSpinner,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  const navigate =
    useNavigate();

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

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 p-6 space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">

              Employee Dashboard

            </h1>

            <p className="text-slate-500 mt-3 text-lg">

              Manage your travel requests and itineraries

            </p>

          </div>

          <div className="bg-cyan-100 text-cyan-700 px-6 py-4 rounded-2xl font-bold text-lg shadow-sm flex items-center gap-3">

            <FaPlane />

            Travel Management

          </div>

        </div>

      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <StatCard
          title="Total Requests"
          value={total}
          icon={<FaPlane />}
          color="blue"
        />

        <StatCard
          title="Pending"
          value={pending}
          icon={<FaClock />}
          color="yellow"
        />

        <StatCard
          title="Approved"
          value={approved}
          icon={<FaCheck />}
          color="green"
        />

        <StatCard
          title="Rejected"
          value={rejected}
          icon={<FaTimes />}
          color="red"
        />

      </div>

      {/* ================= REQUEST TABLE ================= */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        {/* TOP */}
        <div className="flex items-center gap-4 mb-8">

          <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 text-2xl">

            <FaRoute />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              My Travel Requests

            </h2>

            <p className="text-slate-500">

              View and manage your submitted requests

            </p>

          </div>

        </div>

        {loading ? (

          <div className="flex justify-center py-16">

            <FaSpinner className="animate-spin text-5xl text-cyan-600" />

          </div>

        ) : requests.length === 0 ? (

          <div className="text-center py-16">

            <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl">

              <FaPlane />

            </div>

            <h3 className="text-2xl font-bold text-slate-700 mt-6">

              No Travel Requests

            </h3>

            <p className="text-slate-500 mt-3">

              Your travel requests will appear here

            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="p-5 text-left font-semibold text-slate-700 rounded-l-2xl">

                    Destination

                  </th>

                  <th className="p-5 text-left font-semibold text-slate-700">

                    Travel Dates

                  </th>

                  <th className="p-5 text-left font-semibold text-slate-700">

                    Status

                  </th>

                  <th className="p-5 text-left font-semibold text-slate-700 rounded-r-2xl">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

                {requests.map((r) => (

                  <tr
                    key={r.id}
                    className="hover:bg-slate-50 transition-all"
                  >

                    {/* DESTINATION */}
                    <td className="p-5">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700">

                          <FaMapMarkerAlt />

                        </div>

                        <div>

                          <h3 className="font-bold text-slate-800">

                            {r.destination}

                          </h3>

                          <p className="text-sm text-slate-500">

                            Request ID: {r.id}

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* DATES */}
                    <td className="p-5">

                      <div className="flex items-start gap-3">

                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">

                          <FaCalendarAlt />

                        </div>

                        <div>

                          <p className="font-semibold text-slate-700">

                            Start:
                            {" "}
                            {r.startDate || "N/A"}

                          </p>

                          <p className="text-sm text-slate-500 mt-1">

                            End:
                            {" "}
                            {r.endDate || "N/A"}

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* STATUS */}
                    <td className="p-5">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          r.status ===
                            "APPROVED" ||
                          r.status ===
                            "MANAGER_APPROVED" ||
                          r.status ===
                            "FINANCE_APPROVED"
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

                    {/* ACTIONS */}
                    <td className="p-5">

                      <button
                        onClick={() =>
                          navigate(
                            `/employee/itinerary/${r.id}`
                          )
                        }
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all text-white px-5 py-3 rounded-2xl shadow-md font-semibold flex items-center gap-3"
                      >

                        <FaRoute />

                        View Itinerary

                      </button>

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