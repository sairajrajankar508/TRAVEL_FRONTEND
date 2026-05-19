import {
  useGetAllUsersQuery,
  useGetAllRequestsQuery,
  useGetPoliciesQuery,
} from "../../services/adminApi";

const Reports = () => {

  const { data: users = [] } =
    useGetAllUsersQuery();

  const { data: requests = [] } =
    useGetAllRequestsQuery();

  const { data: policies = [] } =
    useGetPoliciesQuery();

  // TOTALS
  const totalUsers = users.length;

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

  const rejectedRequests =
    requests.filter(
      (r) =>
        r.status === "REJECTED"
    ).length;

  // ROLE COUNTS
  const adminCount =
    users.filter(
      (u) => u.role === "ADMIN"
    ).length;

  const employeeCount =
    users.filter(
      (u) =>
        u.role === "EMPLOYEE"
    ).length;

  const managerCount =
    users.filter(
      (u) =>
        u.role === "MANAGER"
    ).length;

  const financeCount =
    users.filter(
      (u) =>
        u.role === "FINANCE"
    ).length;

  // DEPARTMENT COUNTS
  const departments = {};

  users.forEach((user) => {

    const dept =
      user.department ||
      "Unknown";

    departments[dept] =
      (departments[dept] || 0) + 1;
  });

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Reports & Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          System-wide reporting,
          monitoring and insights
        </p>

      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* TOTAL USERS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-105 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Total Users
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">
                {totalUsers}
              </h2>

            </div>

            

          </div>

          <p className="text-sm text-gray-400 mt-4">
            Registered system users
          </p>

        </div>

        {/* REQUESTS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-105 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Travel Requests
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">
                {totalRequests}
              </h2>

            </div>

            

          </div>

          <p className="text-sm text-gray-400 mt-4">
            Total submitted requests
          </p>

        </div>

        {/* PENDING */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-105 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Pending
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">
                {pendingRequests}
              </h2>

            </div>

            

          </div>

          <p className="text-sm text-gray-400 mt-4">
            Awaiting approval
          </p>

        </div>

        {/* POLICIES */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-105 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Policies
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">
                {totalPolicies}
              </h2>

            </div>

            

          </div>

          <p className="text-sm text-gray-400 mt-4">
            Active travel policies
          </p>

        </div>

      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

          <h2 className="text-lg font-semibold text-slate-700">
            Approved Requests
          </h2>

          <p className="text-4xl font-bold mt-4">
            {approvedRequests}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

          <h2 className="text-lg font-semibold text-slate-700">
            Rejected Requests
          </h2>

          <p className="text-4xl font-bold mt-4">
            {rejectedRequests}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

          <h2 className="text-lg font-semibold text-slate-700">
            Active Policies
          </h2>

          <p className="text-4xl font-bold mt-4">
            {activePolicies}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Disabled:{" "}
            {disabledPolicies}
          </p>

        </div>

      </div>

      {/* ROLE REPORT */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold text-slate-800">
            User Role Distribution
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-5">
                Role
              </th>

              <th className="text-left p-5">
                Total Users
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t">
              <td className="p-5">
                ADMIN
              </td>
              <td className="p-5">
                {adminCount}
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-5">
                EMPLOYEE
              </td>
              <td className="p-5">
                {employeeCount}
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-5">
                MANAGER
              </td>
              <td className="p-5">
                {managerCount}
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-5">
                FINANCE
              </td>
              <td className="p-5">
                {financeCount}
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Reports;