import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"
import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage
    if(axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || error.message
    }else if(error instanceof Error) {
      errorMessage = `Native error: ${error.message}`
    }else{
      errorMessage = JSON.stringify(error)
    }
    dispatch(setAppErrorAC({error: errorMessage}))
    dispatch(setAppStatusAC({status: 'failed'}))
}