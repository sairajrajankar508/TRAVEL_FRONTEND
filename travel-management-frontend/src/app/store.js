// import { configureStore } from "@reduxjs/toolkit";

// import { authApi } from "../services/authApi";

// import { adminApi } from "../services/adminApi";

// export const store = configureStore({

//   reducer: {

//     // AUTH API
//     [authApi.reducerPath]:
//       authApi.reducer,

//     // ADMIN API
//     [adminApi.reducerPath]:
//       adminApi.reducer,
//   },

//   middleware: (getDefaultMiddleware) =>

//     getDefaultMiddleware()

//       .concat(authApi.middleware)

//       .concat(adminApi.middleware),
// });



import { configureStore } from "@reduxjs/toolkit";

// ==========================================
// SLICES
// ==========================================

import authReducer
from "../features/auth/authSlice";

// ==========================================
// RTK QUERY APIs
// ==========================================

import { authApi }
from "../services/authApi";

import { adminApi }
from "../services/adminApi";

import { employeeApi }
from "../services/employeeApi";

import { managerApi }
from "../services/managerApi";

import { financeApi }
from "../services/financeApi";

// ==========================================
// STORE
// ==========================================

export const store = configureStore({

    reducer: {

        // ==================================
        // AUTH
        // ==================================

        auth: authReducer,

        // ==================================
        // RTK QUERY APIs
        // ==================================

        [authApi.reducerPath]:
            authApi.reducer,

        [adminApi.reducerPath]:
            adminApi.reducer,

        [employeeApi.reducerPath]:
            employeeApi.reducer,

        [managerApi.reducerPath]:
            managerApi.reducer,

        [financeApi.reducerPath]:
            financeApi.reducer,
    },

    // ======================================
    // MIDDLEWARE
    // ======================================

    middleware: (getDefaultMiddleware) =>

        getDefaultMiddleware()

            .concat(authApi.middleware)

            .concat(adminApi.middleware)

            .concat(employeeApi.middleware)

            .concat(managerApi.middleware)

            .concat(financeApi.middleware),

    // ======================================
    // DEVTOOLS
    // ======================================

    devTools:
        import.meta.env.MODE !== "production",
});