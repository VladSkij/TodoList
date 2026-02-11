import { LoginInputs } from "@/features/auth/lib/schemas/LoginSchema.ts"
import { BaseResponse } from "@/common/types"
import { instance } from "@/common/instance"
import { baseApi } from "@/app/baseApi.ts"

export const _authApi = {
  login(payload: LoginInputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("/auth/login", payload)
  },
  logout() {
    return instance.delete<BaseResponse>("/auth/login")
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("/auth/me")
  },
}

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
