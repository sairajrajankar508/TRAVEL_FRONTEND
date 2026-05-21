import { useEffect, useState } from "react";

import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

const ManagerReports = () => {

  const [stats, setStats] =
    useState({

      total: 0,
      approved: 0,
      rejected: 0,
      budget: 0,
    });

  // ================= FETCH =================
  const fetchReports = async () => {

    try {

      const [
        totalRes,
        approvedRes,
        rejectedRes,
        budgetRes,
      ] = await Promise.all([

        fetch("http://localhost:8080/manager/reports/total"),

        fetch("http://localhost:8080/manager/reports/approved"),

        fetch("http://localhost:8080/manager/reports/rejected"),

        fetch("http://localhost:8080/manager/reports/budget"),
      ]);

      const total =
        await totalRes.json();

      const approved =
        await approvedRes.json();

      const rejected =
        await rejectedRes.json();

      const budget =
        await budgetRes.json();

      setStats({
        total,
        approved,
        rejected,
        budget,
      });

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    const load = async () => {
      await fetchReports();
    };

    load();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold">

          Reports & Analytics

        </h1>

        <p className="text-slate-500 mt-1">

          Travel management insights

        </p>

      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-4 gap-6">

        {/* TOTAL */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">

          <div className="flex justify-between">

            <h2 className="text-slate-500">

              Total Requests

            </h2>

            <FaFileAlt className="text-blue-500 text-2xl" />

          </div>

          <p className="text-3xl font-bold mt-3">

            {stats.total}

          </p>

        </div>

        {/* APPROVED */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">

          <div className="flex justify-between">

            <h2 className="text-slate-500">

              Approved

            </h2>

            <FaCheckCircle className="text-green-500 text-2xl" />

          </div>

          <p className="text-3xl font-bold mt-3">

            {stats.approved}

          </p>

        </div>

        {/* REJECTED */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">

          <div className="flex justify-between">

            <h2 className="text-slate-500">

              Rejected

            </h2>

            <FaTimesCircle className="text-red-500 text-2xl" />

          </div>

          <p className="text-3xl font-bold mt-3">

            {stats.rejected}

          </p>

        </div>

        {/* BUDGET */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-cyan-500">

          <div className="flex justify-between">

            <h2 className="text-slate-500">

              Total Budget

            </h2>

            <FaMoneyBillWave className="text-cyan-500 text-2xl" />

          </div>

          <p className="text-3xl font-bold mt-3">

            ₹ {stats.budget}

          </p>

        </div>

      </div>

    </div>
  );
};

export default ManagerReports;