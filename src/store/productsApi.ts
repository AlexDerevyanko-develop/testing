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
        params,
      }),
    }),
    getMovies: builder.query<any[], { limit?: number; search?: string } | void>(
      {
        query: params => ({
          url: "/movies",
          params,
        }),
      },
    ),
    getGames: builder.query<any[], { limit?: number } | void>({
      query: params => ({
        url: "/games",
        params,
      }),
    }),
    getPosts: builder.query<any[], { limit?: number } | void>({
      query: params => ({
        url: "/posts",
        params,
      }),
    }),
    getTasks: builder.query<any[], { limit?: number } | void>({
      query: params => ({
        url: "/tasks",
        params,
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
