import {

  useGetAllUsersQuery,
  useGetAllRequestsQuery,
  useGetPendingRequestsQuery,
  useGetPoliciesQuery,

} from "../../services/adminApi";

import {

  FaUsers,
  FaPlaneDeparture,
  FaClock,
  FaFileAlt,
  FaUserCheck,
  FaUserSlash,
  FaShieldAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaClipboardCheck,

} from "react-icons/fa";

function AdminDashboard() {

  const { data: users = [] } =
    useGetAllUsersQuery();

  const { data: requests = [] } =
    useGetAllRequestsQuery();

  const { data: pending = [] } =
    useGetPendingRequestsQuery();

  const { data: policies = [] } =
    useGetPoliciesQuery();

  // ================= COUNTS =================

  const activeUsers =
    users.filter(
      (u) => u.active
    ).length;

  const disabledUsers =
    users.filter(
      (u) => !u.active
    ).length;

  const activePolicies =
    policies.filter(
      (p) => p.active
    ).length;

  const approvedRequests =
    requests.filter(
      (r) => r.status === "APPROVED"
    ).length;

  const rejectedRequests =
    requests.filter(
      (r) => r.status === "REJECTED"
    ).length;

  return (

    <div className="space-y-8">
      
      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* USERS */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Total Users

              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-3">

                {users.length}

              </h1>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 text-3xl">

              <FaUsers />

            </div>

          </div>

        </div>

        {/* REQUESTS */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Travel Requests

              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-3">

                {requests.length}

              </h1>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 text-3xl">

              <FaPlaneDeparture />

            </div>

          </div>

        </div>

        {/* PENDING */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Pending

              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-3">

                {pending.length}

              </h1>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-700 text-3xl">

              <FaClock />

            </div>

          </div>

        </div>

        {/* POLICIES */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Active Policies

              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-3">

                {activePolicies}

              </h1>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 text-3xl">

              <FaFileAlt />

            </div>

          </div>

        </div>

      </div>

      {/* ================= SYSTEM + INSIGHTS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* SYSTEM STATUS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-7">

          <div className="flex items-center gap-3 mb-6">

            <FaShieldAlt className="text-red-600 text-2xl" />

            <h2 className="text-2xl font-bold text-slate-800">

              Core Modules Status

            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-2xl">

              <div className="flex items-center gap-3">

                <FaUsers className="text-blue-700" />

                <span className="font-medium text-slate-700">

                  User Management

                </span>

              </div>

              <span className="font-bold text-blue-700">

                Active

              </span>

            </div>

            <div className="flex justify-between items-center bg-purple-50 p-4 rounded-2xl">

              <div className="flex items-center gap-3">

                <FaPlaneDeparture className="text-purple-700" />

                <span className="font-medium text-slate-700">

                  Travel Workflow

                </span>

              </div>

              <span className="font-bold text-purple-700">

                Running

              </span>

            </div>

            <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-2xl">

              <div className="flex items-center gap-3">

                <FaClipboardCheck className="text-yellow-700" />

                <span className="font-medium text-slate-700">

                  Approval Engine

                </span>

              </div>

              <span className="font-bold text-yellow-700">

                Enabled

              </span>

            </div>

            <div className="flex justify-between items-center bg-green-50 p-4 rounded-2xl">

              <div className="flex items-center gap-3">

                <FaMoneyBillWave className="text-green-700" />

                <span className="font-medium text-slate-700">

                  Finance System

                </span>

              </div>

              <span className="font-bold text-green-700">

                Stable

              </span>

            </div>

          </div>

        </div>

        {/* QUICK INSIGHTS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-7">

          <div className="flex items-center gap-3 mb-6">

            <FaChartLine className="text-indigo-600 text-2xl" />

            <h2 className="text-2xl font-bold text-slate-800">

              Quick Insights

            </h2>

          </div>

          <div className="space-y-5">

            {/* ACTIVE USERS */}
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">

              <div className="flex items-center gap-3">

                <FaUserCheck className="text-green-600 text-xl" />

                <div>

                  <h3 className="font-semibold text-slate-700">

                    Active Users

                  </h3>

                  <p className="text-sm text-gray-500">

                    Enabled accounts

                  </p>

                </div>

              </div>

              <span className="text-2xl font-bold text-green-600">

                {activeUsers}

              </span>

            </div>

            {/* DISABLED USERS */}
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">

              <div className="flex items-center gap-3">

                <FaUserSlash className="text-red-600 text-xl" />

                <div>

                  <h3 className="font-semibold text-slate-700">

                    Disabled Users

                  </h3>

                  <p className="text-sm text-gray-500">

                    Restricted accounts

                  </p>

                </div>

              </div>

              <span className="text-2xl font-bold text-red-600">

                {disabledUsers}

              </span>

            </div>

            {/* APPROVED */}
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">

              <div>

                <h3 className="font-semibold text-slate-700">

                  Approved Requests

                </h3>

                <p className="text-sm text-gray-500">

                  Successfully approved travels

                </p>

              </div>

              <span className="text-2xl font-bold text-blue-600">

                {approvedRequests}

              </span>

            </div>

            {/* REJECTED */}
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">

              <div>

                <h3 className="font-semibold text-slate-700">

                  Rejected Requests

                </h3>

                <p className="text-sm text-gray-500">

                  Requests rejected by managers

                </p>

              </div>

              <span className="text-2xl font-bold text-red-500">

                {rejectedRequests}

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================= RECENT PLATFORM ACTIVITY ================= */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-7">

        <h2 className="text-2xl font-bold text-slate-800 mb-7">

          Recent Platform Activity

        </h2>

        <div className="space-y-5">

          {/* USER MANAGEMENT */}
          <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-2xl hover:bg-slate-100 transition">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">

              👤

            </div>

            <div>

              <h3 className="font-semibold text-slate-700 text-lg">

                User management system operational

              </h3>

              <p className="text-sm text-gray-500 mt-1">

                Admin can manage employees, managers and finance accounts

              </p>

            </div>

          </div>

          {/* WORKFLOW */}
          <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-2xl hover:bg-slate-100 transition">

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">

              ✈️

            </div>

            <div>

              <h3 className="font-semibold text-slate-700 text-lg">

                Travel approval workflow active

              </h3>

              <p className="text-sm text-gray-500 mt-1">

                Employee → Manager → Finance approval pipeline enabled

              </p>

            </div>

          </div>

          {/* FINANCE */}
          <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-2xl hover:bg-slate-100 transition">

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">

              💰

            </div>

            <div>

              <h3 className="font-semibold text-slate-700 text-lg">

                Reimbursement processing enabled

              </h3>

              <p className="text-sm text-gray-500 mt-1">

                Finance team can process and track reimbursements

              </p>

            </div>

          </div>

          {/* POLICY */}
          <div className="flex items-center gap-5 bg-slate-50 p-5 rounded-2xl hover:bg-slate-100 transition">

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-2xl">

              📑

            </div>

            <div>

              <h3 className="font-semibold text-slate-700 text-lg">

                Travel policies configured

              </h3>

              <p className="text-sm text-gray-500 mt-1">

                Budget rules, expense limits and policy engine active

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;