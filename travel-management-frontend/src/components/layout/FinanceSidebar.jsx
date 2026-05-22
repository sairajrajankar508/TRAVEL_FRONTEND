import { Link, useLocation } from "react-router-dom";

import {
  FaChartBar,
  FaMoneyBillWave,
  FaFileInvoice,
  FaCheckCircle,
  FaHistory,
  FaUser,
} from "react-icons/fa";

const FinanceSidebar = () => {

  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path;

  return (

    <div className="w-64 h-screen bg-gradient-to-b from-green-900 to-green-900 text-white shadow-2xl flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="p-5 border-b border-green-700">

        <h1 className="text-2xl font-bold">

          Travel System

        </h1>

        <p className="text-xs text-green-200 mt-1">

          Finance Panel

        </p>

      </div>

      {/* ================= MENU ================= */}
      <div className="flex flex-col gap-2 p-4">

        {/* DASHBOARD */}
        <Link
          to="/finance/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive("/finance/dashboard")
              ? "bg-green-600"
              : "hover:bg-green-700"
          }`}
        >

          <FaChartBar />

          Dashboard

        </Link>

        {/* EXPENSE APPROVALS */}
        <Link
          to="/finance/expenses"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive("/finance/expenses")
              ? "bg-green-600"
              : "hover:bg-green-700"
          }`}
        >

          <FaMoneyBillWave />

          Expense Approvals

        </Link>

        {/* REIMBURSEMENTS */}
        <Link
          to="/finance/reimbursements"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive("/finance/reimbursements")
              ? "bg-green-600"
              : "hover:bg-green-700"
          }`}
        >

          <FaCheckCircle />

          Reimbursements

        </Link>

        
        {/* PAYMENT HISTORY */}
        <Link
          to="/finance/history"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive("/finance/history")
              ? "bg-green-600"
              : "hover:bg-green-700"
          }`}
        >

          <FaHistory />

          Payment History

        </Link>

        {/* REPORTS */}
        <Link
          to="/finance/reports"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive("/finance/reports")
              ? "bg-green-600"
              : "hover:bg-green-700"
          }`}
        >

          <FaFileInvoice />

          Reports

        </Link>

        {/* PROFILE */}
        <Link
          to="/finance/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive("/finance/profile")
              ? "bg-green-600"
              : "hover:bg-green-700"
          }`}
        >

          <FaUser />

          Profile

        </Link>

      </div>

      {/* ================= FOOTER ================= */}
      <div className="mt-auto p-4 border-t border-green-700 text-xs text-green-200">

        v1.0 • Finance Module

      </div>

    </div>

  );
};

export default FinanceSidebar;