import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  email: localStorage.getItem("email") || null, // 🔥 NEW (useful for profile/dashboard)
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    // ================= LOGIN SUCCESS =================
    setCredentials: (state, action) => {

      const { token, role, email } = action.payload;

      state.token = token;
      state.role = role;
      state.email = email || null;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (role) {
        localStorage.setItem("role", role);
      }

      if (email) {
        localStorage.setItem("email", email);
      }
    },

    // ================= LOGOUT =================
    logout: (state) => {

      state.token = null;
      state.role = null;
      state.email = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
    },

    // ================= RESTORE SESSION =================
    restoreSession: (state) => {

      state.token = localStorage.getItem("token");
      state.role = localStorage.getItem("role");
      state.email = localStorage.getItem("email");
    },
  },
});

export const {
  setCredentials,
  logout,
  restoreSession
} = authSlice.actions;

export default authSlice.reducer;