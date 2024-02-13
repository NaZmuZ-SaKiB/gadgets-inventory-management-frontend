import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.vite_backend_url}/api`,
  credentials: "include",
});

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["auth", "category", "brand", "products", "sales"],
  endpoints: () => ({}),
});

export default baseApi;
