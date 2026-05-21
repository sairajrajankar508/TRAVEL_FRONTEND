import { useEffect, useState } from "react";

const ApprovalHistory = () => {

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH HISTORY =================
  const fetchHistory = async () => {

    try {

      const res = await fetch(
        "http://localhost:8080/manager/history"
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      const data =
        await res.json();

      console.log("HISTORY:", data);

      // SAFE ARRAY
      setHistory(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  // ================= LOAD =================
  useEffect(() => {

    const load = async () => {
      await fetchHistory();
    };

    load();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-slate-800">

          Approval History

        </h1>

        <p className="text-slate-500 mt-1">

          Approved and rejected travel requests

        </p>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        {loading ? (

          <div className="p-10 text-center">

            Loading...

          </div>

        ) : history.length === 0 ? (

          <div className="p-10 text-center text-slate-500">

            No approval history found

          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Employee
                </th>

                <th className="p-4 text-left">
                  Destination
                </th>

                <th className="p-4 text-left">
                  Purpose
                </th>

                <th className="p-4 text-left">
                  Budget
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {history.map((req) => (

                <tr
                  key={req.id}
                  className="border-t hover:bg-slate-50"
                >

                  {/* EMPLOYEE */}
                  <td className="p-4">

                    {req.user?.name}

                  </td>

                  {/* DESTINATION */}
                  <td className="p-4">

                    {req.destination}

                  </td>

                  {/* PURPOSE */}
                  <td className="p-4">

                    {req.purpose}

                  </td>

                  {/* BUDGET */}
                  <td className="p-4">

                    ₹ {req.budget}

                  </td>

                  {/* STATUS */}
                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        req.status ===
                        "MANAGER_APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {req.status}

                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default ApprovalHistory;