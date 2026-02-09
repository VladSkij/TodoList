import { instance } from "@/common/instance"
import { DeafultResponse } from "@/common/types"
import type { CreateTodolistResponse, Todolist } from "./todolistsApi.types"
import { BaseQueryMeta, BaseQueryResult, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
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
    return instance.post<CreateTodolistResponse>("/todo-lists", { title })
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
    prepareHeaders: headers=>{
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    }
  }),
  endpoints: (builder) => {
    return {
      getTodolists: builder.query<DomainTodolist[], void>({
        query: () => {
          return {
            method: "get",
            url: "/todo-lists",
          }
        },
        transformResponse(todolists:Todolist[]){
          return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        }
      }),
    }
  },
})

export const { useGetTodolistsQuery } = todolistsApi