import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

import AdminSidebar from "./AdminSidebar";

import EmployeeSidebar from "./EmployeeSidebar";

import ManagerSidebar from "./ManagerSidebar";

const AppShell = () => {

  const role =
    localStorage.getItem("role");

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <div className="w-64 fixed left-0 top-0 h-screen z-50">

        {role === "ADMIN" && (
          <AdminSidebar />
        )}

        {role === "EMPLOYEE" && (
          <EmployeeSidebar />
        )}

       {role === "MANAGER" && (
        <ManagerSidebar />
      )} 

      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">

        {/* NAVBAR */}
        <div className="sticky top-0 z-40">

          <Navbar />

        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default AppShell;