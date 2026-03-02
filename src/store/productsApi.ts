import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  title: string;
  description: string;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ulearn.fit/api" }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
