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
// EMPLOYEE API
// ==========================================

export const employeeApi = createApi({

    reducerPath: "employeeApi",

    tagTypes: [
        "TravelRequest",
        "Expense",
        "Itinerary",
        "Profile",
        "Notification",
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

        getEmployeeDashboard: builder.query({

            query: () =>
                "/employee/dashboard",

            providesTags: ["TravelRequest"],
        }),

        // ======================================
        // CREATE TRAVEL REQUEST
        // ======================================

        createTravelRequest: builder.mutation({

            query: (data) => ({

                url: "/employee/request",

                method: "POST",

                body: data,
            }),

            invalidatesTags: ["TravelRequest"],
        }),

        // ======================================
        // GET MY REQUESTS
        // ======================================

        getMyRequests: builder.query({

            query: () =>
                "/employee/requests",

            providesTags: ["TravelRequest"],
        }),

        // ======================================
        // GET SINGLE REQUEST
        // ======================================

        getRequestById: builder.query({

            query: (id) =>
                `/employee/request/${id}`,

            providesTags: ["TravelRequest"],
        }),

        // ======================================
        // UPDATE REQUEST
        // ======================================

        updateTravelRequest: builder.mutation({

            query: ({ id, data }) => ({

                url: `/employee/request/${id}`,

                method: "PUT",

                body: data,
            }),

            invalidatesTags: ["TravelRequest"],
        }),

        // ======================================
        // DELETE REQUEST
        // ======================================

        deleteTravelRequest: builder.mutation({

            query: (id) => ({

                url: `/employee/request/${id}`,

                method: "DELETE",
            }),

            invalidatesTags: ["TravelRequest"],
        }),

        // ======================================
        // SUBMIT REQUEST
        // ======================================

        submitTravelRequest: builder.mutation({

            query: (id) => ({

                url:
                    `/employee/request/${id}/submit`,

                method: "PUT",
            }),

            invalidatesTags: ["TravelRequest"],
        }),

        // ======================================
        // CANCEL REQUEST
        // ======================================

        cancelTravelRequest: builder.mutation({

            query: (id) => ({

                url:
                    `/employee/request/${id}/cancel`,

                method: "PUT",
            }),

            invalidatesTags: ["TravelRequest"],
        }),

        // ======================================
        // CREATE ITINERARY
        // ======================================

        createItinerary: builder.mutation({

            query: ({ requestId, data }) => ({

                url:
                    `/employee/itinerary/${requestId}`,

                method: "POST",

                body: data,
            }),

            invalidatesTags: ["Itinerary"],
        }),

        // ======================================
        // GET ITINERARY
        // ======================================

        getItinerary: builder.query({

            query: (requestId) =>
                `/employee/itinerary/${requestId}`,

            providesTags: ["Itinerary"],
        }),

        // ======================================
        // UPDATE ITINERARY
        // ======================================

        updateItinerary: builder.mutation({

            query: ({ requestId, data }) => ({

                url:
                    `/employee/itinerary/${requestId}`,

                method: "PUT",

                body: data,
            }),

            invalidatesTags: ["Itinerary"],
        }),

        // ======================================
        // CREATE EXPENSE
        // ======================================

        createExpense: builder.mutation({

            query: (data) => ({

                url: "/employee/expense",

                method: "POST",

                body: data,
            }),

            invalidatesTags: ["Expense"],
        }),

        // ======================================
        // GET MY EXPENSES
        // ======================================

        getMyExpenses: builder.query({

            query: () =>
                "/employee/expenses",

            providesTags: ["Expense"],
        }),

        // ======================================
        // GET SINGLE EXPENSE
        // ======================================

        getExpenseById: builder.query({

            query: (id) =>
                `/employee/expense/${id}`,

            providesTags: ["Expense"],
        }),

        // ======================================
        // UPDATE EXPENSE
        // ======================================

        updateExpense: builder.mutation({

            query: ({ id, data }) => ({

                url: `/employee/expense/${id}`,

                method: "PUT",

                body: data,
            }),

            invalidatesTags: ["Expense"],
        }),

        // ======================================
        // DELETE EXPENSE
        // ======================================

        deleteExpense: builder.mutation({

            query: (id) => ({

                url: `/employee/expense/${id}`,

                method: "DELETE",
            }),

            invalidatesTags: ["Expense"],
        }),

        // ======================================
        // PROFILE
        // ======================================

        getEmployeeProfile: builder.query({

            query: () =>
                "/employee/profile",

            providesTags: ["Profile"],
        }),

        // ======================================
        // UPDATE PROFILE
        // ======================================

        updateEmployeeProfile: builder.mutation({

            query: (data) => ({

                url:
                    "/employee/profile/update",

                method: "PUT",

                body: data,
            }),

            invalidatesTags: ["Profile"],
        }),

        // ======================================
        // NOTIFICATIONS
        // ======================================

        getNotifications: builder.query({

            query: () =>
                "/employee/notifications",

            providesTags: ["Notification"],
        }),

        // ======================================
        // MARK NOTIFICATION READ
        // ======================================

        markNotificationRead: builder.mutation({

            query: (id) => ({

                url:
                    `/employee/notifications/${id}/read`,

                method: "PUT",
            }),

            invalidatesTags: ["Notification"],
        }),
    }),
});

// ==========================================
// EXPORT HOOKS
// ==========================================

export const {

    // DASHBOARD
    useGetEmployeeDashboardQuery,

    // REQUESTS
    useCreateTravelRequestMutation,
    useGetMyRequestsQuery,
    useGetRequestByIdQuery,
    useUpdateTravelRequestMutation,
    useDeleteTravelRequestMutation,
    useSubmitTravelRequestMutation,
    useCancelTravelRequestMutation,

    // ITINERARY
    useCreateItineraryMutation,
    useGetItineraryQuery,
    useUpdateItineraryMutation,

    // EXPENSES
    useCreateExpenseMutation,
    useGetMyExpensesQuery,
    useGetExpenseByIdQuery,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,

    // PROFILE
    useGetEmployeeProfileQuery,
    useUpdateEmployeeProfileMutation,

    // NOTIFICATIONS
    useGetNotificationsQuery,
    useMarkNotificationReadMutation,

} = employeeApi;