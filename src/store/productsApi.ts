/* eslint-disable @typescript-eslint/no-explicit-any */
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
    getBooks: builder.query<any[], { limit?: number; search?: string } | void>({
      query: params => ({
        url: "/books",
        params: params || undefined,
      }),
    }),
    getMovies: builder.query<any[], { limit?: number; search?: string } | void>(
      {
        query: params => ({
          url: "/movies",
          params: params || undefined,
        }),
      },
    ),
    getGames: builder.query<any[], { limit?: number } | void>({
      query: params => ({
        url: "/games",
        params: params || undefined,
      }),
    }),
    getPosts: builder.query<any[], { limit?: number } | void>({
      query: params => ({
        url: "/posts",
        params: params || undefined,
      }),
    }),
    getTasks: builder.query<any[], { limit?: number } | void>({
      query: params => ({
        url: "/tasks",
        params: params || undefined,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetBooksQuery,
  useGetMoviesQuery,
  useGetGamesQuery,
  useGetPostsQuery,
  useGetTasksQuery,
} = productsApi;
