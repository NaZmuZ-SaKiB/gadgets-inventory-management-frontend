import baseApi from "@/redux/api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
      providesTags: ["brand"],
    }),

    createBrand: builder.mutation({
      query: (name: string) => ({
        url: "/brands",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const { useGetAllBrandsQuery, useCreateBrandMutation } = brandApi;
