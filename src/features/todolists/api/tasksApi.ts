import type { GetTasksResponse, TaskOperstionResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "@/app/baseApi.ts"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => ({
        url: `/todo-lists/${todolistId}/tasks`,
      }),
      providesTags: ["Task"],
    }),
    createTask: build.mutation<TaskOperstionResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: build.mutation<TaskOperstionResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: model,
      }),
      invalidatesTags: ["Task"],
    }),
    removeTask: build.mutation<TaskOperstionResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})
export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useRemoveTaskMutation } = tasksApi
