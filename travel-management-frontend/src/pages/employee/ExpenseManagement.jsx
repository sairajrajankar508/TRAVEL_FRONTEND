  import { useEffect, useState } from "react";

  import {
    FaPlus,
    FaMoneyBillWave,
    FaUpload,
    FaEye,
    FaTrash,
  } from "react-icons/fa";

  const ExpenseManagement = () => {

    const token = localStorage.getItem("token");

    const emptyForm = {

      title: "",

      amount: "",

      category: "",

      description: "",

      expenseDate: "",

      travelRequestId: "",

      file: null,
    };

    const [expenses, setExpenses] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const [form, setForm] = useState(emptyForm);

    const [requests, setRequests] = useState([]);

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {

      const { name, value } = e.target;

      setForm({

        ...form,

        [name]: value,
      });
    };

    // HANDLE FILE CHANGE
    const handleFileChange = (e) => {

      setForm({

        ...form,

        file: e.target.files[0],
      });
    };

    // FETCH EXPENSES
    const fetchExpenses = async () => {
  try {
    const res = await fetch(
      "http://localhost:8080/employee/expenses",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    setExpenses(Array.isArray(data) ? data : []);
  } catch (err) {
    console.log(err);
  }
};



    // LOAD DATA
useEffect(() => {
  const loadData = async () => {
    try {
      const expRes = await fetch(
        "http://localhost:8080/employee/expenses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const reqRes = await fetch(
        "http://localhost:8080/employee/requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const expData = await expRes.json();
      const reqData = await reqRes.json();

      setExpenses(Array.isArray(expData) ? expData : []);
      setRequests(Array.isArray(reqData) ? reqData : []);
    } catch (err) {
      console.log(err);
    }
  };

  loadData();
}, [token]);

    
    // SUBMIT EXPENSE
    const handleSubmit = async (e) => {

      e.preventDefault();

      try {

        const formData = new FormData();

        formData.append("title", form.title);

        formData.append("amount", form.amount);

        formData.append("category", form.category);

        formData.append("description", form.description);

        formData.append("expenseDate", form.expenseDate);

        formData.append(
          "travelRequestId",
          form.travelRequestId
        );

        if (form.file) {

          formData.append("file", form.file);
        }

        const res = await fetch(
          "http://localhost:8080/employee/expense/add",
          {

            method: "POST",

            headers: {

              Authorization: `Bearer ${token}`,
            },

            body: formData,
          }
        );

        const msg = await res.text();

        if (!res.ok) {

          throw new Error(msg);
        }

        alert("Expense submitted successfully");

        setOpenModal(false);

        setForm(emptyForm);

        fetchExpenses();

      } catch (err) {

        console.log(err);

        alert("Expense submission failed");
      }
    };

    // DELETE EXPENSE
    const deleteExpense = async (id) => {

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this expense?"
      );

      if (!confirmDelete) return;

      try {

        const res = await fetch(
          `http://localhost:8080/employee/expense/${id}`,
          {

            method: "DELETE",

            headers: {

              Authorization: `Bearer ${token}`,
            },
          }
        );

        const msg = await res.text();

        if (!res.ok) {

          throw new Error(msg);
        }

        alert("Expense deleted successfully");

        fetchExpenses();

      } catch (err) {

        console.log(err);

        alert("Delete failed");
      }
    };

    return (

      <div className="h-screen overflow-hidden bg-slate-100 p-5 flex flex-col">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center">

              <FaMoneyBillWave className="text-2xl text-cyan-700" />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-800">

                Expense Management

              </h1>

              <p className="text-slate-500 mt-1">

                Manage your travel expenses and reimbursements

              </p>

            </div>

          </div>

          <button
            onClick={() => {

              setForm(emptyForm);

              setOpenModal(true);
            }}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold shadow-lg transition-all duration-300"
          >

            <FaPlus />

            Add Expense

          </button>

        </div>

        {/* TABLE */}
        <div className="bg-white mt-5 rounded-3xl shadow-lg border border-slate-200 overflow-hidden flex-1 flex flex-col">

          <div className="px-8 py-5 border-b border-slate-200">

            <h2 className="text-2xl font-bold text-slate-800">

              All Expenses

            </h2>

          </div>

          <div className="overflow-auto flex-1">

            <table className="w-full">

              <thead className="bg-slate-100 sticky top-0">

                <tr>

                  <th className="p-4 text-left">
                    Title
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {expenses.map((expense) => (

                  <tr
                    key={expense.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">

                      {expense.title}

                    </td>

                    <td className="p-4 font-semibold">

                      ₹ {expense.amount}

                    </td>

                    <td className="p-4">

                      {expense.category}

                    </td>

                    <td className="p-4">

                      {expense.expenseDate}

                    </td>

                    <td className="p-4">

                      <span
                        className={`px-4 py-2 rounded-full text-white text-sm
                        ${
                          expense.status === "APPROVED"
                            ? "bg-green-500"
                            : expense.status === "REJECTED"
                            ? "bg-red-500"
                            : "bg-amber-500"
                        }`}
                      >

                        {expense.status}

                      </span>

                    </td>

                    <td className="p-4 flex gap-2">

                      {/* VIEW RECEIPT */}
                      <a
                        href={`http://localhost:8080/file_uploads/${expense.receiptUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center"
                      >

                        <FaEye />

                      </a>
  

                      {/* DELETE */}
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                      >

                        <FaTrash />

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* ADD EXPENSE MODAL */}
        {openModal && (

          <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-5 z-50">

            <form
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]"
            >

              {/* HEADER */}
              <div className="p-8 border-b border-slate-200">

                <h2 className="text-3xl font-bold text-slate-800">

                  Add Expense

                </h2>

              </div>

              {/* FORM */}
              <div className="overflow-y-auto p-8 flex-1">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-sm font-semibold mb-2">

                      Title

                    </label>

                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full border border-slate-300 p-3 rounded-xl"
                      placeholder="Expense title"
                      required
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">

                      Amount

                    </label>

                    <input
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      className="w-full border border-slate-300 p-3 rounded-xl"
                      placeholder="Expense amount"
                      required
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">

                      Category

                    </label>

                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full border border-slate-300 p-3 rounded-xl"
                      required
                    >

                      <option value="">
                        Select Category
                      </option>

                      <option value="FOOD">
                        FOOD
                      </option>

                      <option value="STAY">
                        STAY
                      </option>

                      <option value="TRANSPORT">
                        TRANSPORT
                      </option>

                      <option value="MISCELLANEOUS">
                        MISCELLANEOUS
                      </option>

                    </select>

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">

                      Expense Date

                    </label>

                    <input
                      type="date"
                      name="expenseDate"
                      value={form.expenseDate}
                      onChange={handleChange}
                      className="w-full border border-slate-300 p-3 rounded-xl"
                      required
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">

                      Travel Request ID

                    </label>

                    <select
  name="travelRequestId"
  value={form.travelRequestId}
  onChange={handleChange}
  className="w-full border border-slate-300 p-3 rounded-xl"
  required
>

  <option value="">Select Travel Request</option>

  {requests.map((r) => (
    <option key={r.id} value={r.id}>
      {r.destination} ({r.status})
    </option>
  ))}

</select>

                  </div>

                  <div>

                    <label className="block text-sm font-semibold mb-2">

                      Upload Receipt

                    </label>

                    <label className="w-full border border-dashed border-slate-300 p-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-50">

                      <FaUpload />

                      <span>

                        {form.file
                          ? form.file.name
                          : "Choose receipt file"}

                      </span>

                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                    </label>

                  </div>

                </div>

                <div className="mt-5">

                  <label className="block text-sm font-semibold mb-2">

                    Description

                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-slate-300 p-3 rounded-xl"
                    placeholder="Expense description"
                    required
                  />

                </div>

              </div>

              {/* FOOTER */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 px-8 py-5 flex justify-end gap-3 rounded-b-3xl">

                <button
                  type="button"
                  onClick={() => {

                    setOpenModal(false);

                    setForm(emptyForm);
                  }}
                  className="border border-slate-300 px-5 py-3 rounded-xl hover:bg-slate-100 transition"
                >

                  Cancel

                </button>

                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >

                  Submit Expense

                </button>

              </div>

            </form>

          </div>

        )}

      </div>
    );
  };

  export default ExpenseManagement;