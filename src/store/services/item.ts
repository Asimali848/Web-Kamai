/**
 * Example API Service
 * Each entity will have it's own API Service
 * Auth is separated from other API Services
 */
import { api } from "./core";

/**
 * Import Setters and Getters from the Global Slice for each entity you want access to globally in the application
 * import { setLanguage, setUser } from "../slices/global";
 */

export const itemApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchItems: build.query({
      query: (token: string) => ({
        url: "/items",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Items"],
      transformResponse: (response: GetItem[]) => response,
    }),
    fetchItem: build.query({
      query: ({ id, token }: { id: string; token: string }) => ({
        url: `/items/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Item"],
      transformResponse: (response: GetItem) => response,
    }),
    postItem: build.mutation({
      query: ({ body, token }: { body: PostItem; token: string }) => ({
        url: "/items",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["Items"],
    }),
    deleteItem: build.mutation({
      query: ({ id, token }: { id: string; token: string }) => ({
        url: `/items/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Items"],
    }),
    updateItem: build.mutation({
      query: ({
        id,
        body,
        token,
      }: {
        id: string;
        body: PostItem;
        token: string;
      }) => ({
        url: `/items/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["Items", "Item"],
    }),
    upsertItem: build.mutation({
      query: ({
        id,
        token,
        body,
      }: {
        id: string;
        token: string;
        body: PostItem;
      }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["Items", "Item"],
    }),
  }),
});

export const {
  useFetchItemsQuery,
  useFetchItemQuery,
  useDeleteItemMutation,
  usePostItemMutation,
  useUpdateItemMutation,
  useUpsertItemMutation,
} = itemApi;
