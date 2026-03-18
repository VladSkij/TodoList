import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import { setAppErrorAC } from "@/app/app-slice.ts"
import { isErrorWithMessage } from "@/common/utils/isErrorWithMessage.ts"

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Todolist", "Task"],
  baseQuery: async (args, api, extraOptions)=>{
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        "API-KEY": import.meta.env.VITE_API_KEY,
      },
      prepareHeaders: (headers) => {
        headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
    })(args, api, extraOptions)

    if(result.error){
      if (
        result.error.status === "FETCH_ERROR" ||
        result.error.status === "PARSING_ERROR" ||
        result.error.status === "CUSTOM_ERROR" ||
        result.error.status === "TIMEOUT_ERROR"
      ) {
        api.dispatch(setAppErrorAC({ error: result.error.error }))
      }
      if(result.error.status === 403){
        api.dispatch(setAppErrorAC({ error: "403 Forbidden Error. Check API-KEY" }))
      }
      if (result.error.status === 400) {
        //var1
        //api.dispatch(setAppErrorAC({ error: (result.error.data as{ message: string }).message }))

        //var2+++
        if (isErrorWithMessage(result.error.data)) {
          api.dispatch(setAppErrorAC({error: result.error.data.message}))
        }else{
          api.dispatch(setAppErrorAC({
            error: 'Something went wrong!'
          }))
        }
      }
    }
    //debugger
    return result
  },
  endpoints: () => ({}),
})
