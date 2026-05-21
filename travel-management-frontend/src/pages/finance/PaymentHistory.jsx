import { useEffect, useState } from "react";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

const PaymentHistory = () => {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // =====================================================
  // FETCH PAYMENT HISTORY
  // =====================================================
  useEffect(() => {

    const fetchHistory = async () => {

      try {

        setLoading(true);

        const res = await fetch(
          "http://localhost:8080/finance/payment-history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await res.json();

        setPayments(
          Array.isArray(data) ? data : []
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

    fetchHistory();

  }, [token]);

  // =====================================================
  // STATUS BADGE
  // =====================================================
  const getStatusBadge = (status) => {

    switch (status) {

      case "REIMBURSED":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            <FaMoneyBillWave />
            Reimbursed
          </span>
        );

      case "FINANCE_APPROVED":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            <FaCheckCircle />
            Approved
          </span>
        );

      case "REJECTED":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
            <FaTimesCircle />
            Rejected
          </span>
        );

      default:
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
            <FaClock />
            Pending
          </span>
        );
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-slate-800">

          Payment History

        </h1>

        <p className="text-gray-500 mt-1">

          View all finance processed expenses

        </p>

      </div>

      {/* ===================================================== */}
      {/* TABLE */}
      {/* ===================================================== */}

      <div className="bg-white rounded-2xl shadow p-5 overflow-x-auto">

        {loading ? (

          <p className="text-gray-500">
            Loading payment history...
          </p>

        ) : payments.length === 0 ? (

          <p className="text-gray-500">
            No payment history found
          </p>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-3 text-left">
                  Employee
                </th>

                <th className="p-3 text-left">
                  Expense
                </th>

                <th className="p-3 text-left">
                  Amount
                </th>

                <th className="p-3 text-left">
                  Category
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Action Date
                </th>

                <th className="p-3 text-left">
                  Finance Comment
                </th>

              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-3 font-medium">

                    {payment.employeeName}

                  </td>

                  <td className="p-3">

                    {payment.title}

                  </td>

                  <td className="p-3 font-semibold text-slate-700">

                    ₹ {payment.amount}

                  </td>

                  <td className="p-3">

                    {payment.category}

                  </td>

                  <td className="p-3">

                    {getStatusBadge(payment.status)}

                  </td>

                  <td className="p-3 text-gray-600">

                    {payment.actionDate
                      ? new Date(payment.actionDate)
                          .toLocaleString()
                      : "-"}

                  </td>

                  <td className="p-3 text-gray-600">

                    {payment.financeComment || "-"}

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

export default PaymentHistory;