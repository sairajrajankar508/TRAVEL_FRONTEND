import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",

  // 🔥 AUTO ATTACH TOKEN (IMPORTANT FIX)
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery,

  tagTypes: ["Auth"],

  endpoints: (builder) => ({

    // ================= LOGIN =================
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // ================= OPTIONAL: PROFILE =================
    getProfile: builder.query({
      query: () => "/employee/profile",
      providesTags: ["Auth"],
    }),

    // ================= OPTIONAL: UPDATE PROFILE =================
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/employee/profile/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;