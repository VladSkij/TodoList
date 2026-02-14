import { LoginInputs } from "@/features/auth/lib/schemas/LoginSchema.ts"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (body) => ({
        url: "/auth/login",
        method: "post",
        body,
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        url: "/auth/login",
        method: "delete",
      }),
    }),
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => ({
        url: `/auth/me`,
      }),
    }),
  }),
})
export const { useMeQuery, useLogoutMutation, useLoginMutation } = authApi