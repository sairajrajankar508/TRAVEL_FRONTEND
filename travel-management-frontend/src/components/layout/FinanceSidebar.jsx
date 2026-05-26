// import { Link, useLocation } from "react-router-dom";

// import {
//   FaChartBar,
//   FaMoneyBillWave,
//   FaFileInvoice,
//   FaCheckCircle,
//   FaHistory,
//   FaUser,
// } from "react-icons/fa";

// const FinanceSidebar = () => {

//   const location = useLocation();

//   const isActive = (path) =>
//     location.pathname === path;

//   return (

//     <div className="w-64 h-screen bg-gradient-to-b from-green-900 to-green-900 text-white shadow-2xl flex flex-col">

//       {/* ================= HEADER ================= */}
//       <div className="p-5 border-b border-green-700">

//         <h1 className="text-2xl font-bold">

//           Travel System

//         </h1>

//         <p className="text-xs text-green-200 mt-1">

//           Finance Panel

//         </p>

//       </div>

//       {/* ================= MENU ================= */}
//       <div className="flex flex-col gap-2 p-4">

//         {/* DASHBOARD */}
//         <Link
//           to="/finance/dashboard"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive("/finance/dashboard")
//               ? "bg-green-600"
//               : "hover:bg-green-700"
//           }`}
//         >

//           <FaChartBar />

//           Dashboard

//         </Link>

//         {/* EXPENSE APPROVALS */}
//         <Link
//           to="/finance/expenses"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive("/finance/expenses")
//               ? "bg-green-600"
//               : "hover:bg-green-700"
//           }`}
//         >

//           <FaMoneyBillWave />

//           Expense Approvals

//         </Link>

//         {/* REIMBURSEMENTS */}
//         <Link
//           to="/finance/reimbursements"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive("/finance/reimbursements")
//               ? "bg-green-600"
//               : "hover:bg-green-700"
//           }`}
//         >

//           <FaCheckCircle />

//           Reimbursements

//         </Link>

        
//         {/* PAYMENT HISTORY */}
//         <Link
//           to="/finance/history"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive("/finance/history")
//               ? "bg-green-600"
//               : "hover:bg-green-700"
//           }`}
//         >

//           <FaHistory />

//           Payment History

//         </Link>

//         {/* REPORTS */}
//         <Link
//           to="/finance/reports"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive("/finance/reports")
//               ? "bg-green-600"
//               : "hover:bg-green-700"
//           }`}
//         >

//           <FaFileInvoice />

//           Reports

//         </Link>

//         {/* PROFILE */}
//         <Link
//           to="/finance/profile"
//           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
//             isActive("/finance/profile")
//               ? "bg-green-600"
//               : "hover:bg-green-700"
//           }`}
//         >

//           <FaUser />

//           Profile

//         </Link>

//       </div>

//       {/* ================= FOOTER ================= */}
//       <div className="mt-auto p-4 border-t border-green-700 text-xs text-green-200">

//         v1.0 • Finance Module

//       </div>

//     </div>

//   );
// };

// export default FinanceSidebar;





import {
    LayoutDashboard,
    Receipt,
    Wallet,
    CreditCard,
    FileBarChart2,
    ShieldCheck,
    User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const FinanceSidebar = () => {

    // ==========================================
    // MENU ITEMS
    // ==========================================

    const menuItems = [

        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/finance/dashboard",
        },

        {
            title: "Expense Reviews",
            icon: <Receipt size={20} />,
            path: "/finance/expense-reviews",
        },

        {
            title: "Reimbursements",
            icon: <Wallet size={20} />,
            path: "/finance/reimbursements",
        },

        {
            title: "Payment History",
            icon: <CreditCard size={20} />,
            path: "/finance/payment-history",
        },

        {
            title: "Financial Reports",
            icon: <FileBarChart2 size={20} />,
            path: "/finance/reports",
        },

        {
            title: "Audit & Verification",
            icon: <ShieldCheck size={20} />,
            path: "/finance/audit",
        },

        {
            title: "Profile",
            icon: <User size={20} />,
            path: "/finance/profile",
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
                        text-yellow-400
                    "
                >
                    Finance
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Financial Control Workspace
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
                                        ? "bg-yellow-400 text-black shadow-md"
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
                    Finance Management Console
                </p>

                <p className="mt-1">
                    Expense & Reimbursement Monitoring
                </p>

            </div>

        </div>
    );
};

export default FinanceSidebar;