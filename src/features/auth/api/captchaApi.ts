import { baseApi } from "@/app/baseApi.ts"

export const captchaApi = baseApi.injectEndpoints({
  endpoints: (build) =>({
    getCaptcha: build.query<{url: string}, void>({
      query: () =>({
        url: "security/get-captcha-url",
      })
    })
  })
})

export const {useGetCaptchaQuery} = captchaApi