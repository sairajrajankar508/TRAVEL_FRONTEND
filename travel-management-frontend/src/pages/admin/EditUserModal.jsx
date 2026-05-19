import { useState } from "react";

import {

  useUpdateUserMutation,

} from "../../services/adminApi";

const EditUserModal = ({

  user,

  closeModal,

}) => {

  const [updateUser] =
    useUpdateUserMutation();

  const [formData, setFormData] =
    useState({

      name: user.name || "",

      email: user.email || "",

      password: "",

      role: user.role || "EMPLOYEE",

      department:
        user.department || "",
    });

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // UPDATE USER
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      await updateUser({

        id: user.id,

        userData: formData,

      }).unwrap();

      alert(
        "User updated successfully"
      );

      closeModal();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to update user"
      );
    }
  };

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">

      {/* MODAL */}
      <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/80 backdrop-blur-xl animate-fadeIn">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-8 py-6 text-white">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold">
                Edit User
              </h2>

              <p className="text-yellow-100 mt-1">
                Update employee account details
              </p>

            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={
                closeModal
              }
              className="text-white text-3xl hover:text-red-200 transition"
            >
              ×
            </button>

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={
            handleSubmit
          }
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* FULL NAME */}
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
              className="w-full bg-white/70 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-500"
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
              placeholder="Enter email address"
              className="w-full bg-white/70 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-500"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">

              New Password

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
              placeholder="Leave empty to keep old password"
              className="w-full bg-white/70 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-500"
            />

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
              className="w-full bg-white/70 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-500"
            />

          </div>

          {/* ROLE */}
          <div className="md:col-span-2">

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
              className="w-full bg-white/70 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-500"
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

          {/* BUTTONS */}
          <div className="md:col-span-2 flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={
                closeModal
              }
              className="px-6 py-3 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >
              Update User
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditUserModal;