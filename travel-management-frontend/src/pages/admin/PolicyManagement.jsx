import { useState } from "react";

import toast from "react-hot-toast";

import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
  FaMoneyBillWave,
  FaPlaneDeparture,
  FaTrash,
} from "react-icons/fa";

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

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= CREATE POLICY =================
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

      toast.success(
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

      toast.error(
        "Failed to create policy"
      );
    }
  };

  // ================= TOGGLE POLICY =================
  const handleToggle = async (
    id,
    active
  ) => {

    try {

      await togglePolicy(
        id
      ).unwrap();

      toast.success(
        active
          ? "Policy disabled"
          : "Policy activated"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update policy"
      );
    }
  };

  // ================= DELETE POLICY =================
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

      toast.success(
        "Policy deleted"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete policy"
      );
    }
  };

  // ================= STATS =================
  const activePolicies =
    policies.filter(
      (p) => p.active
    ).length;

  const disabledPolicies =
    policies.filter(
      (p) => !p.active
    ).length;

  if (isLoading) {

    return (

      <div className="flex items-center justify-center h-[70vh]">

        <h1 className="text-3xl font-bold text-slate-700 animate-pulse">

          Loading Policies...

        </h1>

      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">

              Travel Policy Management

            </h1>

            <p className="text-gray-500 mt-2">

              Configure travel budgets,
              allowed classes and policy controls

            </p>

          </div>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all text-white px-6 py-3 rounded-2xl shadow-lg font-semibold"
          >

            <FaPlus />

            Create Policy

          </button>

        </div>

      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Total Policies

              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-3">

                {policies.length}

              </h1>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 text-3xl">

              <FaFileAlt />

            </div>

          </div>

        </div>

        {/* ACTIVE */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Active Policies

              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-3">

                {activePolicies}

              </h1>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 text-3xl">

              <FaCheckCircle />

            </div>

          </div>

        </div>

        {/* DISABLED */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 hover:shadow-2xl transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 font-medium">

                Disabled Policies

              </p>

              <h1 className="text-4xl font-bold text-slate-800 mt-3">

                {disabledPolicies}

              </h1>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-700 text-3xl">

              <FaTimesCircle />

            </div>

          </div>

        </div>

      </div>

      {/* ================= POLICY TABLE ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        {/* TABLE HEADER */}
        <div className="p-7 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              Travel Policies

            </h2>

            <p className="text-slate-500 mt-1">

              Manage all configured travel policies

            </p>

          </div>

          <div className="bg-slate-100 px-5 py-3 rounded-2xl">

            <p className="text-slate-600 font-semibold">

              {policies.length} Policies Configured

            </p>

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full">

              <thead className="bg-slate-100 border-b border-slate-300">


  <tr>

    <th className="text-center p-5 font-semibold text-slate-700">

      Maximum Budget

    </th>

    <th className="text-center p-5 font-semibold text-slate-700">

      Travel Class

    </th>

    <th className="text-center p-5 font-semibold text-slate-700">

      Status

    </th>

    <th className="text-center p-5 font-semibold text-slate-700">

      Actions

    </th>

  </tr>

</thead>

<tbody>

  {policies.map((policy) => (

    <tr
      key={policy.id}
      className="border-t border-slate-100 hover:bg-slate-50 transition"
    >

      {/* BUDGET */}
      <td className="p-5 text-center">

        <div className="flex items-center justify-center gap-3 text-slate-700 font-bold text-lg">

          <FaMoneyBillWave className="text-green-500" />

          ₹{policy.maxBudget}

        </div>

      </td>

      {/* CLASS */}
      <td className="p-5 text-center">

        <div className="flex justify-center">

          <span className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">

            <FaPlaneDeparture />

            {policy.allowedClass}

          </span>

        </div>

      </td>

      {/* STATUS */}
      <td className="p-5 text-center">

        <button
          onClick={() =>
            handleToggle(
              policy.id,
              policy.active
            )
          }
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            policy.active
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >

          {policy.active
            ? "Active"
            : "Disabled"}

        </button>

      </td>

      {/* ACTIONS */}
      <td className="p-5 text-center">

        <div className="flex justify-center">

          <button
            onClick={() =>
              handleDelete(
                policy.id
              )
            }
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition font-medium"
          >

            <FaTrash />

            Delete

          </button>

        </div>

      </td>

    </tr>
  ))}

</tbody>

          </table>

        </div>

      </div>

      {/* ================= CREATE POLICY MODAL ================= */}
      {showModal && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">

          <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-8 py-6 text-white">

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-3xl font-bold">

                    Create Travel Policy

                  </h2>

                  <p className="text-cyan-100 mt-1">

                    Configure budget and travel class

                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="text-white text-2xl hover:text-red-200 transition"
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
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
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