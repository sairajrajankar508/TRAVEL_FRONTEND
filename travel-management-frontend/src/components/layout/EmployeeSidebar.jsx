// import { Link, useLocation } from "react-router-dom";

// import {

//   FaChartBar,

//   FaFileAlt,

//   FaWallet,

//   FaUser,

// } from "react-icons/fa";

// const EmployeeSidebar = () => {

//   const location =
//     useLocation();

//   const isActive = (path) =>
//     location.pathname === path;

//   return (

//     <div className="w-64 h-screen bg-gradient-to-b from-cyan-900 to-cyan-900 text-white shadow-2xl flex flex-col">

//       {/* LOGO */}
//       <div className="p-5 border-b border-cyan-800">

//         <h1 className="text-2xl font-bold">
//         Travel System
//         </h1>

//         <p className="text-xs text-cyan-200 mt-1">
//           Employee Panel
//         </p>

//       </div>

//       {/* MENU */}
//       <div className="flex flex-col gap-2 p-4">

//         {/* DASHBOARD */}
//         <Link
//           to="/employee/dashboard"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive(
//               "/employee/dashboard"
//             )
//               ? "bg-cyan-600"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaChartBar />

//           Dashboard

//         </Link>

//         {/* MY REQUESTS */}
//         <Link
//           to="/employee/requests"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive(
//               "/employee/requests"
//             )
//               ? "bg-cyan-600"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaFileAlt />

//           My Requests

//         </Link>

//         <Link
//           to="/employee/itinerary/:requestId"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive(
//               "/employee/itinerary/:requestId"
//             )
//               ? "bg-cyan-600"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaFileAlt />

//           Itinerary

//         </Link>

//         {/* EXPENSES */}
//         <Link
//           to="/employee/expenses"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive(
//               "/employee/expenses"
//             )
//               ? "bg-cyan-600"
//               : "hover:bg-cyan-800"
//           }`}
//         >

//           <FaWallet />

//           Expenses

//         </Link>

//         {/* PROFILE */}
//         <Link
//           to="/employee/profile"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive(
//               "/employee/profile"
//             )
//               ? "bg-cyan-600"
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

// export default EmployeeSidebar;




import {
    LayoutDashboard,
    FilePlus2,
    FileText,
    MapPinned,
    Receipt,
    User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const EmployeeSidebar = () => {

    // ==========================================
    // MENU ITEMS
    // ==========================================

    const menuItems = [

        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/employee/dashboard",
        },

        {
            title: "Create Request",
            icon: <FilePlus2 size={20} />,
            path: "/employee/create-request",
        },

        {
            title: "My Requests",
            icon: <FileText size={20} />,
            path: "/employee/requests",
        },

        {
            title: "Itinerary",
            icon: <MapPinned size={20} />,
            path: "/employee/itinerary",
        },

        {
            title: "Expenses",
            icon: <Receipt size={20} />,
            path: "/employee/expenses",
        },

        {
            title: "Profile",
            icon: <User size={20} />,
            path: "/employee/profile",
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
                        text-green-400
                    "
                >
                    Employee
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Travel Portal
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
                                        ? "bg-green-600 text-white shadow-md"
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
                    Employee Travel Workspace
                </p>

                <p className="mt-1">
                    Request & Expense Management
                </p>

            </div>

        </div>
    );
};

export default EmployeeSidebar;