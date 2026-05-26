// import { Link, useLocation } from "react-router-dom";

// import {
//   FaUsers,
//   FaPlane,
//   FaMoneyBill,
//   FaUserShield,
//   FaChartBar,
//   FaClipboardList
// } from "react-icons/fa";

// const AdminSidebar = () => {

//   const role = localStorage.getItem("role");
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (

//     <div className="w-64 h-screen bg-gradient-to-b from-indigo-900 to-indigo-800 text-white p-5 shadow-2xl">

//       {/* LOGO SECTION */}
//       <div className="mb-10">

//         <h1 className="text-2xl font-bold tracking-wide">
//            Travel System
//         </h1>

//         <p className="text-xs text-gray-400 mt-1">
//           Travel Management System
//         </p>

//       </div>

//       {/* MENU */}
//       <div className="flex flex-col gap-3">

//         {/* ADMIN */}
// {role === "ADMIN" && (
//   <>

//     {/* DASHBOARD */}
//     <Link
//       to="/admin/dashboard"
//       className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive("/admin/dashboard")
//           ? "bg-indigo-600 text-white shadow-lg"
//           : "hover:bg-slate-700 text-gray-300"
//       }`}
//     >
//       <FaChartBar />
//       Dashboard
//     </Link>

//     {/* USER MANAGEMENT */}
//     <Link
//       to="/admin/users"
//       className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive("/admin/users")
//           ? "bg-indigo-600 text-white shadow-lg"
//           : "hover:bg-slate-700 text-gray-300"
//       }`}
//     >
//       <FaUsers />
//       User Management
//     </Link>

//     {/* TRAVEL POLICIES */}
//     <Link
//       to="/admin/policies"
//       className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive("/admin/policies")
//           ? "bg-indigo-600 text-white shadow-lg"
//           : "hover:bg-slate-700 text-gray-300"
//       }`}
//     >
//       <FaPlane />
//       Travel Policies
//     </Link>

//     {/* REPORTS */}
//     <Link
//       to="/admin/reports"
//       className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive("/admin/reports")
//           ? "bg-indigo-600 text-white shadow-lg"
//           : "hover:bg-slate-700 text-gray-300"
//       }`}
//     >
//       <FaMoneyBill />
//       Reports
//     </Link>

//     {/* AUDIT LOGS */}
//     <Link
//       to="/admin/audit-logs"
//       className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive("/admin/audit-logs")
//           ? "bg-indigo-600 text-white shadow-lg"
//           : "hover:bg-slate-700 text-gray-300"
//       }`}
//     >
//       <FaClipboardList />
//       Audit Logs
//     </Link>

//     {/* ADMIN PROFILE */}
//     <Link
//       to="/admin/profile"
//       className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//         isActive("/admin/profile")
//           ? "bg-indigo-600 text-white shadow-lg"
//           : "hover:bg-slate-700 text-gray-300"
//       }`}
//     >
//       <FaUserShield />
//       Profile
//     </Link>

//   </>
// )}

//         {/* EMPLOYEE */}
//         {role === "EMPLOYEE" && (

//           <Link
//             to="/employee/dashboard"
//             className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
//               isActive("/employee/dashboard")
//                 ? "bg-indigo-600 text-white"
//                 : "hover:bg-slate-700 text-gray-300"
//             }`}
//           >
//             <FaPlane />
//             Dashboard
//           </Link>
//         )}

//         {/* MANAGER */}
//         {role === "MANAGER" && (

//           <Link
//             to="/manager/dashboard"
//             className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
//               isActive("/manager/dashboard")
//                 ? "bg-indigo-600 text-white"
//                 : "hover:bg-slate-700 text-gray-300"
//             }`}
//           >
//             <FaUserShield />
//             Manager Dashboard
//           </Link>
//         )}

//         {/* FINANCE */}
//         {role === "FINANCE" && (

//           <Link
//             to="/finance/dashboard"
//             className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
//               isActive("/finance/dashboard")
//                 ? "bg-indigo-600 text-white"
//                 : "hover:bg-slate-700 text-gray-300"
//             }`}
//           >
//             <FaMoneyBill />
//             Finance Dashboard
//           </Link>
//         )}

//       </div>

     

//     </div>
//   );
// };

// export default AdminSidebar;




import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    FileBarChart2,
    ClipboardList,
    Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const AdminSidebar = () => {

    // ==========================================
    // MENU ITEMS
    // ==========================================

    const menuItems = [

        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/admin/dashboard",
        },

        {
            title: "User Management",
            icon: <Users size={20} />,
            path: "/admin/users",
        },

        {
            title: "Policy Management",
            icon: <ShieldCheck size={20} />,
            path: "/admin/policies",
        },

        {
            title: "Reports",
            icon: <FileBarChart2 size={20} />,
            path: "/admin/reports",
        },

        {
            title: "Audit Logs",
            icon: <ClipboardList size={20} />,
            path: "/admin/audit",
        },

        {
            title: "System Config",
            icon: <Settings size={20} />,
            path: "/admin/config",
        },
    ];

    return (

        <div
            className="
                h-screen
                flex
                flex-col
                bg-gray-900
                text-white
                shadow-2xl
            "
        >

            {/* ========================================== */}
            {/* HEADER */}
            {/* ========================================== */}

            <div
                className="
                    px-6
                    py-5
                    border-b
                    border-gray-800
                "
            >

                <h1
                    className="
                        text-2xl
                        font-extrabold
                        tracking-wide
                        text-blue-400
                    "
                >
                    TMS Admin
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Travel Management System
                </p>

            </div>

            {/* ========================================== */}
            {/* MENU */}
            {/* ========================================== */}

            <nav
                className="
                    flex-1
                    px-3
                    py-5
                    space-y-2
                    overflow-y-auto
                "
            >

                {menuItems.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>

                            `
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                rounded-xl
                                transition-all
                                duration-200
                                font-medium
                                ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }
                            `
                        }
                    >

                        {item.icon}

                        <span>
                            {item.title}
                        </span>

                    </NavLink>
                ))}

            </nav>

            {/* ========================================== */}
            {/* FOOTER */}
            {/* ========================================== */}

            <div
                className="
                    p-4
                    border-t
                    border-gray-800
                    text-sm
                    text-gray-400
                "
            >

                <p>
                    Enterprise Travel Platform
                </p>

                <p className="mt-1">
                    Admin Control Panel
                </p>

            </div>

        </div>
    );
};

export default AdminSidebar;