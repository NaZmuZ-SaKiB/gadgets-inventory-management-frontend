import baseApi from "@/redux/api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (saleInfo) => ({
        url: "/sales",
        method: "POST",
        body: saleInfo,
      }),
      invalidatesTags: ["sales", "products"],
    }),

    getAllSales: builder.query({
      query: (filters) => ({
        url: "/sales",
        method: "GET",
        params: filters,
      }),
      providesTags: ["sales"],
    }),
  }),
});

export const { useCreateSaleMutation, useGetAllSalesQuery } = saleApi;
