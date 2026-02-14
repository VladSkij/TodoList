import { createAppSlice } from "@/common/utils"
import { LoginInputs } from "@/features/auth/lib/schemas/LoginSchema.ts"
import { setAppStatusAC } from "@/app/app-slice.ts"
import { ResaultCode } from "@/common/enums"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { authApi } from "@/features/auth/api/authApi.ts"
import { AUTH_TOKEN } from "@/common/constants"
import { clearDataAC } from "@/common/actions"



export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    nickname: localStorage.getItem("email") as string | null,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectNickname: (state) => state.nickname,
  },
  reducers: (create) => ({

    setIsLoggedInAC: create.reducer<{ isLoggedIn:boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),

    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        const { email } = data
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.login(data)
          if (res.data.resultCode === ResaultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true, email }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (err) {
          handleServerNetworkError(err, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
          state.nickname = action.payload.email
          // localStorage.setItem("email", action.payload.email)
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.logout()
          if (res.data.resultCode === ResaultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (err) {
          handleServerNetworkError(err, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
          localStorage.removeItem("email")
          state.nickname = null
        },
      },
    ),
    meTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.me()
          if (res.data.resultCode === ResaultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            dispatch(clearDataAC())
            return { isLoggedIn: true }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (err) {
          handleServerNetworkError(err, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
})

export const { selectIsLoggedIn, selectNickname } = authSlice.selectors
export const authReducer = authSlice.reducer
export const { loginTC, logoutTC, meTC, setIsLoggedInAC } = authSlice.actions