import { useState } from "react";

import {
  useCreateUserMutation,
} from "../../services/adminApi";

const AddUserModal = ({
  closeModal,
}) => {

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

      role: "EMPLOYEE",

      department: "",
    });

  const [createUser] =
    useCreateUserMutation();

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      await createUser(
        formData
      ).unwrap();

      alert(
        "User created successfully"
      );

      closeModal();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create user"
      );
    }
  };

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">

      {/* MODAL */}
      <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/80 backdrop-blur-xl">

        {/* HEADER */}
        <div className="bg-linear-to-r from-cyan-600 to-blue-700 px-8 py-6 text-white">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold">
                Add New User
              </h2>

              <p className="text-cyan-100 mt-1">
                Create and manage employee access
              </p>

            </div>

            <button
              onClick={
                closeModal
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

          {/* NAME + EMAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                required
                placeholder="Enter full name"
                className="w-full bg-white/70 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
                placeholder="Enter email"
                className="w-full bg-white/70 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />

            </div>

          </div>

          {/* PASSWORD + ROLE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Password

              </label>

              <input
                type="password"
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                required
                placeholder="Enter password"
                className="w-full bg-white/70 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />

            </div>

            {/* ROLE */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Role

              </label>

              <select
                name="role"
                value={
                  formData.role
                }
                onChange={
                  handleChange
                }
                className="w-full bg-white/70 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              >

                <option value="EMPLOYEE">
                  EMPLOYEE
                </option>

                <option value="MANAGER">
                  MANAGER
                </option>

                <option value="FINANCE">
                  FINANCE
                </option>

                <option value="ADMIN">
                  ADMIN
                </option>

              </select>

            </div>

          </div>

          {/* DEPARTMENT */}
          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">

              Department

            </label>

            <input
              type="text"
              name="department"
              value={
                formData.department
              }
              onChange={
                handleChange
              }
              required
              placeholder="Enter department"
              className="w-full bg-white/70 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />

          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={
                closeModal
              }
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-linear-to-r from-cyan-600 to-blue-700 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Create User
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddUserModal;