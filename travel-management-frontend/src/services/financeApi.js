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
// FINANCE API
// ==========================================

export const financeApi = createApi({

    reducerPath: "financeApi",

    tagTypes: [
        "FinanceDashboard",
        "FinanceRequests",
        "Expenses",
        "Reimbursements",
        "Payments",
        "Reports",
        "FinanceProfile",
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
        // DASHBOARD
        // ======================================

        getFinanceDashboard: builder.query({

            query: () =>
                "/finance/dashboard",

            providesTags: ["FinanceDashboard"],
        }),

        // ======================================
        // FINANCE REQUESTS
        // ======================================

        getFinanceRequests: builder.query({

            query: () =>
                "/finance/requests",

            providesTags: ["FinanceRequests"],
        }),

        // ======================================
        // GET SINGLE REQUEST
        // ======================================

        getRequestById: builder.query({

            query: (id) =>
                `/finance/request/${id}`,

            providesTags: ["FinanceRequests"],
        }),

        // ======================================
        // APPROVE REQUEST
        // ======================================

        approveRequest: builder.mutation({

            query: ({ id, comment }) => ({

                url:
                    `/finance/approve/${id}`,

                method: "PUT",

                body: { comment },
            }),

            invalidatesTags: [
                "FinanceRequests",
            ],
        }),

        // ======================================
        // REJECT REQUEST
        // ======================================

        rejectRequest: builder.mutation({

            query: ({ id, comment }) => ({

                url:
                    `/finance/reject/${id}`,

                method: "PUT",

                body: { comment },
            }),

            invalidatesTags: [
                "FinanceRequests",
            ],
        }),

        // ======================================
        // PARTIAL APPROVAL
        // ======================================

        partialApproveRequest: builder.mutation({

            query: ({ id, data }) => ({

                url:
                    `/finance/partial-approve/${id}`,

                method: "PUT",

                body: data,
            }),

            invalidatesTags: [
                "FinanceRequests",
            ],
        }),

        // ======================================
        // EXPENSE REVIEWS
        // ======================================

        getExpenseReviews: builder.query({

            query: () =>
                "/finance/expenses",

            providesTags: ["Expenses"],
        }),

        // ======================================
        // GET SINGLE EXPENSE
        // ======================================

        getExpenseById: builder.query({

            query: (id) =>
                `/finance/expense/${id}`,

            providesTags: ["Expenses"],
        }),

        // ======================================
        // APPROVE EXPENSE
        // ======================================

        approveExpense: builder.mutation({

            query: ({ id, comment }) => ({

                url:
                    `/finance/expense/approve/${id}`,

                method: "PUT",

                body: { comment },
            }),

            invalidatesTags: [
                "Expenses",
                "Reimbursements",
            ],
        }),

        // ======================================
        // REJECT EXPENSE
        // ======================================

        rejectExpense: builder.mutation({

            query: ({ id, comment }) => ({

                url:
                    `/finance/expense/reject/${id}`,

                method: "PUT",

                body: { comment },
            }),

            invalidatesTags: ["Expenses"],
        }),

        // ======================================
        // FLAG SUSPICIOUS EXPENSE
        // ======================================

        flagExpense: builder.mutation({

            query: ({ id, reason }) => ({

                url:
                    `/finance/expense/flag/${id}`,

                method: "PUT",

                body: { reason },
            }),

            invalidatesTags: ["Expenses"],
        }),

        // ======================================
        // REIMBURSEMENTS
        // ======================================

        getReimbursements: builder.query({

            query: () =>
                "/finance/reimbursements",

            providesTags: ["Reimbursements"],
        }),

        // ======================================
        // PROCESS REIMBURSEMENT
        // ======================================

        processReimbursement: builder.mutation({

            query: ({ id, data }) => ({

                url:
                    `/finance/reimburse/${id}`,

                method: "PUT",

                body: data,
            }),

            invalidatesTags: [
                "Reimbursements",
                "Payments",
            ],
        }),

        // ======================================
        // PAYMENT HISTORY
        // ======================================

        getPaymentHistory: builder.query({

            query: () =>
                "/finance/payment-history",

            providesTags: ["Payments"],
        }),

        // ======================================
        // REPORTS
        // ======================================

        getFinanceReports: builder.query({

            query: () =>
                "/finance/reports",

            providesTags: ["Reports"],
        }),

        // ======================================
        // AUDIT & VERIFICATION
        // ======================================

        getAuditVerification: builder.query({

            query: () =>
                "/finance/audit",

            providesTags: ["Audit"],
        }),

        // ======================================
        // PROFILE
        // ======================================

        getFinanceProfile: builder.query({

            query: () =>
                "/finance/profile",

            providesTags: ["FinanceProfile"],
        }),

        // ======================================
        // UPDATE PROFILE
        // ======================================

        updateFinanceProfile: builder.mutation({

            query: (data) => ({

                url:
                    "/finance/profile/update",

                method: "PUT",

                body: data,
            }),

            invalidatesTags: ["FinanceProfile"],
        }),
    }),
});

// ==========================================
// EXPORT HOOKS
// ==========================================

export const {

    // DASHBOARD
    useGetFinanceDashboardQuery,

    // REQUESTS
    useGetFinanceRequestsQuery,
    useGetRequestByIdQuery,
    useApproveRequestMutation,
    useRejectRequestMutation,
    usePartialApproveRequestMutation,

    // EXPENSES
    useGetExpenseReviewsQuery,
    useGetExpenseByIdQuery,
    useApproveExpenseMutation,
    useRejectExpenseMutation,
    useFlagExpenseMutation,

    // REIMBURSEMENTS
    useGetReimbursementsQuery,
    useProcessReimbursementMutation,

    // PAYMENTS
    useGetPaymentHistoryQuery,

    // REPORTS
    useGetFinanceReportsQuery,

    // AUDIT
    useGetAuditVerificationQuery,

    // PROFILE
    useGetFinanceProfileQuery,
    useUpdateFinanceProfileMutation,

} = financeApi;