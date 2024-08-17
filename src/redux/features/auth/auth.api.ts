/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";
import { TUser } from "@/types/user.interface";

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

    getUserById: builder.query({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (data: { id: string; user: TUser }) => ({
        url: `/users/${data.id}`,
        method: "PATCH",
        body: data.user,
      }),
      invalidatesTags: ["user"],
    }),

    assignManager: builder.mutation({
      query: (id: string) => ({
        url: `/users/assign-manager/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),

    getDashboardChartsData: builder.query({
      query: () => ({
        url: "/users/chart-data",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useIsLoggedInQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useAssignManagerMutation,
  useGetDashboardChartsDataQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = authApi;
