import baseApi from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/sign-in",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth", "products", "sales"],
    }),

    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/users/sign-up",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["auth", "products", "sales"],
    }),

    isLoggedIn: builder.query({
      query: () => ({
        url: "/users/status",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/users/sign-out",
        method: "POST",
      }),
      invalidatesTags: ["auth", "products", "sales"],
    }),

    getAllUsers: builder.query({
      query: (filters) => ({
        url: "/users",
        method: "GET",
        params: filters,
      }),
      providesTags: ["users"],
    }),
  }),
});

export const {
  useIsLoggedInQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
} = authApi;
