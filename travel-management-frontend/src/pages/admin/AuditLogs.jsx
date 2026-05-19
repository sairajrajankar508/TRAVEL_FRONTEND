import {
  useGetAuditLogsQuery,
} from "../../services/adminApi";

const AuditLogs = () => {

  const {

    data: logs = [],

    isLoading,

  } = useGetAuditLogsQuery();

  if (isLoading) {

    return (

      <div className="text-2xl font-bold">
        Loading Audit Logs...
      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Audit Logs
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor all system activities and security events
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL LOGS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-105 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Total Logs
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">
                {logs.length}
              </h2>

            </div>

            
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Recorded system activities
          </p>

        </div>

        {/* SYSTEM STATUS */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-105 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                System Status
              </p>

              <h2 className="text-3xl font-bold mt-3">
                ACTIVE
              </h2>

            </div>

            
          </div>

          <p className="text-sm text-gray-400 mt-4">
            All services operational
          </p>

        </div>

        {/* SECURITY */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-105 transition-all duration-300">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Security Monitoring
              </p>

              <h2 className="text-3xl font-bold mt-3">
                ENABLED
              </h2>

            </div>

          
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Real-time audit tracking
          </p>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold text-slate-800">
            Activity Logs
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-5">
                Action
              </th>

              <th className="text-left p-5">
                Performed By
              </th>

              <th className="text-left p-5">
                Timestamp
              </th>

              <th className="text-left p-5">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {logs.length > 0 ? (

              logs.map((log) => (

                <tr
                  key={log.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-5 font-semibold text-slate-700">
                    {log.action}
                  </td>

                  <td className="p-5">
                    {log.performedBy}
                  </td>

                  <td className="p-5 text-gray-500">
                    {log.timestamp}
                  </td>

                  <td className="p-5">

                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">

                      Success

                    </span>

                  </td>

                </tr>
              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="text-center p-10 text-gray-500"
                >

                  No audit logs found

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AuditLogs;