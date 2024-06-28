import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Articles", "Article"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://blog.kata.academy/api/`,
  }),
  endpoints: (build) => ({
    getAllArticles: build.query({
      query: (offset = 0) => ({
        url: `articles`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        params: {
          offset,
          limit: 5,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ slug }) => ({
                type: "Articles",
                slug,
              })),
              { type: "Articles", id: "LIST" },
            ]
          : [{ type: "Articles", id: "LIST" }],
    }),

    getAnArticle: build.query({
      query: (slug) => ({
        url: `articles/${slug}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Article"],
    }),

    createAnArticle: build.mutation({
      query: (body) => ({
        url: "articles",
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),

    updateAnArticle: build.mutation({
      query: ({ body, slug }) => ({
        url: `articles/${slug}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }, "Article"],
    }),

    deleteAnArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),

    favoriteAnArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: {},
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }, "Article"],
    }),

    unfavoriteAnArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }, "Article"],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetAnArticleQuery,
  useCreateAnArticleMutation,
  useUpdateAnArticleMutation,
  useDeleteAnArticleMutation,
  useFavoriteAnArticleMutation,
  useUnfavoriteAnArticleMutation,
} = postsApi;
