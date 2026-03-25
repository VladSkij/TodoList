import type { GetTasksResponse, TaskOperstionResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "@/app/baseApi.ts"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => ({
        url: `/todo-lists/${todolistId}/tasks`,
      }),
      providesTags: (res, err, todolistId) =>
        res ? [...res.items.map(({id}) =>({type: "Task", id}) as const), {type: "Task", id: todolistId}] : ["Task"],
    }),

    removeTask: build.mutation<TaskOperstionResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, { taskId }) => [{ type: "Task", id: taskId }],
    }),

    updateTask: build.mutation<TaskOperstionResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: model,
      }),
      invalidatesTags: (_res, _err, { taskId }) => [{ type: "Task", id: taskId }],
    }),

    createTask: build.mutation<TaskOperstionResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (res) => [{ type: "Task", id: res ? res.data.item.id : "LIST" }],
    }),
  }),
})
export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useRemoveTaskMutation } = tasksApi
