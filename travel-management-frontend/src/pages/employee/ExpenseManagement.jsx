import { useEffect, useState, useCallback } from "react";

import {
  FaMoneyBillWave,
  FaPlus,
  FaTrash,
  
} from "react-icons/fa";

const ExpenseManagement = () => {

  const token = localStorage.getItem("token");

  const emptyForm = {
    title: "",
    category: "",
    amount: "",
    expenseDate: "",
    description: "",
  };

  const [expenses, setExpenses] = useState([]);

  const [openForm, setOpenForm] = useState(false);

  const [form, setForm] = useState(emptyForm);

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // FETCH EXPENSES
  const fetchExpenses = useCallback(async () => {

    try {

      const res = await fetch(
        "http://localhost:8080/employee/expenses",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      setExpenses(
        Array.isArray(data)
          ? data
          : data.data || []
      );

    } catch (err) {

      console.log(err);

      setExpenses([]);

    }

  }, [token]);

  // LOAD DATA
  useEffect(() => {

    const timer = setTimeout(() => {

      fetchExpenses();

    }, 0);

    return () => clearTimeout(timer);

  }, [fetchExpenses]);

  // CREATE EXPENSE
  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {
      title: form.title,
      category: form.category,
      amount: Number(form.amount),
      expenseDate: form.expenseDate,
      description: form.description,
    };

    try {

      const res = await fetch(
        "http://localhost:8080/employee/expense/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {

        throw new Error();

      }

      alert("Expense added successfully");

      setForm(emptyForm);

      setOpenForm(false);

      fetchExpenses();

    } catch (err) {

      console.log(err);

      alert("Failed to add expense");

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
        `http://localhost:8080/employee/expense/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {

        throw new Error();

      }

      alert("Expense deleted");

      fetchExpenses();

    } catch (err) {

      console.log(err);

      alert("Delete failed");

    }

  };

  // TOTAL EXPENSE
  const totalExpense = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

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

              Manage your travel expenses

            </p>

          </div>

        </div>

        <button
          onClick={() => {

            setForm(emptyForm);

            setOpenForm(true);

          }}
          className="bg-cyan-600 hover:bg-cyan-700 transition text-white px-6 py-3 rounded-2xl flex items-center gap-3 font-semibold"
        >

          <FaPlus />

          Add Expense

        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-5 mt-5">

        <div className="bg-white rounded-3xl shadow border border-slate-200 p-5">

          <p className="text-slate-500 font-medium">

            Total Expenses

          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">

            {expenses.length}

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow border border-slate-200 p-5">

          <p className="text-slate-500 font-medium">

            Total Amount

          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">

            ₹ {totalExpense}

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow border border-slate-200 p-5">

          <p className="text-slate-500 font-medium">

            Categories

          </p>

          <h2 className="text-3xl font-bold text-cyan-600 mt-2">

            {
              [...new Set(expenses.map((e) => e.category))]
                .length
            }

          </h2>

        </div>

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

                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Category</th>

                <th className="p-4 text-left">Amount</th>

                <th className="p-4 text-left">Date</th>

                <th className="p-4 text-left">Description</th>

                <th className="p-4 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {expenses.map((expense) => (

                <tr
                  key={expense.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4 font-medium">

                    {expense.title}

                  </td>

                  <td className="p-4">

                    {expense.category}

                  </td>

                  <td className="p-4 font-semibold text-red-500">

                    ₹ {expense.amount}

                  </td>

                  <td className="p-4">

                    {expense.expenseDate}

                  </td>

                  <td className="p-4">

                    {expense.description}

                  </td>

                  <td className="p-4">

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
      {openForm && (

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

                    Expense Title

                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter expense title"
                    className="w-full border border-slate-300 p-3 rounded-xl"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2">

                    Category

                  </label>

                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Food / Hotel / Transport"
                    className="w-full border border-slate-300 p-3 rounded-xl"
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
                    placeholder="Enter amount"
                    className="w-full border border-slate-300 p-3 rounded-xl"
                  />

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
                  />

                </div>

              </div>

              <div className="mt-5">

                <label className="block text-sm font-semibold mb-2">

                  Description

                </label>

                <textarea
                  name="description"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter expense description"
                  className="w-full border border-slate-300 p-3 rounded-xl"
                />

              </div>

            </div>

            {/* FOOTER */}
            <div className="border-t border-slate-200 p-5 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => {

                  setOpenForm(false);

                  setForm(emptyForm);

                }}
                className="border border-slate-300 px-5 py-3 rounded-xl hover:bg-slate-100"
              >

                Cancel

              </button>

              <button
                type="submit"
                disabled={
                  !form.title ||
                  !form.category ||
                  !form.amount ||
                  !form.expenseDate ||
                  !form.description
                }
                className={`px-6 py-3 rounded-xl font-semibold
                ${
                  !form.title ||
                  !form.category ||
                  !form.amount ||
                  !form.expenseDate ||
                  !form.description
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-cyan-600 hover:bg-cyan-700 text-white"
                }`}
              >

                Add Expense

              </button>

            </div>

          </form>

        </div>

      )}

    </div>

  );

};

export default ExpenseManagement;