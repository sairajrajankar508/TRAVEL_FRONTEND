import { Link, useLocation } from "react-router-dom";

import {
  FaUsers,
  FaPlane,
  FaMoneyBill,
  FaUserShield,
  FaChartBar,
  FaClipboardList
} from "react-icons/fa";

const AdminSidebar = () => {

  const role = localStorage.getItem("role");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (

    <div className="w-64 h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 text-white p-5 shadow-2xl">

      {/* LOGO SECTION */}
      <div className="mb-10">

        <h1 className="text-2xl font-bold tracking-wide">
           Travel System
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          Travel Management System
        </p>

      </div>

      {/* MENU */}
      <div className="flex flex-col gap-3">

        {/* ADMIN */}
{role === "ADMIN" && (
  <>

    {/* DASHBOARD */}
    <Link
      to="/admin/dashboard"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive("/admin/dashboard")
          ? "bg-indigo-600 text-white shadow-lg"
          : "hover:bg-slate-700 text-gray-300"
      }`}
    >
      <FaChartBar />
      Dashboard
    </Link>

    {/* USER MANAGEMENT */}
    <Link
      to="/admin/users"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive("/admin/users")
          ? "bg-indigo-600 text-white shadow-lg"
          : "hover:bg-slate-700 text-gray-300"
      }`}
    >
      <FaUsers />
      User Management
    </Link>

    {/* TRAVEL POLICIES */}
    <Link
      to="/admin/policies"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive("/admin/policies")
          ? "bg-indigo-600 text-white shadow-lg"
          : "hover:bg-slate-700 text-gray-300"
      }`}
    >
      <FaPlane />
      Travel Policies
    </Link>

    {/* REPORTS */}
    <Link
      to="/admin/reports"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive("/admin/reports")
          ? "bg-indigo-600 text-white shadow-lg"
          : "hover:bg-slate-700 text-gray-300"
      }`}
    >
      <FaMoneyBill />
      Reports
    </Link>

    {/* AUDIT LOGS */}
    <Link
      to="/admin/audit-logs"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive("/admin/audit-logs")
          ? "bg-indigo-600 text-white shadow-lg"
          : "hover:bg-slate-700 text-gray-300"
      }`}
    >
      <FaClipboardList />
      Audit Logs
    </Link>

    {/* ADMIN PROFILE */}
    <Link
      to="/admin/profile"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive("/admin/profile")
          ? "bg-indigo-600 text-white shadow-lg"
          : "hover:bg-slate-700 text-gray-300"
      }`}
    >
      <FaUserShield />
      Profile
    </Link>

  </>
)}

        {/* EMPLOYEE */}
        {role === "EMPLOYEE" && (

          <Link
            to="/employee/dashboard"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive("/employee/dashboard")
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-700 text-gray-300"
            }`}
          >
            <FaPlane />
            Dashboard
          </Link>
        )}

        {/* MANAGER */}
        {role === "MANAGER" && (

          <Link
            to="/manager/dashboard"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive("/manager/dashboard")
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-700 text-gray-300"
            }`}
          >
            <FaUserShield />
            Manager Dashboard
          </Link>
        )}

        {/* FINANCE */}
        {role === "FINANCE" && (

          <Link
            to="/finance/dashboard"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive("/finance/dashboard")
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-700 text-gray-300"
            }`}
          >
            <FaMoneyBill />
            Finance Dashboard
          </Link>
        )}

      </div>

     

    </div>
  );
};

export default AdminSidebar;