import { z } from "zod"
import { ResultCode } from "@/common/enums"


export const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

type FieldError = z.infer<typeof fieldErrorSchema>

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.enum(ResultCode),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array(),
  })

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

