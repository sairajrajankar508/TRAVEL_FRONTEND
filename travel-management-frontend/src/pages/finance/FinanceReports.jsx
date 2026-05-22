import { useEffect, useState } from "react";

import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const FinanceReports = () => {

  const [dashboard, setDashboard] = useState({});
  const [departmentReport, setDepartmentReport] = useState({});
  const [categoryReport, setCategoryReport] = useState({});
  const [recentExpenses, setRecentExpenses] = useState([]);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // =====================================================
  // FETCH REPORT DATA
  // =====================================================

  useEffect(() => {

    const fetchReports = async () => {

      try {

        setLoading(true);

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // DASHBOARD
        const dashboardRes = await fetch(
          "http://localhost:8080/finance/dashboard",
          { headers }
        );

        const dashboardData = await dashboardRes.json();

        // DEPARTMENT REPORT
        const departmentRes = await fetch(
          "http://localhost:8080/finance/report",
          { headers }
        );

        const departmentData = await departmentRes.json();

        // CATEGORY REPORT
        const categoryRes = await fetch(
          "http://localhost:8080/finance/category-report",
          { headers }
        );

        const categoryData = await categoryRes.json();

        // RECENT EXPENSES
        const recentRes = await fetch(
          "http://localhost:8080/finance/recent-expenses",
          { headers }
        );

        const recentData = await recentRes.json();

        setDashboard(dashboardData || {});
        setDepartmentReport(departmentData || {});
        setCategoryReport(categoryData || {});
        setRecentExpenses(
          Array.isArray(recentData)
            ? recentData
            : []
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

    fetchReports();

  }, [token]);

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const getStatusBadge = (status) => {

    switch (status) {

      case "REIMBURSED":
        return (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            Reimbursed
          </span>
        );

      case "FINANCE_APPROVED":
        return (
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            Approved
          </span>
        );

      case "REJECTED":
        return (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
            Rejected
          </span>
        );

      default:
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
            Pending
          </span>
        );
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-slate-800">

          Finance Reports

        </h1>

        <p className="text-gray-500 mt-1">

          Finance analytics and expense insights

        </p>

      </div>

      {/* ===================================================== */}
      {/* SUMMARY CARDS */}
      {/* ===================================================== */}

      {loading ? (

        <p>Loading reports...</p>

      ) : (

        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

            {/* TOTAL */}
            <div className="bg-white rounded-2xl shadow p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">

                    Total Expenses

                  </p>

                  <h2 className="text-3xl font-bold mt-2">

                    {dashboard.totalExpenses || 0}

                  </h2>

                </div>

                <FaMoneyBillWave className="text-4xl text-blue-500" />

              </div>

            </div>

            {/* APPROVED */}
            <div className="bg-white rounded-2xl shadow p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">

                    Approved

                  </p>

                  <h2 className="text-3xl font-bold mt-2">

                    {dashboard.approvedExpenses || 0}

                  </h2>

                </div>

                <FaCheckCircle className="text-4xl text-green-500" />

              </div>

            </div>

            {/* REJECTED */}
            <div className="bg-white rounded-2xl shadow p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">

                    Rejected

                  </p>

                  <h2 className="text-3xl font-bold mt-2">

                    {dashboard.rejectedExpenses || 0}

                  </h2>

                </div>

                <FaTimesCircle className="text-4xl text-red-500" />

              </div>

            </div>

            {/* PENDING */}
            <div className="bg-white rounded-2xl shadow p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">

                    Pending

                  </p>

                  <h2 className="text-3xl font-bold mt-2">

                    {dashboard.pendingExpenses || 0}

                  </h2>

                </div>

                <FaClock className="text-4xl text-yellow-500" />

              </div>

            </div>

          </div>

          {/* ===================================================== */}
          {/* FILTERS */}
          {/* ===================================================== */}

          <div className="bg-white rounded-2xl shadow p-5 mb-8">

            <h2 className="text-xl font-bold mb-4">

              Filters

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

              <input
                type="text"
                placeholder="Search employee..."
                className="border rounded-lg p-3"
              />

              <select className="border rounded-lg p-3">

                <option>All Categories</option>
                <option>FLIGHT</option>
                <option>HOTEL</option>
                <option>FOOD</option>
                <option>TRANSPORT</option>

              </select>

              <select className="border rounded-lg p-3">

                <option>All Status</option>
                <option>FINANCE_APPROVED</option>
                <option>REIMBURSED</option>
                <option>REJECTED</option>

              </select>

              <input
                type="date"
                className="border rounded-lg p-3"
              />

            </div>

          </div>

          {/* ===================================================== */}
          {/* DEPARTMENT REPORT */}
          {/* ===================================================== */}

          <div className="bg-white rounded-2xl shadow p-5 mb-8">

            <h2 className="text-2xl font-bold mb-5">

              Department Expense Report

            </h2>

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="p-3 text-left">

                    Department

                  </th>

                  <th className="p-3 text-left">

                    Total Amount

                  </th>

                </tr>

              </thead>

              <tbody>

                {Object.entries(departmentReport).map(
                  ([department, amount]) => (

                    <tr
                      key={department}
                      className="border-t"
                    >

                      <td className="p-3">

                        {department}

                      </td>

                      <td className="p-3 font-semibold">

                        ₹ {amount}

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

          {/* ===================================================== */}
          {/* CATEGORY REPORT */}
          {/* ===================================================== */}

          <div className="bg-white rounded-2xl shadow p-5 mb-8">

            <h2 className="text-2xl font-bold mb-5">

              Category Spending Report

            </h2>

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="p-3 text-left">

                    Category

                  </th>

                  <th className="p-3 text-left">

                    Total Amount

                  </th>

                </tr>

              </thead>

              <tbody>

                {Object.entries(categoryReport).map(
                  ([category, amount]) => (

                    <tr
                      key={category}
                      className="border-t"
                    >

                      <td className="p-3">

                        {category}

                      </td>

                      <td className="p-3 font-semibold">

                        ₹ {amount}

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

          {/* ===================================================== */}
          {/* RECENT EXPENSES */}
          {/* ===================================================== */}

          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="text-2xl font-bold mb-5">

              Recent Expenses

            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-100">

                  <tr>

                    <th className="p-3 text-left">

                      Employee

                    </th>

                    <th className="p-3 text-left">

                      Expense

                    </th>

                    <th className="p-3 text-left">

                      Category

                    </th>

                    <th className="p-3 text-left">

                      Amount

                    </th>

                    <th className="p-3 text-left">

                      Status

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentExpenses.map((exp) => (

                    <tr
                      key={exp.id}
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="p-3">

                        {exp.employeeName}

                      </td>

                      <td className="p-3">

                        {exp.title}

                      </td>

                      <td className="p-3">

                        {exp.category}

                      </td>

                      <td className="p-3 font-semibold">

                        ₹ {exp.amount}

                      </td>

                      <td className="p-3">

                        {getStatusBadge(exp.status)}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default FinanceReports;