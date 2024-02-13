import baseApi from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/sign-in",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/users/sign-up",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["auth"],
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
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useIsLoggedInQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApi;
