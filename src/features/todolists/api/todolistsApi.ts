import { instance } from "@/common/instance"
import { BaseResponse, DeafultResponse } from "@/common/types"
import type { CreateTodolistResponse, Todolist } from "./todolistsApi.types"
import { BaseQueryArg, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<DeafultResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{item:Todolist}>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<DeafultResponse>(`/todo-lists/${id}`)
  },
}

export const todolistsApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse(todolists: Todolist[]) {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "/todo-lists",
        method: "post",
        body: { title },
      }),
    }),
    changeTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `/todo-lists/${id}`,
        method: "put",
        body: { id, title },
      }),
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/todo-lists/${id}`,
        method: "delete",
      }),
    }),
  }),
})

export const { useGetTodolistsQuery, useCreateTodolistMutation, useChangeTodolistTitleMutation, useDeleteTodolistMutation} = todolistsApi

