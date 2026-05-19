import {

  createApi,

  fetchBaseQuery,

} from "@reduxjs/toolkit/query/react";

export const authApi =
  createApi({

    reducerPath: "authApi",

    baseQuery:
      fetchBaseQuery({

        baseUrl:
          "http://localhost:8080",
      }),

    endpoints: (builder) => ({

      // LOGIN API
      login:
        builder.mutation({

          query: (
            credentials
          ) => ({

            url: "/auth/login",

            method: "POST",

            body: credentials,
          }),
        }),
    }),
  });

export const {
  useLoginMutation,
} = authApi;