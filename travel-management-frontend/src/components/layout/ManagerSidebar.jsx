import { Link, useLocation } from "react-router-dom";

import {

  FaChartBar,
  FaClipboardList,
  FaCheckCircle,
  FaUsers,
  FaHistory,
  FaFileAlt,

} from "react-icons/fa";

const ManagerSidebar = () => {

  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path;

  return (

    <div className="w-64 h-screen bg-gradient-to-b from-cyan-900 to-slate-900 text-white shadow-2xl flex flex-col">

      {/* ================= LOGO ================= */}
      <div className="p-5 border-b border-cyan-800">

        <h1 className="text-2xl font-bold tracking-wide">
          Travel System
        </h1>

        <p className="text-xs text-cyan-200 mt-1">
          Manager Panel
        </p>

      </div>

      {/* ================= MENU ================= */}
      <div className="flex flex-col gap-2 p-4">

        {/* DASHBOARD */}
        <Link
          to="/manager/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive("/manager/dashboard")
              ? "bg-cyan-600 shadow-lg"
              : "hover:bg-cyan-800"
          }`}
        >

          <FaChartBar />

          Dashboard

        </Link>

        {/* PENDING REQUESTS */}
        <Link
          to="/manager/requests"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive("/manager/requests")
              ? "bg-cyan-600 shadow-lg"
              : "hover:bg-cyan-800"
          }`}
        >

          <FaClipboardList />

          Pending Requests

        </Link>

        {/* APPROVAL HISTORY */}
        <Link
          to="/manager/approvals"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive("/manager/approvals")
              ? "bg-cyan-600 shadow-lg"
              : "hover:bg-cyan-800"
          }`}
        >

          <FaCheckCircle />

          Approval History

        </Link>

        {/* TEAM ACTIVITY */}
        <Link
          to="/manager/team"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive("/manager/team")
              ? "bg-cyan-600 shadow-lg"
              : "hover:bg-cyan-800"
          }`}
        >

          <FaUsers />

          Team Activity

        </Link>

        {/* REPORTS */}
        <Link
          to="/manager/reports"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive("/manager/reports")
              ? "bg-cyan-600 shadow-lg"
              : "hover:bg-cyan-800"
          }`}
        >

          <FaFileAlt />

          Reports

        </Link>

        {/* REVIEW HISTORY */}
        <Link
          to="/manager/history"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive("/manager/history")
              ? "bg-cyan-600 shadow-lg"
              : "hover:bg-cyan-800"
          }`}
        >

          <FaHistory />

          Review History

        </Link>

      </div>

      

    </div>
  );
};

export default ManagerSidebar;