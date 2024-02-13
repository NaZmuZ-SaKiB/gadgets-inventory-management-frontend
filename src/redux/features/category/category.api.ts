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
  }),
});

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } =
  categoryApi;
