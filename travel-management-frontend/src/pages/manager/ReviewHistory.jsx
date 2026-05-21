import { useEffect, useState } from "react";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaHistory,
} from "react-icons/fa";

const ReviewHistory = () => {

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  // ================= FETCH HISTORY =================
  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const res = await fetch(
          "http://localhost:8080/manager/approvals",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        setHistory(
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

    fetchHistory();

  }, [token]);

  // ================= ANALYTICS =================
  const totalReviewed =
    history.length;

  const approved =
    history.filter(
      (h) =>
        h.status ===
        "MANAGER_APPROVED"
    ).length;

  const rejected =
    history.filter(
      (h) =>
        h.status ===
        "REJECTED"
    ).length;

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">

          Review History

        </h1>

        <p className="text-slate-500 mt-2">

          Manager approval and rejection audit history

        </p>

      </div>

      {/* ================= ANALYTICS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* TOTAL */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-cyan-500">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">

                Total Reviewed

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {totalReviewed}

              </h2>

            </div>

            <FaHistory className="text-4xl text-cyan-500" />

          </div>

        </div>

        {/* APPROVED */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">

                Approved

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {approved}

              </h2>

            </div>

            <FaCheckCircle className="text-4xl text-green-500" />

          </div>

        </div>

        {/* REJECTED */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-red-500">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">

                Rejected

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {rejected}

              </h2>

            </div>

            <FaTimesCircle className="text-4xl text-red-500" />

          </div>

        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-xl font-bold text-slate-800">

            Manager Decision Logs

          </h2>

        </div>

        {loading ? (

          <div className="p-10 text-center">

            Loading...

          </div>

        ) : history.length === 0 ? (

          <div className="p-10 text-center text-slate-500">

            No review history found

          </div>

        ) : (

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

                  Decision

                </th>

                <th className="p-4 text-left">

                  Manager Comment

                </th>

              </tr>

            </thead>

            <tbody>

              {history.map((h) => (

                <tr
                  key={h.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-medium">

                    {h.employeeName}

                  </td>

                  <td className="p-4">

                    {h.destination}

                  </td>

                  <td className="p-4">

                    {h.purpose}

                  </td>

                  <td className="p-4">

                    ₹ {h.budget}

                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        h.status ===
                        "MANAGER_APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {h.status ===
                      "MANAGER_APPROVED"
                        ? "APPROVED"
                        : "REJECTED"}

                    </span>

                  </td>

                  <td className="p-4 text-slate-600">

                    {h.managerComment ||
                      "No comment"}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default ReviewHistory;