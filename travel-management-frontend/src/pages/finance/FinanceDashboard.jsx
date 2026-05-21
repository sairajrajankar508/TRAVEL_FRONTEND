import { useEffect, useState } from "react";

import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const FinanceDashboard = () => {

  const [data, setData] = useState({});

  const token = localStorage.getItem("token");

  // ================= FETCH DASHBOARD =================
  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await fetch(
          "http://localhost:8080/finance/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard");
        }

        const json = await res.json();
        setData(json);

      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();

  }, [token]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-green-50 to-slate-200 p-6">

      

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* TOTAL */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">

          <FaMoneyBillWave className="text-blue-500 text-2xl" />

          <p className="text-gray-500 mt-3">

            Total Expenses

          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-1">

            {data.totalExpenses || 0}

          </h2>

        </div>

        {/* APPROVED */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">

          <FaCheckCircle className="text-green-500 text-2xl" />

          <p className="text-gray-500 mt-3">

            Reimbursed

          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-1">

            {data.approvedExpenses || 0}

          </h2>

        </div>

        {/* PENDING */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-500">

          <FaHourglassHalf className="text-yellow-500 text-2xl" />

          <p className="text-gray-500 mt-3">

            Pending Approval

          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-1">

            {data.pendingExpenses || 0}

          </h2>

        </div>

        {/* REJECTED */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-red-500">

          <FaTimesCircle className="text-red-500 text-2xl" />

          <p className="text-gray-500 mt-3">

            Rejected

          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-1">

            {data.rejectedExpenses || 0}

          </h2>

        </div>

      </div>

      {/* ================= INFO SECTION ================= */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow">

        <h2 className="text-lg font-bold mb-2">

          Finance Overview

        </h2>

        <p className="text-gray-600">

          Here you can monitor all employee expenses, approve reimbursements,
          reject invalid claims, and track company spending in real time.

        </p>

      </div>

    </div>
  );
};

export default FinanceDashboard;