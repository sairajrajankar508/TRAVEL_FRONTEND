// import { Link, useLocation } from "react-router-dom";

// import {

//   FaChartBar,
//   FaClipboardList,
//   FaCheckCircle,
//   FaUsers,
//   FaHistory,
//   FaFileAlt,
//   FaUser
// } from "react-icons/fa";

// const ManagerSidebar = () => {

//   const location = useLocation();

//   const isActive = (path) =>
//     location.pathname === path;

//   return (

//     <div className="w-64 h-screen bg-gradient-to-b from-cyan-900 to-slate-900 text-white shadow-2xl flex flex-col">

//       {/* ================= LOGO ================= */}
//       <div className="p-5 border-b border-cyan-800">

//         <h1 className="text-2xl font-bold tracking-wide">
//           Travel System
//         </h1>

//         <p className="text-xs text-cyan-200 mt-1">
//           Manager Panel
//         </p>

//       </div>

//       {/* ================= MENU ================= */}
//       <div className="flex flex-col gap-2 p-4">

//         {/* DASHBOARD */}
//         <Link
//           to="/manager/dashboard"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//             isActive("/manager/dashboard")
//               ? "bg-cyan-600 shadow-lg"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaChartBar />

//           Dashboard

//         </Link>

//         {/* PENDING REQUESTS */}
//         <Link
//           to="/manager/requests"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//             isActive("/manager/requests")
//               ? "bg-cyan-600 shadow-lg"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaClipboardList />

//           Pending Requests

//         </Link>

//         {/* APPROVAL HISTORY */}
//         <Link
//           to="/manager/approvals"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//             isActive("/manager/approvals")
//               ? "bg-cyan-600 shadow-lg"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaCheckCircle />

//           Approval History

//         </Link>

//         {/* TEAM ACTIVITY */}
//         <Link
//           to="/manager/team-activity"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//             isActive("/manager/team")
//               ? "bg-cyan-600 shadow-lg"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaUsers />

//           Team Activity

//         </Link>

//         {/* REPORTS */}
//         <Link
//           to="/manager/reports"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//             isActive("/manager/reports")
//               ? "bg-cyan-600 shadow-lg"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaFileAlt />

//           Reports

//         </Link>

//         {/* REVIEW HISTORY */}
//         <Link
//           to="/manager/history"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//             isActive("/manager/history")
//               ? "bg-cyan-600 shadow-lg"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaHistory />

//           Review History

//         </Link>

//         {/* MANAGER POLICIES */}
//         <Link
//           to="/manager/policies"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//             isActive("/manager/policies")
//               ? "bg-cyan-600 shadow-lg"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaFileAlt />

//           Policies

//         </Link>


//         {/* MANAGER PROFILE */}
//         <Link
//           to="/manager/profile"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//             isActive("/manager/profile")
//               ? "bg-cyan-600 shadow-lg"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaUser />

//           Profile

//         </Link>

//       </div>

      

//     </div>
//   );
// };

// export default ManagerSidebar;




import {
    LayoutDashboard,
    Clock3,
    CheckCircle2,
    History,
    Users,
    FileBarChart2,
    ShieldCheck,
    User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const ManagerSidebar = () => {

    // ==========================================
    // MENU ITEMS
    // ==========================================

    const menuItems = [

        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/manager/dashboard",
        },

        {
            title: "Pending Requests",
            icon: <Clock3 size={20} />,
            path: "/manager/pending-requests",
        },

        {
            title: "Approvals",
            icon: <CheckCircle2 size={20} />,
            path: "/manager/approvals",
        },

        {
            title: "Approval History",
            icon: <History size={20} />,
            path: "/manager/history",
        },

        {
            title: "Team Activity",
            icon: <Users size={20} />,
            path: "/manager/team-activity",
        },

        {
            title: "Reports",
            icon: <FileBarChart2 size={20} />,
            path: "/manager/reports",
        },

        {
            title: "Policies",
            icon: <ShieldCheck size={20} />,
            path: "/manager/policies",
        },

        {
            title: "Profile",
            icon: <User size={20} />,
            path: "/manager/profile",
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
                        text-purple-400
                    "
                >
                    Manager
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Approval & Team Workspace
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
                                        ? "bg-purple-600 text-white shadow-md"
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
                    Manager Approval Console
                </p>

                <p className="mt-1">
                    Team & Workflow Monitoring
                </p>

            </div>

        </div>
    );
};

export default ManagerSidebar;