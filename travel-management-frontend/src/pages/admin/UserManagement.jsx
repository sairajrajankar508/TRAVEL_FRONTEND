import { useState } from "react";

import toast from "react-hot-toast";

import {

  useGetAllUsersQuery,

  useDeleteUserMutation,

} from "../../services/adminApi";

import AddUserModal from "./AddUserModal";

import EditUserModal from "./EditUserModal";

const UserManagement = () => {

  const [showModal, setShowModal] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const {

    data: users = [],

    isLoading,

  } = useGetAllUsersQuery();

  const [deleteUser] =
    useDeleteUserMutation();

  // DELETE USER
  const handleDelete = async (id) => {

    try {

      await deleteUser(id).unwrap();

      toast.success(
        "User deleted successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete user"
      );
    }
  };

  // STATS
  const activeUsers =
    users.filter(
      (u) => u.active
    ).length;

  const disabledUsers =
    users.filter(
      (u) => !u.active
    ).length;

  const admins =
    users.filter(
      (u) => u.role === "ADMIN"
    ).length;

  if (isLoading) {

    return (

      <div className="flex items-center justify-center h-[70vh]">

        <h1 className="text-3xl font-bold text-slate-700 animate-pulse">
          Loading Users...
        </h1>

      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            User Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage employees, managers,
            finance and admin accounts
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition-all text-white px-6 py-3 rounded-2xl shadow-lg font-semibold"
        >
          + Add User
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 ">

        {/* TOTAL */}
        <div className="bg-white rounded-2xl shadow-md p-5 hover:scale-105 transition">
          
          <h2 className="text-gray-500 font-medium">
            Total Users
          </h2>

          <h1 className="text-4xl font-bold text-slate-800 mt-2">
            {users.length}
          </h1>

        </div>

        {/* ACTIVE */}
        <div className="bg-white rounded-2xl shadow-md p-5 hover:scale-105 transition">

          <h2 className="text-gray-500 font-medium">
            Active Users
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            {activeUsers}
          </h1>

        </div>

        {/* DISABLED */}
        <div className="bg-white rounded-2xl shadow-md p-5 hover:scale-105 transition">

          <h2 className="text-gray-500 font-medium">
            Disabled Users
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            {disabledUsers}
          </h1>

        </div>

        {/* ADMINS */}
        <div className="bg-white rounded-2xl shadow-md p-5 hover:scale-105 transition">

          <h2 className="text-gray-500 font-medium">
            Admin Accounts
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            {admins}
          </h1>

        </div>

      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-3xl shadow-lg  border-slate-200">

        {/* TABLE HEADER */}
        <div className="p-6 border-b flex justify-between items-center">

          <div>

            <h2 className="text-xl font-semibold text-slate-700">
              System Users
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              All registered platform users
            </p>

          </div>

        </div>

        {/* TABLE */}
        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-5">
                User
              </th>

              <th className="text-left p-5">
                Email
              </th>

              <th className="text-left p-5">
                Role
              </th>

              <th className="text-left p-5">
                Department
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

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t hover:bg-slate-50 transition"
              >

                {/* USER */}
                <td className="p-5">

                  <div className="flex items-center gap-3">

                    

                    <div>

                      <h3 className="font-semibold text-slate-700">
                        {user.name}
                      </h3>

                      <p className="text-sm text-gray-400">
                        User ID: {user.id}
                      </p>

                    </div>

                  </div>

                </td>

                {/* EMAIL */}
                <td className="p-5 text-slate-600">
                  {user.email}
                </td>

                {/* ROLE */}
                <td className="p-5">

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      user.role ===
                      "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : user.role ===
                          "MANAGER"
                        ? "bg-yellow-100 text-yellow-700"
                        : user.role ===
                          "FINANCE"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >

                    {user.role}

                  </span>

                </td>

                {/* DEPARTMENT */}
                <td className="p-5 text-slate-700 font-medium">
                  {user.department}
                </td>

                {/* STATUS */}
                <td className="p-5">

                  {user.active ? (

                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
                      Disabled
                    </span>

                  )}

                </td>

                {/* ACTIONS */}
                <td className="p-5">

                  {user.email !==
                    "admin@test.com" && (

                    <div className="flex gap-3">

                      {/* EDIT */}
                      <button
                        onClick={() => {

                          setSelectedUser(
                            user
                          );

                          setShowEditModal(
                            true
                          );
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition font-medium"
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => {

                          const confirmDelete =
                            window.confirm(
                              "Are you sure you want to permanently delete this user?"
                            );

                          if (
                            confirmDelete
                          ) {

                            handleDelete(
                              user.id
                            );
                          }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition font-medium"
                      >
                        Delete
                      </button>

                    </div>

                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* ADD USER MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative border border-slate-200">

            {/* CLOSE */}
            <button
              onClick={() =>
                setShowModal(false)
              }
              className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-red-500 transition"
            >
              ✕
            </button>

            {/* TITLE */}
            <div className="mb-6">

              <h2 className="text-3xl font-bold text-slate-800">
                Create New User
              </h2>

              <p className="text-gray-500 mt-2">
                Add new users to the
                travel management system
              </p>

            </div>

            {/* FORM */}
            <AddUserModal
              closeModal={() =>
                setShowModal(false)
              }
            />

          </div>

        </div>

      )}

      {/* EDIT USER MODAL */}
      {showEditModal &&
        selectedUser && (

          <EditUserModal

            user={selectedUser}

            closeModal={() => {

              setShowEditModal(
                false
              );

              setSelectedUser(
                null
              );
            }}
          />
        )}

    </div>
  );
};

export default UserManagement;