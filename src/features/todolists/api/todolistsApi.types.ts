import {z} from "zod";
import { baseResponseSchema } from "@/common/types"

export const todolistsApischema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({ local: true }),
  order: z.int(),
})

export type Todolist = z.infer<typeof todolistsApischema>

export const createTodolistResponseSchema = baseResponseSchema(
  z.object({
    item: todolistsApischema,
  }),
)

export type CreateTodolistResponse = z.infer<typeof createTodolistResponseSchema>