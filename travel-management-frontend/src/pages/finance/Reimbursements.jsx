import { useEffect, useState } from "react";

const Reimbursements = () => {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState("");

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:8080/finance/pending-reimbursements"
      );

      const data = await res.json();
      setExpenses(data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

  const loadData = async () => {
    await fetchData();
  };

  loadData();

}, []);

  // ================= APPROVE =================
  const approve = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/finance/reimburse/${id}`,
        { method: "PUT" }
      );

      const data = await res.json();
      alert(data.message);

      fetchData();
      setSelected(null);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= REJECT =================
  const reject = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/finance/reject/${id}`,
        { method: "PUT" }
      );

      const data = await res.json();
      alert(data.message);

      fetchData();
      setSelected(null);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-slate-100">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">
        Reimbursement Requests
      </h1>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-4">

        {loading ? (
          <p>Loading...</p>
        ) : expenses.length === 0 ? (
          <p>No reimbursement requests</p>
        ) : (

          <table className="w-full">

            <thead>
              <tr className="bg-slate-100">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>

              {expenses.map((exp) => (
                <tr key={exp.id} className="border-t">

                  <td className="p-3">
                    {exp.employeeName}
                  </td>

                  <td className="p-3">
                    {exp.title}
                  </td>

                  <td className="p-3 font-semibold">
                    ₹ {exp.amount}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => approve(exp.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Reimburse
                    </button>

                    <button
                      onClick={() => reject(exp.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* MODAL (optional future upgrade) */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="font-bold mb-3">
              Finance Comment
            </h2>

            <textarea
              className="w-full border p-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">

              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 border"
              >
                Cancel
              </button>

              <button
                onClick={() => approve(selected.id)}
                className="px-3 py-1 bg-green-500 text-white"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Reimbursements;