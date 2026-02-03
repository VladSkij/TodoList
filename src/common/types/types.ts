import { z } from "zod"
import { ResaultCode } from "@/common/enums"


export const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

type FieldError = z.infer<typeof fieldErrorSchema>

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.enum(ResaultCode),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array(),
  })

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

export const defaultResponseSchema = baseResponseSchema(z.object({

}))

export type DeafultResponse = z.infer<typeof defaultResponseSchema>

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"