import baseApi from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["products"],
    }),

    getAllProducts: builder.query({
      query: (filters) => ({
        url: "/products",
        method: "GET",
        params: filters,
      }),

      providesTags: ["products"],
    }),

    getProductById: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "products", id }],
    }),

    getStockCount: builder.query({
      query: (quantity: "1" | "0") => ({
        url: `/products/stock-count`,
        method: "GET",
        params: { quantity },
      }),
      providesTags: ["products"],
    }),

    getPurchaseCount: builder.query({
      query: () => ({
        url: `/products/purchase-count`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, product }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProducts: builder.mutation({
      query: (productIds: string[]) => ({
        url: "/products",
        method: "DELETE",
        body: { productIds },
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductsMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useGetPurchaseCountQuery,
  useGetStockCountQuery,
} = productApi;
