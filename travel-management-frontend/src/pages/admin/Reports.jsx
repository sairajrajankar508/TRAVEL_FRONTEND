import {
  useGetAllUsersQuery,
  useGetAllRequestsQuery,
  useGetPoliciesQuery,
} from "../../services/adminApi";

import {
  FaUsers,
  FaPlaneDeparture,
  FaClipboardCheck,
  FaFileAlt,
  FaUserShield,
  FaUserTie,
  FaMoneyBillWave,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaBuilding,
} from "react-icons/fa";

const Reports = () => {

  const { data: users = [] } =
    useGetAllUsersQuery();

  const { data: requests = [] } =
    useGetAllRequestsQuery();

  const { data: policies = [] } =
    useGetPoliciesQuery();

  // ================= TOTALS =================
  const totalUsers =
    users.length;

  const totalRequests =
    requests.length;

  const totalPolicies =
    policies.length;

  const activePolicies =
    policies.filter(
      (p) => p.active
    ).length;

  const disabledPolicies =
    policies.filter(
      (p) => !p.active
    ).length;

  const pendingRequests =
    requests.filter(
      (r) =>
        r.status ===
        "SUBMITTED"
    ).length;

  const approvedRequests =
    requests.filter(
      (r) =>
        r.status ===
          "MANAGER_APPROVED" ||
        r.status ===
          "FINANCE_APPROVED"
    ).length;

  const rejectedRequests =
    requests.filter(
      (r) =>
        r.status ===
        "REJECTED"
    ).length;

  // ================= ROLE COUNTS =================
  const adminCount =
    users.filter(
      (u) =>
        u.role === "ADMIN"
    ).length;

  const employeeCount =
    users.filter(
      (u) =>
        u.role ===
        "EMPLOYEE"
    ).length;

  const managerCount =
    users.filter(
      (u) =>
        u.role ===
        "MANAGER"
    ).length;

  const financeCount =
    users.filter(
      (u) =>
        u.role ===
        "FINANCE"
    ).length;

  // ================= DEPARTMENT COUNTS =================
  const departments = {};

  users.forEach((user) => {

    const dept =
      user.department ||
      "Unknown";

    departments[dept] =
      (departments[dept] || 0) + 1;
  });

  return (

    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">

              Reports & Analytics

            </h1>

            <p className="text-slate-500 mt-3 text-lg">

              Monitor system performance, travel requests,
              users and policies in real-time

            </p>

          </div>

          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-6 py-4 rounded-2xl shadow-lg">

            <p className="text-sm opacity-90">

              Total Platform Activity

            </p>

            <h2 className="text-3xl font-bold mt-1">

              {totalRequests}

            </h2>

          </div>

        </div>

      </div>

      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* USERS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Total Users

              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">

                {totalUsers}

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 text-3xl">

              <FaUsers />

            </div>

          </div>

        </div>

        {/* REQUESTS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Travel Requests

              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">

                {totalRequests}

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 text-3xl">

              <FaPlaneDeparture />

            </div>

          </div>

        </div>

        {/* PENDING */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Pending Requests

              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">

                {pendingRequests}

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-700 text-3xl">

              <FaClipboardCheck />

            </div>

          </div>

        </div>

        {/* POLICIES */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Total Policies

              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">

                {totalPolicies}

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 text-3xl">

              <FaFileAlt />

            </div>

          </div>

        </div>

      </div>

      {/* ================= REQUEST ANALYTICS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* APPROVED */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Approved Requests

              </p>

              <h2 className="text-5xl font-bold text-green-600 mt-4">

                {approvedRequests}

              </h2>

            </div>

            <FaCheckCircle className="text-5xl text-green-500" />

          </div>

        </div>

        {/* REJECTED */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Rejected Requests

              </p>

              <h2 className="text-5xl font-bold text-red-600 mt-4">

                {rejectedRequests}

              </h2>

            </div>

            <FaTimesCircle className="text-5xl text-red-500" />

          </div>

        </div>

        {/* POLICIES */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Active Policies

              </p>

              <h2 className="text-5xl font-bold text-cyan-600 mt-4">

                {activePolicies}

              </h2>

              <p className="text-sm text-slate-400 mt-3">

                Disabled Policies: {disabledPolicies}

              </p>

            </div>

            <FaFileAlt className="text-5xl text-cyan-500" />

          </div>

        </div>

      </div>

      {/* ================= ROLE DISTRIBUTION ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        <div className="p-7 border-b border-slate-200">

          <h2 className="text-2xl font-bold text-slate-800">

            User Role Distribution

          </h2>

          <p className="text-slate-500 mt-2">

            Distribution of users across system roles

          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Role

                </th>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Total Users

                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t hover:bg-slate-50 transition">

                <td className="p-5 text-center">

                  <div className="flex justify-center">

                    <span className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">

                      <FaUserShield />

                      ADMIN

                    </span>

                  </div>

                </td>

                <td className="p-5 text-center font-bold text-lg">

                  {adminCount}

                </td>

              </tr>

              <tr className="hover:bg-slate-50 transition">

                <td className="p-5 text-center">

                  <div className="flex justify-center">

                    <span className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

                      <FaUser />

                      EMPLOYEE

                    </span>

                  </div>

                </td>

                <td className="p-5 text-center font-bold text-lg">

                  {employeeCount}

                </td>

              </tr>

              <tr className="hover:bg-slate-50 transition">

                <td className="p-5 text-center">

                  <div className="flex justify-center">

                    <span className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">

                      <FaUserTie />

                      MANAGER

                    </span>

                  </div>

                </td>

                <td className="p-5 text-center font-bold text-lg">

                  {managerCount}

                </td>

              </tr>

              <tr className="hover:bg-slate-50 transition">

                <td className="p-5 text-center">

                  <div className="flex justify-center">

                    <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                      <FaMoneyBillWave />

                      FINANCE

                    </span>

                  </div>

                </td>

                <td className="p-5 text-center font-bold text-lg">

                  {financeCount}

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= DEPARTMENT ANALYTICS ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        <div className="p-7 border-b border-slate-200">

          <h2 className="text-2xl font-bold text-slate-800">

            Department Analytics

          </h2>

          <p className="text-slate-500 mt-2">

            Employees grouped by department

          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100 border-b border-slate-700">

              <tr>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Department

                </th>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Employees

                </th>

              </tr>

            </thead>

            <tbody>

              {Object.entries(
                departments
              ).map(
                ([dept, count]) => (

                  <tr
                    key={dept}
                    className="hover:bg-slate-50 transition"
                  >

                    <td className="p-5 text-center">

                      <div className="flex justify-center">

                        <span className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-semibold">

                          <FaBuilding />

                          {dept}

                        </span>

                      </div>

                    </td>

                    <td className="p-5 text-center font-bold text-lg">

                      {count}

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Reports;