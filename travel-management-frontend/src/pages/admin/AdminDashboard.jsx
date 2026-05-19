import {

  useGetAllUsersQuery,

  useGetAllRequestsQuery,

  useGetPendingRequestsQuery,

  useGetPoliciesQuery,

} from "../../services/adminApi";

function AdminDashboard() {

  const { data: users = [] } =
    useGetAllUsersQuery();

  const { data: requests = [] } =
    useGetAllRequestsQuery();

  const { data: pending = [] } =
    useGetPendingRequestsQuery();

  const { data: policies = [] } =
    useGetPoliciesQuery();

  // COUNTS
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

  return (

    <div className="space-y-6">

  

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* USERS */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:scale-105 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Total Users
              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-2">
                {users.length}
              </h1>

            </div>

            

          </div>

        </div>

        {/* REQUESTS */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:scale-105 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Travel Requests
              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-2">
                {requests.length}
              </h1>

            </div>

            

          </div>

        </div>

        {/* PENDING */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:scale-105 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Pending Approvals
              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-2">
                {pending.length}
              </h1>

            </div>

            

          </div>

        </div>

        {/* POLICIES */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:scale-105 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Active Policies
              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-2">
                {activePolicies}
              </h1>

            </div>

            

          </div>

        </div>

      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* SYSTEM STATUS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            System Status
          </h2>

          <div className="space-y-4">

            <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">

              <div className="flex items-center gap-3">

                <span className="text-green-600 text-xl">
                  ✔
                </span>

                <p className="font-medium text-slate-700">
                  User Management
                </p>

              </div>

              <span className="text-green-600 font-semibold">
                Active
              </span>

            </div>

            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl">

              <div className="flex items-center gap-3">

                <span className="text-blue-600 text-xl">
                  ✔
                </span>

                <p className="font-medium text-slate-700">
                  Travel Policies
                </p>

              </div>

              <span className="text-blue-600 font-semibold">
                Running
              </span>

            </div>

            <div className="flex items-center justify-between bg-yellow-50 p-4 rounded-xl">

              <div className="flex items-center gap-3">

                <span className="text-yellow-600 text-xl">
                  ✔
                </span>

                <p className="font-medium text-slate-700">
                  Approval Workflow
                </p>

              </div>

              <span className="text-yellow-600 font-semibold">
                Enabled
              </span>

            </div>

            <div className="flex items-center justify-between bg-purple-50 p-4 rounded-xl">

              <div className="flex items-center gap-3">

                <span className="text-purple-600 text-xl">
                  ✔
                </span>

                <p className="font-medium text-slate-700">
                  Audit Logging
                </p>

              </div>

              <span className="text-purple-600 font-semibold">
                Active
              </span>

            </div>

          </div>

        </div>

        {/* QUICK INSIGHTS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Quick Insights
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">

              <div>

                <h3 className="font-semibold text-slate-700">
                  Active Users
                </h3>

                <p className="text-sm text-gray-500">
                  Currently enabled users
                </p>

              </div>

              <span className="text-2xl font-bold text-green-600">
                {activeUsers}
              </span>

            </div>

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">

              <div>

                <h3 className="font-semibold text-slate-700">
                  Disabled Users
                </h3>

                <p className="text-sm text-gray-500">
                  Restricted accounts
                </p>

              </div>

              <span className="text-2xl font-bold text-red-600">
                {disabledUsers}
              </span>

            </div>

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">

              <div>

                <h3 className="font-semibold text-slate-700">
                  Pending Requests
                </h3>

                <p className="text-sm text-gray-500">
                  Awaiting approvals
                </p>

              </div>

              <span className="text-2xl font-bold text-yellow-600">
                {pending.length}
              </span>

            </div>

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">

              <div>

                <h3 className="font-semibold text-slate-700">
                  System Health
                </h3>

                <p className="text-sm text-gray-500">
                  Core platform status
                </p>

              </div>

              <span className="text-lg font-bold text-green-600">
                Stable
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">

            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
              👤
            </div>

            <div>

              <h3 className="font-semibold text-slate-700">
                User management system active
              </h3>

              <p className="text-sm text-gray-500">
                Admin can manage users and roles
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">

            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
              ✈️
            </div>

            <div>

              <h3 className="font-semibold text-slate-700">
                Travel request workflow enabled
              </h3>

              <p className="text-sm text-gray-500">
                Employees can submit requests
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">

            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">
              📑
            </div>

            <div>

              <h3 className="font-semibold text-slate-700">
                Travel policies configured
              </h3>

              <p className="text-sm text-gray-500">
                Budget and class rules active
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;