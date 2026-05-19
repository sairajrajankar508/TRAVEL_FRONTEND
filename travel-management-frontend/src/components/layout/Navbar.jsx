import {

  FaBell,

  FaUserCircle,

  FaSignOutAlt,

} from "react-icons/fa";

const Navbar = () => {

  const role =
  localStorage.getItem("role");

const userEmail =
  localStorage.getItem("email");

const userName =
  localStorage.getItem("name");

  // LOGOUT
  const handleLogout = () => {

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmLogout) return;

    localStorage.clear();

    window.location.href = "/";
  };

  return (

    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">

      <div className="h-20 px-8 flex items-center justify-between">

        {/* LEFT SECTION */}
        <div>

          <h1 className="text-2xl font-bold text-slate-800 tracking-wide">

            {role} Dashboard

          </h1>

          <p className="text-sm text-gray-500 mt-1">

            Corporate Travel Management System

          </p>

        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-5">

          {/* NOTIFICATION */}
          <button className="relative w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-slate-700">

            <FaBell size={18} />

            {/* DOT */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

          </button>

          {/* USER INFO */}
<div className="hidden md:flex items-center gap-3 bg-slate-100 hover:bg-slate-200 transition px-4 py-2 rounded-2xl shadow-sm">

  <FaUserCircle
    size={38}
    className="text-cyan-600"
  />

  <div>

    {/* USER NAME */}
    <p className="text-sm font-bold text-slate-800">

      {userName || "System User"}

    </p>

    {/* EMAIL */}
    <p className="text-xs text-gray-500">

      {userEmail ||
        "travel@system.com"}

    </p>

    {/* ROLE */}
    <p className="text-[11px] text-cyan-600 font-semibold uppercase tracking-wide mt-1">

      {role}

    </p>

  </div>

</div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={
              handleLogout
            }
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-3 rounded-2xl shadow-md transition-all duration-300 hover:scale-105"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </div>
  );
};

export default Navbar;