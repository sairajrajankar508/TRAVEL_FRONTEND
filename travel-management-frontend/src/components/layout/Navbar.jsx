// import {

//   FaBell,

//   FaUserCircle,

//   FaSignOutAlt,

// } from "react-icons/fa";

// const Navbar = () => {

//   const role =
//   localStorage.getItem("role");

// const userEmail =
//   localStorage.getItem("email");

// const userName =
//   localStorage.getItem("name");

//   // LOGOUT
//   const handleLogout = () => {

//     const confirmLogout =
//       window.confirm(
//         "Are you sure you want to logout?"
//       );

//     if (!confirmLogout) return;

//     localStorage.clear();

//     window.location.href = "/";
//   };

//   return (

//     <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">

//       <div className="h-20 px-8 flex items-center justify-between">

//         {/* LEFT SECTION */}
//         <div>

//           <h1 className="text-2xl font-bold text-slate-800 tracking-wide">

//             {role} Dashboard

//           </h1>

//           <p className="text-sm text-gray-500 mt-1">

//             Corporate Travel Management System

//           </p>

//         </div>

//         {/* RIGHT SECTION */}
//         <div className="flex items-center gap-5">

//           {/* NOTIFICATION */}
//           <button className="relative w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-slate-700">

//             <FaBell size={18} />

//             {/* DOT */}
//             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

//           </button>

//           {/* USER INFO */}
// <div className="hidden md:flex items-center gap-3 bg-slate-100 hover:bg-slate-200 transition px-4 py-2 rounded-2xl shadow-sm">

//   <FaUserCircle
//     size={38}
//     className="text-cyan-600"
//   />

//   <div>

//     {/* USER NAME */}
//     <p className="text-sm font-bold text-slate-800">

//       {userName || "System User"}

//     </p>

//     {/* EMAIL */}
//     <p className="text-xs text-gray-500">

//       {userEmail ||
//         "travel@system.com"}

//     </p>

//     {/* ROLE */}
//     <p className="text-[11px] text-cyan-600 font-semibold uppercase tracking-wide mt-1">

//       {role}

//     </p>

//   </div>

// </div>

//           {/* LOGOUT BUTTON */}
//           <button
//             onClick={
//               handleLogout
//             }
//             className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-3 rounded-2xl shadow-md transition-all duration-300 hover:scale-105"
//           >

//             <FaSignOutAlt />

//             Logout

//           </button>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Navbar;





import {
    Menu,
    Bell,
    LogOut,
    UserCircle2,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/authSlice";

const Navbar = ({
    sidebarOpen,
    setSidebarOpen,
}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ==========================================
    // AUTH STATE
    // ==========================================

    const {
        user,
        role,
    } = useSelector(
        (state) => state.auth
    );

    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        dispatch(logout());

        navigate("/login");
    };

    // ==========================================
    // ROLE BADGE COLORS
    // ==========================================

    const getRoleColor = () => {

        switch (role) {

            case "ADMIN":
                return "bg-red-500";

            case "EMPLOYEE":
                return "bg-green-500";

            case "MANAGER":
                return "bg-purple-500";

            case "FINANCE":
                return "bg-yellow-400 text-black";

            default:
                return "bg-gray-500";
        }
    };

    return (

        <header
            className="
                bg-white
                border-b
                border-gray-200
                shadow-sm
                px-6
                py-4
                flex
                items-center
                justify-between
            "
        >

            {/* ========================================== */}
            {/* LEFT SIDE */}
            {/* ========================================== */}

            <div className="flex items-center gap-4">

                {/* SIDEBAR TOGGLE */}

                <button
                    onClick={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                    className="
                        p-2
                        rounded-lg
                        hover:bg-gray-100
                        transition
                    "
                >

                    <Menu size={22} />

                </button>

                {/* TITLE */}

                <div>

                    <h1
                        className="
                            text-xl
                            font-bold
                            text-gray-800
                        "
                    >
                        Travel Management System
                    </h1>

                    <p
                        className="
                            text-sm
                            text-gray-500
                        "
                    >
                        Enterprise Travel Platform
                    </p>

                </div>

            </div>

            {/* ========================================== */}
            {/* RIGHT SIDE */}
            {/* ========================================== */}

            <div className="flex items-center gap-5">

                {/* NOTIFICATION */}

                <button
                    className="
                        relative
                        p-2
                        rounded-full
                        hover:bg-gray-100
                        transition
                    "
                >

                    <Bell size={22} />

                    <span
                        className="
                            absolute
                            -top-1
                            -right-1
                            bg-red-500
                            text-white
                            text-[10px]
                            w-4
                            h-4
                            flex
                            items-center
                            justify-center
                            rounded-full
                        "
                    >
                        3
                    </span>

                </button>

                {/* USER INFO */}

                <div className="flex items-center gap-3">

                    {/* AVATAR */}

                    <div
                        className="
                            w-10
                            h-10
                            rounded-full
                            bg-gray-200
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <UserCircle2
                            size={28}
                            className="text-gray-600"
                        />

                    </div>

                    {/* DETAILS */}

                    <div className="hidden md:block">

                        <p
                            className="
                                text-sm
                                font-semibold
                                text-gray-800
                            "
                        >
                            {user?.name || "User"}
                        </p>

                        <p
                            className="
                                text-xs
                                text-gray-500
                            "
                        >
                            {user?.email}
                        </p>

                    </div>

                </div>

                {/* ROLE BADGE */}

                <span
                    className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        text-white
                        ${getRoleColor()}
                    `}
                >

                    {role}

                </span>

                {/* LOGOUT */}

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        items-center
                        gap-2
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        transition
                        text-sm
                        font-medium
                    "
                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </header>
    );
};

export default Navbar;