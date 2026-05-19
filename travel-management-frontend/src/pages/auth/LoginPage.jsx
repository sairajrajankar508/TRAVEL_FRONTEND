import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../services/authApi";

const LoginPage = () => {

  const navigate = useNavigate();

  const [login] =
    useLoginMutation();

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE LOGIN
  const handleLogin = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        await login(
          formData
        ).unwrap();

      // SAVE DATA
      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "role",
        response.role
      );

      localStorage.setItem(
        "email",
        response.email
      );

      localStorage.setItem(
        "name",
        response.name
      );

      // REDIRECT
      if (
        response.role ===
        "ADMIN"
      ) {

        navigate(
          "/admin/dashboard"
        );

      } else if (
        response.role ===
        "EMPLOYEE"
      ) {

        navigate(
          "/employee/dashboard"
        );

      } else if (
        response.role ===
        "MANAGER"
      ) {

        navigate(
          "/manager/dashboard"
        );

      } else if (
        response.role ===
        "FINANCE"
      ) {

        navigate(
          "/finance/dashboard"
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        "Invalid email or password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-40 py-20">

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-12">

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-800">

            Travel Management System

          </h1>

          <p className="text-gray-500 mt-2">

            Welcome back! Please login to your account.

          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">

              Email

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
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">

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
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default LoginPage;