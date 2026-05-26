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
// MANAGER API
// ==========================================

export const managerApi = createApi({

    reducerPath: "managerApi",

    tagTypes: [
        "PendingRequests",
        "ApprovalHistory",
        "TeamActivity",
        "ManagerProfile",
        "Reports",
        "Policies",
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
        // DASHBOARD
        // ======================================

        getManagerDashboard: builder.query({

            query: () =>
                "/manager/dashboard",

            providesTags: ["PendingRequests"],
        }),

        // ======================================
        // PENDING REQUESTS
        // ======================================

        getPendingRequests: builder.query({

            query: () =>
                "/manager/pending",

            providesTags: ["PendingRequests"],
        }),

        // ======================================
        // ALL MANAGER REQUESTS
        // ======================================

        getManagerRequests: builder.query({

            query: () =>
                "/manager/requests",

            providesTags: ["PendingRequests"],
        }),

        // ======================================
        // GET SINGLE REQUEST
        // ======================================

        getRequestById: builder.query({

            query: (id) =>
                `/manager/request/${id}`,

            providesTags: ["PendingRequests"],
        }),

        // ======================================
        // APPROVE REQUEST
        // ======================================

        approveRequest: builder.mutation({

            query: ({ id, comment }) => ({

                url:
                    `/manager/approve/${id}`,

                method: "PUT",

                body: { comment },
            }),

            invalidatesTags: [
                "PendingRequests",
                "ApprovalHistory",
            ],
        }),

        // ======================================
        // REJECT REQUEST
        // ======================================

        rejectRequest: builder.mutation({

            query: ({ id, comment }) => ({

                url:
                    `/manager/reject/${id}`,

                method: "PUT",

                body: { comment },
            }),

            invalidatesTags: [
                "PendingRequests",
                "ApprovalHistory",
            ],
        }),

        // ======================================
        // REQUEST CHANGES
        // ======================================

        requestChanges: builder.mutation({

            query: ({ id, comment }) => ({

                url:
                    `/manager/request-changes/${id}`,

                method: "PUT",

                body: { comment },
            }),

            invalidatesTags: [
                "PendingRequests",
                "ApprovalHistory",
            ],
        }),

        // ======================================
        // APPROVAL HISTORY
        // ======================================

        getApprovalHistory: builder.query({

            query: (requestId) =>
                `/manager/history/${requestId}`,

            providesTags: ["ApprovalHistory"],
        }),

        // ======================================
        // TEAM ACTIVITY
        // ======================================

        getTeamActivity: builder.query({

            query: () =>
                "/manager/team-activity",

            providesTags: ["TeamActivity"],
        }),

        // ======================================
        // REPORTS
        // ======================================

        getManagerReports: builder.query({

            query: () =>
                "/manager/reports",

            providesTags: ["Reports"],
        }),

        // ======================================
        // POLICIES
        // ======================================

        getPolicies: builder.query({

            query: () =>
                "/manager/policies",

            providesTags: ["Policies"],
        }),

        // ======================================
        // PROFILE
        // ======================================

        getManagerProfile: builder.query({

            query: () =>
                "/manager/profile",

            providesTags: ["ManagerProfile"],
        }),

        // ======================================
        // UPDATE PROFILE
        // ======================================

        updateManagerProfile: builder.mutation({

            query: (data) => ({

                url:
                    "/manager/profile/update",

                method: "PUT",

                body: data,
            }),

            invalidatesTags: ["ManagerProfile"],
        }),

        // ======================================
        // VIEW ITINERARY
        // ======================================

        getEmployeeItinerary: builder.query({

            query: (requestId) =>
                `/manager/itinerary/${requestId}`,

            providesTags: ["PendingRequests"],
        }),
    }),
});

// ==========================================
// EXPORT HOOKS
// ==========================================

export const {

    // DASHBOARD
    useGetManagerDashboardQuery,

    // REQUESTS
    useGetPendingRequestsQuery,
    useGetManagerRequestsQuery,
    useGetRequestByIdQuery,

    // APPROVALS
    useApproveRequestMutation,
    useRejectRequestMutation,
    useRequestChangesMutation,

    // HISTORY
    useGetApprovalHistoryQuery,

    // TEAM ACTIVITY
    useGetTeamActivityQuery,

    // REPORTS
    useGetManagerReportsQuery,

    // POLICIES
    useGetPoliciesQuery,

    // PROFILE
    useGetManagerProfileQuery,
    useUpdateManagerProfileMutation,

    // ITINERARY
    useGetEmployeeItineraryQuery,

} = managerApi;