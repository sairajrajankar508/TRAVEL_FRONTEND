// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const adminApi = createApi({
//   reducerPath: "adminApi",
//   tagTypes: ["Users", "Policy", "Department"],

//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080",
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//       return headers;
//     },
//   }),

//   endpoints: (builder) => ({

//     // USERS
//     getAllUsers: builder.query({
//       query: () => "/admin/users",
//       providesTags: ["Users"],
//     }),

//     createUser: builder.mutation({
//       query: (data) => ({
//         url: "/admin/create-user",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Users"],
//     }),

//     updateUser: builder.mutation({
//       query: ({ id, data }) => ({
//         url: `/admin/users/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: ["Users"],
//     }),

//     deleteUser: builder.mutation({
//       query: (id) => ({
//         url: `/admin/users/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Users"],
//     }),

//     toggleUserStatus: builder.mutation({
//   query: (id) => ({
//     url: `/admin/users/${id}/toggle-status`,
//     method: "PUT",
//   }),

//   invalidatesTags: ["Users"],
// }),

//     // DEPARTMENT
//     getDepartments: builder.query({
//       query: () => "/admin/department",
//       providesTags: ["Department"],
//     }),

//     createDepartment: builder.mutation({
//       query: (data) => ({
//         url: "/admin/department",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Department"],
//     }),

//     deleteDepartment: builder.mutation({
//       query: (id) => ({
//         url: `/admin/department/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Department"],
//     }),

//     // POLICY
//     getPolicies: builder.query({
//       query: () => "/admin/policy",
//       providesTags: ["Policy"],
//     }),

//     createPolicy: builder.mutation({
//       query: (data) => ({
//         url: "/admin/policy",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Policy"],
//     }),

//     togglePolicy: builder.mutation({
//       query: (id) => ({
//         url: `/admin/policy/toggle/${id}`,
//         method: "PUT",
//       }),
//       invalidatesTags: ["Policy"],
//     }),

//     // DELETE POLICY
// deletePolicy: builder.mutation({

//   query: (id) => ({

//     url: `/admin/policy/${id}`,

//     method: "DELETE",
//   }),

//   invalidatesTags: ["Policy"],
// }),


//     // REQUESTS
//     getAllRequests: builder.query({
//       query: () => "/admin/requests",
//     }),

//     overrideRequest: builder.mutation({
//       query: ({ id, status }) => ({
//         url: `/admin/requests/override/${id}?status=${status}`,
//         method: "PUT",
//       }),
//     }),

//     getPendingRequests: builder.query({
//   query: () => "/manager/pending",
// }),

//     // AUDIT
//     getAuditLogs: builder.query({
//   query: () => "audit/logs",
// }),

//   }),
// });

// export const {
//   useGetAllUsersQuery,
//   useGetAllRequestsQuery,
//   useGetPendingRequestsQuery,

//   useCreateUserMutation,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
//   useToggleUserStatusMutation,

//   useDeletePolicyMutation,
//   useCreatePolicyMutation,
//   useGetPoliciesQuery,
//   useTogglePolicyMutation,
//   useGetAuditLogsQuery,

// } = adminApi;



import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// ==========================================
// BASE URL
// ==========================================

const BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080/api";

// ==========================================
// ADMIN API
// ==========================================

export const adminApi = createApi({

    reducerPath: "adminApi",

    tagTypes: [
        "Users",
        "Policy",
        "Department",
        "Requests",
        "Audit",
    ],

    // ======================================
    // BASE QUERY
    // ======================================

    baseQuery: fetchBaseQuery({

        baseUrl: BASE_URL,

        prepareHeaders: (headers) => {

            const token =
                localStorage.getItem("token");

            if (token) {

                headers.set(
                    "Authorization",
                    `Bearer ${token}`
                );
            }

            headers.set(
                "Content-Type",
                "application/json"
            );

            return headers;
        },
    }),

    // ======================================
    // ENDPOINTS
    // ======================================

    endpoints: (builder) => ({

        // ======================================
        // USERS
        // ======================================

        getAllUsers: builder.query({

            query: () => "/admin/users",

            providesTags: ["Users"],
        }),

        createUser: builder.mutation({

            query: (data) => ({

                url: "/admin/create-user",

                method: "POST",

                body: data,
            }),

            invalidatesTags: ["Users"],
        }),

        updateUser: builder.mutation({

            query: ({ id, data }) => ({

                url: `/admin/users/${id}`,

                method: "PUT",

                body: data,
            }),

            invalidatesTags: ["Users"],
        }),

        deleteUser: builder.mutation({

            query: (id) => ({

                url: `/admin/users/${id}`,

                method: "DELETE",
            }),

            invalidatesTags: ["Users"],
        }),

        toggleUserStatus: builder.mutation({

            query: (id) => ({

                url: `/admin/users/${id}/toggle-status`,

                method: "PUT",
            }),

            invalidatesTags: ["Users"],
        }),

        // ======================================
        // DEPARTMENTS
        // ======================================

        getDepartments: builder.query({

            query: () => "/admin/department",

            providesTags: ["Department"],
        }),

        createDepartment: builder.mutation({

            query: (data) => ({

                url: "/admin/department",

                method: "POST",

                body: data,
            }),

            invalidatesTags: ["Department"],
        }),

        deleteDepartment: builder.mutation({

            query: (id) => ({

                url: `/admin/department/${id}`,

                method: "DELETE",
            }),

            invalidatesTags: ["Department"],
        }),

        // ======================================
        // POLICIES
        // ======================================

        getPolicies: builder.query({

            query: () => "/admin/policy",

            providesTags: ["Policy"],
        }),

        createPolicy: builder.mutation({

            query: (data) => ({

                url: "/admin/policy",

                method: "POST",

                body: data,
            }),

            invalidatesTags: ["Policy"],
        }),

        togglePolicy: builder.mutation({

            query: (id) => ({

                url: `/admin/policy/toggle/${id}`,

                method: "PUT",
            }),

            invalidatesTags: ["Policy"],
        }),

        deletePolicy: builder.mutation({

            query: (id) => ({

                url: `/admin/policy/${id}`,

                method: "DELETE",
            }),

            invalidatesTags: ["Policy"],
        }),

        // ======================================
        // REQUESTS
        // ======================================

        getAllRequests: builder.query({

            query: () => "/admin/requests",

            providesTags: ["Requests"],
        }),

        overrideRequest: builder.mutation({

            query: ({ id, status }) => ({

                url:
                    `/admin/requests/override/${id}?status=${status}`,

                method: "PUT",
            }),

            invalidatesTags: ["Requests"],
        }),

        // ======================================
        // MANAGER REQUESTS
        // ======================================

        getPendingRequests: builder.query({

            query: () => "/manager/pending",

            providesTags: ["Requests"],
        }),

        // ======================================
        // AUDIT LOGS
        // ======================================

        getAuditLogs: builder.query({

            query: () => "/audit/logs",

            providesTags: ["Audit"],
        }),

        // ======================================
        // ADMIN REPORTS
        // ======================================

        getAdminReports: builder.query({

            query: () => "/admin/reports",

            providesTags: ["Audit"],
        }),
    }),
});

// ==========================================
// EXPORT HOOKS
// ==========================================

export const {

    // USERS
    useGetAllUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useToggleUserStatusMutation,

    // DEPARTMENTS
    useGetDepartmentsQuery,
    useCreateDepartmentMutation,
    useDeleteDepartmentMutation,

    // POLICIES
    useGetPoliciesQuery,
    useCreatePolicyMutation,
    useTogglePolicyMutation,
    useDeletePolicyMutation,

    // REQUESTS
    useGetAllRequestsQuery,
    useOverrideRequestMutation,
    useGetPendingRequestsQuery,

    // AUDIT
    useGetAuditLogsQuery,

    // REPORTS
    useGetAdminReportsQuery,

} = adminApi;