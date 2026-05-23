import { useEffect, useState } from "react";

import {
  FaPlus,
  FaEye,
  FaTrash,
  FaUpload,
  FaSpinner,
  FaMoneyBillWave,
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
  const [requests, setRequests] = useState([]);

  const [openForm, setOpenForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState(emptyForm);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // ================= HANDLE FILE =================
  const handleFileChange = (e) => {

    setForm({
      ...form,
      file: e.target.files[0],
    });
  };

  // ================= FETCH EXPENSES =================
  const fetchExpenses = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "http://localhost:8080/employee/expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setExpenses(Array.isArray(data) ? data : []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  // ================= LOAD DATA =================
  useEffect(() => {

    const loadData = async () => {

      try {

        const [expenseRes, requestRes] = await Promise.all([
          fetch("http://localhost:8080/employee/expenses", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch("http://localhost:8080/employee/requests", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const expenseData = await expenseRes.json();

        const requestData = await requestRes.json();

        setExpenses(
          Array.isArray(expenseData)
            ? expenseData
            : []
        );

        setRequests(
          Array.isArray(requestData)
            ? requestData
            : []
        );

      } catch (err) {

        console.log(err);
      }
    };

    loadData();

  }, [token]);

  // ================= SUBMIT EXPENSE =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSubmitting(true);

      const formData = new FormData();

      formData.append("title", form.title);

      formData.append("amount", form.amount);

      formData.append("category", form.category);

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "expenseDate",
        form.expenseDate
      );

      formData.append(
        "travelRequestId",
        form.travelRequestId
      );

      if (form.file) {

        formData.append(
          "file",
          form.file
        );
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

      setOpenForm(false);

      setForm(emptyForm);

      fetchExpenses();

    } catch (err) {

      console.log(err);

      alert(
        err.message ||
          "Expense submission failed"
      );

    } finally {

      setSubmitting(false);
    }
  };

  // ================= DELETE =================
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

    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 p-5 flex flex-col gap-5">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* LEFT */}
          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-cyan-100 flex items-center justify-center text-cyan-700 text-4xl">

              <FaMoneyBillWave />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-slate-800">

                Expense Management

              </h1>

              <p className="text-slate-500 mt-2 text-lg">

                Manage travel expenses and receipts

              </p>

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={() => setOpenForm(true)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all duration-300 text-white px-7 py-4 rounded-2xl shadow-lg font-semibold flex items-center gap-3"
          >

            <FaPlus />

            Create Expense

          </button>

        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 flex-1 flex flex-col overflow-hidden">

        {/* TOP */}
        <div className="px-8 py-5 border-b border-slate-200 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              All Expenses

            </h2>

            <p className="text-slate-500 mt-1">

              Track all submitted expenses

            </p>

          </div>

          <div className="hidden md:flex items-center gap-3 bg-cyan-50 px-5 py-3 rounded-2xl">

            <FaMoneyBillWave className="text-cyan-700" />

            <span className="font-semibold text-cyan-700">

              {expenses.length} Expenses

            </span>

          </div>

        </div>

        {/* TABLE */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">

          <table className="w-full table-fixed">

            <thead className="bg-slate-100 sticky top-0 z-10">

              <tr>

                <th className="p-5 text-center font-bold text-slate-700">
                  Title
                </th>

                <th className="p-5 text-center font-bold text-slate-700">
                  Amount
                </th>

                <th className="p-5 text-center font-bold text-slate-700">
                  Category
                </th>

                <th className="p-5 text-center font-bold text-slate-700">
                  Date
                </th>

                <th className="p-5 text-center font-bold text-slate-700">
                  Status
                </th>

                <th className="p-5 text-center font-bold text-slate-700">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td colSpan="6">

                    <div className="flex justify-center py-20">

                      <FaSpinner className="animate-spin text-5xl text-cyan-600" />

                    </div>

                  </td>

                </tr>

              ) : expenses.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-20"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl">

                        <FaMoneyBillWave />

                      </div>

                      <h3 className="text-2xl font-bold text-slate-700 mt-6">

                        No Expenses Found

                      </h3>

                      <p className="text-slate-500 mt-2">

                        Create your first expense
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                expenses.map((expense) => (

                  <tr
                    key={expense.id}
                    className="hover:bg-slate-50 transition-all duration-200"
                  >

                    {/* TITLE */}
                    <td className="p-5 text-center font-semibold text-slate-700 break-words">

                      {expense.title}

                    </td>

                    {/* AMOUNT */}
                    <td className="p-5 text-center font-bold text-slate-800">

                      ₹ {expense.amount}

                    </td>

                    {/* CATEGORY */}
                    <td className="p-5 text-center text-slate-700">

                      {expense.category || "N/A"}

                    </td>

                    {/* DATE */}
                    <td className="p-5 text-center text-slate-600">

                      {expense.expenseDate}

                    </td>

                    {/* STATUS */}
                    <td className="p-5 text-center">

                      <span
                        className={`px-4 py-2 rounded-full text-white text-sm font-semibold shadow-sm
                        ${
                          expense.status === "REIMBURSED"
                            ? "bg-green-500"
                            : expense.status === "REJECTED"
                            ? "bg-red-500"
                            : "bg-amber-500"
                        }`}
                      >

                        {expense.status || "N/A"}

                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td className="p-5">

                      <div className="flex justify-center items-center gap-3">

                        {/* VIEW */}
                        <a
                          href={`http://localhost:8080/file_uploads/${expense.receiptUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center transition"
                        >

                          <FaEye />

                        </a>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            deleteExpense(
                              expense.id
                            )
                          }
                          className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition"
                        >

                          <FaTrash />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= MODAL ================= */}
      {openForm && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-5 z-50">

          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
          >

            {/* HEADER */}
            <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-slate-800">

                  Create Expense

                </h2>

                <p className="text-slate-500 mt-1">

                  Fill all expense details
                </p>

              </div>

              <button
                type="button"
                onClick={() => {

                  setOpenForm(false);

                  setForm(emptyForm);
                }}
                className="text-slate-500 hover:text-red-500 text-3xl"
              >

                ×

              </button>

            </div>

            {/* FORM */}
            <div className="overflow-y-auto p-8 flex-1">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* TITLE */}
                <div>

                  <label className="block text-sm font-semibold mb-2">

                    Title

                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Expense title"
                    required
                  />

                </div>

                {/* AMOUNT */}
                <div>

                  <label className="block text-sm font-semibold mb-2">

                    Amount

                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Expense amount"
                    required
                  />

                </div>

                {/* CATEGORY */}
                <div>

                  <label className="block text-sm font-semibold mb-2">

                    Category

                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
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

                {/* DATE */}
                <div>

                  <label className="block text-sm font-semibold mb-2">

                    Expense Date

                  </label>

                  <input
                    type="date"
                    name="expenseDate"
                    value={form.expenseDate}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />

                </div>

                {/* REQUEST */}
                <div>

                  <label className="block text-sm font-semibold mb-2">

                    Travel Request

                  </label>

                  <select
                    name="travelRequestId"
                    value={form.travelRequestId}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  >

                    <option value="">
                      Select Travel Request
                    </option>

                    {requests.map((r) => (

                      <option
                        key={r.id}
                        value={r.id}
                      >

                        {r.destination} (
                        {r.status})

                      </option>

                    ))}

                  </select>

                </div>

                {/* FILE */}
                <div>

                  <label className="block text-sm font-semibold mb-2">

                    Upload Receipt

                  </label>

                  <label className="w-full border border-dashed border-slate-300 p-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition">

                    <FaUpload />

                    <span className="truncate">

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

              {/* DESCRIPTION */}
              <div className="mt-5">

                <label className="block text-sm font-semibold mb-2">

                  Description

                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Expense description"
                  required
                />

              </div>

            </div>

            {/* FOOTER */}
            <div className="border-t border-slate-200 px-8 py-5 flex justify-end gap-4 bg-white">

              <button
                type="button"
                onClick={() => {

                  setOpenForm(false);

                  setForm(emptyForm);
                }}
                className="border border-slate-300 px-6 py-3 rounded-xl hover:bg-slate-100 transition font-semibold"
              >

                Cancel

              </button>

              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all text-white px-7 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-3"
              >

                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Submit Expense
                  </>
                )}

              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
};

export default ExpenseManagement;