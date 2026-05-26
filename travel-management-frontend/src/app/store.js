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
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },

    devTools: import.meta.env.MODE !== "production",
});