import { useEffect, useState } from "react";

import {
  FaFileAlt,
  FaMoneyBillWave,
  FaPlane,
  FaInfoCircle,
} from "react-icons/fa";

const ManagerPolicies = () => {

  const [policies, setPolicies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  // ================= FETCH POLICIES =================
  useEffect(() => {

    const fetchPolicies = async () => {

      try {

        const res = await fetch(
          "http://localhost:8080/manager/policies",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        setPolicies(
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

    fetchPolicies();

  }, [token]);

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">

          Company Travel Policies

        </h1>

        <p className="text-slate-500 mt-2">

          Read-only policies defined by Admin

        </p>

      </div>

      {/* INFO BANNER */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6 flex items-center gap-3">

        <FaInfoCircle className="text-blue-600" />

        <p className="text-blue-700">

          These policies are mandatory for all travel approvals.

        </p>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="text-center p-10">

          Loading policies...

        </div>

      ) : policies.length === 0 ? (

        <div className="text-center p-10 text-slate-500">

          No policies found

        </div>

      ) : (

        /* POLICY GRID */
        <div className="grid md:grid-cols-2 gap-6">

          {policies.map((p) => (

            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border-l-4 border-cyan-500"
            >

              {/* TITLE */}
              <div className="flex items-center gap-3 mb-3">

                <FaFileAlt className="text-cyan-600" />

                <h2 className="text-xl font-bold">

                  {p.allowedClass ||
                    "Travel Policy"}

                </h2>

              </div>

              {/* DESCRIPTION */}
              <p className="text-slate-600 mb-4">

                Company travel rules and restrictions apply for all employees.

              </p>

              {/* DETAILS */}
              <div className="space-y-2 text-sm">

                {/* BUDGET */}
                <div className="flex items-center gap-2">

                  <FaMoneyBillWave className="text-green-500" />

                  <span>

                    Max Budget: ₹{" "}

                    <b>{p.maxBudget}</b>

                  </span>

                </div>

                {/* CLASS */}
                <div className="flex items-center gap-2">

                  <FaPlane className="text-blue-500" />

                  <span>

                    Allowed Class:{" "}

                    <b>{p.allowedClass}</b>

                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default ManagerPolicies;