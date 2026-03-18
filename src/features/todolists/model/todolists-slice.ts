import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"
import { setAppStatusAC } from "@/app/app-slice.ts"
import { defaultResponseSchema, RequestStatus } from "@/common/types"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { ResaultCode } from "@/common/enums"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"

import { createTodolistResponseSchema, Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { clearDataAC } from "@/common/actions"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    createTodolistTC: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.createTodolist(title)
          createTodolistResponseSchema.parse(res.data)
          if (res.data.resultCode === ResaultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return res.data.data.item
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
          state.unshift({ ...action.payload, filter: "all", entityStatus: "idle" })
        },
      },
    ),

    deleteTodolistTC: create.asyncThunk(
      async (id: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          dispatch(changeTodolistStatusAC({ id, entityStatus: "loading" }))
          const res = await todolistsApi.deleteTodolist(id)
          defaultResponseSchema.parse(res.data)
          if (res.data.resultCode === ResaultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { id }
          } else {
            dispatch(changeTodolistStatusAC({ id, entityStatus: "failed" }))
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (err) {
          dispatch(changeTodolistStatusAC({ id, entityStatus: "failed" }))
          handleServerNetworkError(err, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(clearDataAC, () => [])
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
export const {
  changeTodolistFilterAC,
  fetchTodoistsTC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistStatusAC,
} = todolistsSlice.actions

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = "all" | "active" | "completed"
