import { TaskPriority, TaskStatus } from "@/common/enums/enums"
import {z} from "zod"
import { baseResponseSchema } from "@/common/types"

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  deadline: z.string().nullable(),
  startDate: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.iso.datetime({local: true}),
})

export type DomainTask = z.infer<typeof domainTaskSchema>

export const getTasksSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number().int().nonnegative(),
  items: domainTaskSchema.array()
})

export type GetTasksResponse = z.infer<typeof getTasksSchema>


export const taskOperationResponseSchema = baseResponseSchema(
  z.object({
    item: domainTaskSchema,
  })
)

export type TaskOperstionResponse = z.infer<typeof taskOperationResponseSchema>

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
