import { Link, useLocation } from "react-router-dom";

import {

  FaChartBar,

  FaFileAlt,

  FaWallet,

  FaUser,

} from "react-icons/fa";

const EmployeeSidebar = () => {

  const location =
    useLocation();

  const isActive = (path) =>
    location.pathname === path;

  return (

    <div className="w-64 h-screen bg-gradient-to-b from-cyan-900 to-cyan-900 text-white shadow-2xl flex flex-col">

      {/* LOGO */}
      <div className="p-5 border-b border-cyan-800">

        <h1 className="text-2xl font-bold">
        Travel System
        </h1>

        <p className="text-xs text-cyan-200 mt-1">
          Employee Panel
        </p>

      </div>

      {/* MENU */}
      <div className="flex flex-col gap-2 p-4">

        {/* DASHBOARD */}
        <Link
          to="/employee/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive(
              "/employee/dashboard"
            )
              ? "bg-cyan-600"
              : "hover:bg-cyan-800"
          }`}
        >

          <FaChartBar />

          Dashboard

        </Link>

        {/* MY REQUESTS */}
        <Link
          to="/employee/requests"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive(
              "/employee/requests"
            )
              ? "bg-cyan-600"
              : "hover:bg-cyan-800"
          }`}
        >

          <FaFileAlt />

          My Requests

        </Link>

        {/* EXPENSES */}
        <Link
          to="/employee/expenses"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive(
              "/employee/expenses"
            )
              ? "bg-cyan-600"
              : "hover:bg-cyan-800"
          }`}
        >

          <FaWallet />

          Expenses

        </Link>

        {/* PROFILE */}
        <Link
          to="/employee/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isActive(
              "/employee/profile"
            )
              ? "bg-cyan-600"
              : "hover:bg-cyan-800"
          }`}
        >

          <FaUser />

          Profile

        </Link>

      </div>

      {/* FOOTER */}
      <div className="mt-auto p-4 border-t border-cyan-800 text-xs text-cyan-300">

        v1.0 • Employee Module

      </div>

    </div>

  );
};

export default EmployeeSidebar;