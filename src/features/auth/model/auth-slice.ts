import { createAppSlice } from "@/common/utils"
import { LoginInputs } from "@/features/auth/lib/schemas/LoginSchema.ts"
import { setAppStatusAC } from "@/app/app-slice.ts"
import { ResaultCode } from "@/common/enums"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { authApi } from "@/features/auth/api/authApi.ts"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await authApi.login(data)
          if (res.data.resultCode === ResaultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            // localStorage.setItem(AUTH_TOKEN, res.data.data.token)
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

export const { selectIsLoggedIn } = authSlice.selectors
export const authReducer = authSlice.reducer
export const { loginTC } = authSlice.actions