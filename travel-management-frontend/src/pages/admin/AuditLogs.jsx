import {
  FaClipboardList,
  FaCheckCircle,
  FaShieldAlt,
  FaUserShield,
  FaUserTie,
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaExclamationTriangle,
  FaHistory,
} from "react-icons/fa";

import {
  useGetAuditLogsQuery,
  useGetAllUsersQuery,
  useGetAllRequestsQuery,
} from "../../services/adminApi";

const AuditLogs = () => {

  // ================= API =================
  const {
    data: logs = [],
    isLoading,
  } = useGetAuditLogsQuery();

  const {
    data: users = [],
  } = useGetAllUsersQuery();

  const {
    data: requests = [],
  } = useGetAllRequestsQuery();

  // ================= STATS =================
  const adminCount =
    users.filter(
      (u) => u.role === "ADMIN"
    ).length;

  const managerCount =
    users.filter(
      (u) => u.role === "MANAGER"
    ).length;

  const employeeCount =
    users.filter(
      (u) => u.role === "EMPLOYEE"
    ).length;

  const financeCount =
    users.filter(
      (u) => u.role === "FINANCE"
    ).length;

  const pendingRequests =
    requests.filter(
      (r) =>
        r.status === "SUBMITTED"
    ).length;

  const approvedRequests =
    requests.filter(
      (r) =>
        r.status ===
          "MANAGER_APPROVED" ||
        r.status ===
          "FINANCE_APPROVED"
    ).length;

  // ================= LOADING =================
  if (isLoading) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h1 className="text-2xl font-bold text-slate-700 mt-5">

            Loading Audit Logs...

          </h1>

        </div>

      </div>
    );
  }

  return (

    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">

              Audit Logs

            </h1>

            <p className="text-slate-500 mt-3 text-lg">

              Monitor all system activities, security events and administrative actions

            </p>

          </div>

          <div className="flex items-center gap-4 bg-green-50 border border-green-200 px-6 py-4 rounded-2xl">

            <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>

            <div>

              <p className="text-green-700 font-bold">

                System Monitoring Active

              </p>

              <p className="text-sm text-green-600">

                Real-time audit tracking enabled

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* TOTAL LOGS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Total Logs

              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">

                {logs.length}

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 text-3xl">

              <FaClipboardList />

            </div>

          </div>

          <p className="text-sm text-slate-400 mt-4">

            Recorded activities

          </p>

        </div>

        {/* APPROVED REQUESTS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Approved Requests

              </p>

              <h2 className="text-4xl font-bold text-green-700 mt-3">

                {approvedRequests}

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 text-3xl">

              <FaCheckCircle />

            </div>

          </div>

          <p className="text-sm text-slate-400 mt-4">

            Successfully approved

          </p>

        </div>

        {/* PENDING */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Pending Requests

              </p>

              <h2 className="text-4xl font-bold text-yellow-600 mt-3">

                {pendingRequests}

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-700 text-3xl">

              <FaClock />

            </div>

          </div>

          <p className="text-sm text-slate-400 mt-4">

            Awaiting approval

          </p>

        </div>

        {/* SECURITY */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Security Status

              </p>

              <h2 className="text-3xl font-bold text-red-600 mt-3">

                SECURED

              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-700 text-3xl">

              <FaShieldAlt />

            </div>

          </div>

          <p className="text-sm text-slate-400 mt-4">

            Real-time protection enabled

          </p>

        </div>

      </div>

      {/* ================= USER ANALYTICS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ROLE DISTRIBUTION */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          <div className="p-6 border-b border-slate-200 flex items-center gap-3">

            <FaUsers className="text-cyan-600 text-2xl" />

            <h2 className="text-2xl font-bold text-slate-800">

              User Distribution

            </h2>

          </div>

          <div className="p-6 space-y-5">

            {/* ADMIN */}
            <div className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-2xl p-5">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 text-2xl">

                  <FaUserShield />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">

                    Admins

                  </h3>

                  <p className="text-slate-500 text-sm">

                    System administrators

                  </p>

                </div>

              </div>

              <h2 className="text-3xl font-bold text-purple-700">

                {adminCount}

              </h2>

            </div>

            {/* MANAGER */}
            <div className="flex items-center justify-between bg-yellow-50 border border-yellow-100 rounded-2xl p-5">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-700 text-2xl">

                  <FaUserTie />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">

                    Managers

                  </h3>

                  <p className="text-slate-500 text-sm">

                    Approval managers

                  </p>

                </div>

              </div>

              <h2 className="text-3xl font-bold text-yellow-700">

                {managerCount}

              </h2>

            </div>

            {/* EMPLOYEE */}
            <div className="flex items-center justify-between bg-cyan-50 border border-cyan-100 rounded-2xl p-5">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 text-2xl">

                  <FaUsers />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">

                    Employees

                  </h3>

                  <p className="text-slate-500 text-sm">

                    Registered employees

                  </p>

                </div>

              </div>

              <h2 className="text-3xl font-bold text-cyan-700">

                {employeeCount}

              </h2>

            </div>

            {/* FINANCE */}
            <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-2xl p-5">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 text-2xl">

                  <FaMoneyBillWave />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">

                    Finance

                  </h3>

                  <p className="text-slate-500 text-sm">

                    Finance team users

                  </p>

                </div>

              </div>

              <h2 className="text-3xl font-bold text-green-700">

                {financeCount}

              </h2>

            </div>

          </div>

        </div>

        {/* SYSTEM INSIGHTS */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          <div className="p-6 border-b border-slate-200 flex items-center gap-3">

            <FaHistory className="text-blue-600 text-2xl" />

            <h2 className="text-2xl font-bold text-slate-800">

              System Insights

            </h2>

          </div>

          <div className="p-6 space-y-5">

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="font-bold text-slate-800">

                    Total Users

                  </h3>

                  <p className="text-slate-500 text-sm">

                    Active registered accounts

                  </p>

                </div>

                <h2 className="text-3xl font-bold text-slate-800">

                  {users.length}

                </h2>

              </div>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="font-bold text-slate-800">

                    Total Requests

                  </h3>

                  <p className="text-slate-500 text-sm">

                    Submitted travel requests

                  </p>

                </div>

                <h2 className="text-3xl font-bold text-slate-800">

                  {requests.length}

                </h2>

              </div>

            </div>

            <div className="bg-red-50 rounded-2xl p-5 border border-red-200">

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="font-bold text-red-700">

                    Security Alerts

                  </h3>

                  <p className="text-red-500 text-sm">

                    Unusual activities detected

                  </p>

                </div>

                <h2 className="text-3xl font-bold text-red-700">

                  0

                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= AUDIT LOGS TABLE ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        {/* HEADER */}
        <div className="p-7 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              Activity Logs

            </h2>

            <p className="text-slate-500 mt-1">

              Recent system and security activities

            </p>

          </div>

          <div className="bg-slate-100 px-5 py-3 rounded-2xl">

            <p className="text-slate-600 font-semibold">

              {logs.length} Activity Records

            </p>

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Action

                </th>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Performed By

                </th>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Timestamp

                </th>

                <th className="text-center p-5 font-semibold text-slate-700">

                  Status

                </th>

              </tr>

            </thead>

            <tbody>

              {logs.length > 0 ? (

                logs.map((log) => (

                  <tr
                    key={log.id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                  >

                    {/* ACTION */}
                    <td className="p-5 text-center">

                      <div className="font-bold text-slate-800">

                        {log.action}

                      </div>

                    </td>

                    {/* USER */}
                    <td className="p-5 text-center">

                      <span className="font-medium text-slate-700">

                        {log.performedBy}

                      </span>

                    </td>

                    {/* TIMESTAMP */}
                    <td className="p-5 text-center text-slate-500">

                      {log.timestamp}

                    </td>

                    {/* STATUS */}
                    <td className="p-5 text-center">

                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">

                        <FaCheckCircle />

                        Success

                      </span>

                    </td>

                  </tr>
                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center p-16"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl">

                        <FaExclamationTriangle />

                      </div>

                      <h2 className="text-2xl font-bold text-slate-700 mt-5">

                        No Audit Logs Found

                      </h2>

                      <p className="text-slate-500 mt-2">

                        System activity logs will appear here

                      </p>

                    </div>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AuditLogs;