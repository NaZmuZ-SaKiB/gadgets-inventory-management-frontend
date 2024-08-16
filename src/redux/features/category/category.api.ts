import baseApi from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    createCategory: builder.mutation({
      query: (name: string) => ({
        url: "/categories",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: (data: { id: string; name: string }) => ({
        url: `/categories/${data.id}`,
        method: "PATCH",
        body: { name: data.name },
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
