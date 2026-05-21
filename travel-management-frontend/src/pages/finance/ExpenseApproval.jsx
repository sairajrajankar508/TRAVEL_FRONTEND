import { useEffect, useState } from "react";

import {
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const ExpenseApproval = () => {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // =====================================================
  // FETCH PENDING APPROVALS
  // =====================================================
  useEffect(() => {

    const loadExpenses = async () => {

      try {

        setLoading(true);

        const res = await fetch(
          "http://localhost:8080/finance/pending-approvals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch approvals");
        }

        const data = await res.json();

        setExpenses(
          Array.isArray(data) ? data : []
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

    loadExpenses();

  }, [token]);

  // =====================================================
  // APPROVE
  // =====================================================
  const approveExpense = async (id) => {

    try {

      const res = await fetch(
        `http://localhost:8080/finance/approve/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      alert(
        data?.message || "Approved"
      );

      // REMOVE FROM TABLE
      setExpenses((prev) =>
        prev.filter((exp) => exp.id !== id)
      );

    } catch (err) {

      console.log(err);
    }
  };

  // =====================================================
  // REJECT
  // =====================================================
  const rejectExpense = async (id) => {

    try {

      const res = await fetch(
        `http://localhost:8080/finance/reject/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      alert(
        data?.message || "Rejected"
      );

      // REMOVE FROM TABLE
      setExpenses((prev) =>
        prev.filter((exp) => exp.id !== id)
      );

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-slate-800">

          Expense Approvals

        </h1>

        <p className="text-gray-500">

          Finance review for manager-approved expenses

        </p>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow p-5">

        {loading ? (

          <p>Loading...</p>

        ) : expenses.length === 0 ? (

          <p>No pending approvals</p>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {expenses.map((exp) => (

                <tr
                  key={exp.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {exp.employeeName}
                  </td>

                  <td className="p-3">
                    {exp.title}
                  </td>

                  <td className="p-3 font-semibold">
                    ₹ {exp.amount}
                  </td>

                  <td className="p-3">
                    {exp.category}
                  </td>

                  <td className="p-3 flex gap-2">

                    {/* APPROVE */}
                    <button
                      onClick={() =>
                        approveExpense(exp.id)
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >

                      <FaCheck />

                      Approve

                    </button>

                    {/* REJECT */}
                    <button
                      onClick={() =>
                        rejectExpense(exp.id)
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >

                      <FaTimes />

                      Reject

                    </button>

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

export default ExpenseApproval;