import { useState } from "react";

import {

  useGetPoliciesQuery,

  useCreatePolicyMutation,

  useTogglePolicyMutation,

  useDeletePolicyMutation,

} from "../../services/adminApi";

const PolicyManagement = () => {

  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] =
    useState({

      maxBudget: "",

      allowedClass: "ECONOMY",
    });

  const {

    data: policies = [],

    isLoading,

  } = useGetPoliciesQuery();

  const [createPolicy] =
    useCreatePolicyMutation();

  const [togglePolicy] =
    useTogglePolicyMutation();

  const [deletePolicy] =
    useDeletePolicyMutation();

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // CREATE POLICY
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      await createPolicy({
        maxBudget:
          Number(
            formData.maxBudget
          ),

        allowedClass:
          formData.allowedClass,
      }).unwrap();

      alert(
        "Policy created successfully"
      );

      setShowModal(false);

      setFormData({

        maxBudget: "",

        allowedClass:
          "ECONOMY",
      });

    } catch (error) {

      console.log(error);
    }
  };

  // TOGGLE POLICY
  const handleToggle = async (
    id
  ) => {

    try {

      await togglePolicy(
        id
      ).unwrap();

    } catch (error) {

      console.log(error);
    }
  };

  // DELETE POLICY
  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this policy?"
      );

    if (!confirmDelete) return;

    try {

      await deletePolicy(
        id
      ).unwrap();

    } catch (error) {

      console.log(error);
    }
  };

  if (isLoading) {

    return (

      <h1 className="text-2xl font-bold">
        Loading...
      </h1>
    );
  }

  return (

    <div className="space-y-6">

      {/* HEADER CARD */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          {/* LEFT */}
          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Travel Policy Management
            </h1>

            <p className="text-gray-500 mt-2">
              Configure travel rules, budgets and employee policies
            </p>

          </div>

          {/* RIGHT BUTTON */}
          <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all text-white px-6 py-3 rounded-2xl shadow-lg font-semibold"
        >
          + Create Policy
        </button>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-105 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Total Policies
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">
                {policies.length}
              </h2>

            </div>

            

          </div>

        </div>

        {/* ACTIVE */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-105 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Active Policies
              </p>

              <h2 className="text-4xl font-bold mt-3">

                {
                  policies.filter(
                    (p) =>
                      p.active
                  ).length
                }

              </h2>

            </div>

            
          </div>

        </div>

        {/* DISABLED */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-105 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 font-medium">
                Disabled Policies
              </p>

              <h2 className="text-4xl font-bold mt-3">

                {
                  policies.filter(
                    (p) =>
                      !p.active
                  ).length
                }

              </h2>

            </div>

            

          </div>

        </div>

      </div>

      {/* POLICY TABLE */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold text-slate-800">
            Travel Policies
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-5">
                Budget
              </th>

              <th className="text-left p-5">
                Travel Class
              </th>

              <th className="text-left p-5">
                Status
              </th>

              <th className="text-left p-5">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {policies.map(
              (policy) => (

                <tr
                  key={
                    policy.id
                  }
                  className="border-t hover:bg-slate-50 transition"
                >

                  {/* BUDGET */}
                  <td className="p-5 font-semibold text-slate-700">
                    ₹
                    {
                      policy.maxBudget
                    }
                  </td>

                  {/* CLASS */}
                  <td className="p-5">

                    <span className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-medium">

                      {
                        policy.allowedClass
                      }

                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="p-5">

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        policy.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {policy.active
                        ? "Active"
                        : "Disabled"}

                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="p-5 flex gap-3">

                    <button
                      onClick={() =>
                        handleToggle(
                          policy.id
                        )
                      }
                      className={`px-4 py-2 rounded-xl text-white font-medium transition ${
                        policy.active
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >

                      {policy.active
                        ? "Disable"
                        : "Enable"}

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          policy.id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* CREATE POLICY MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">

          {/* MODAL */}
          <div className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/80 backdrop-blur-xl">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-8 py-6 text-white">

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-3xl font-bold">
                    Create Travel Policy
                  </h2>

                  <p className="text-cyan-100 mt-1">
                    Configure travel limits and rules
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="text-white text-2xl hover:text-red-200"
                >
                  ✕
                </button>

              </div>

            </div>

            {/* FORM */}
            <form
              onSubmit={
                handleSubmit
              }
              className="p-8 space-y-6"
            >

              {/* BUDGET */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">

                  Maximum Budget

                </label>

                <input
                  type="number"
                  name="maxBudget"
                  value={
                    formData.maxBudget
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Enter maximum budget"
                  className="w-full bg-white/70 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                />

              </div>

              {/* CLASS */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">

                  Allowed Travel Class

                </label>

                <select
                  name="allowedClass"
                  value={
                    formData.allowedClass
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full bg-white/70 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                >

                  <option value="ECONOMY">
                    ECONOMY
                  </option>

                  <option value="BUSINESS">
                    BUSINESS
                  </option>

                  <option value="FIRST_CLASS">
                    FIRST CLASS
                  </option>

                </select>

              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-4 pt-4">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  Create Policy
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default PolicyManagement;