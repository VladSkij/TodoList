// import type{ Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"
import { setAppStatusAC } from "@/app/app-slice.ts"
import { defaultResponseSchema, RequestStatus } from "@/common/types"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { ResaultCode } from "@/common/enums"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"

import {
  createTodolistResponseSchema,
  Todolist,
  todolistsApischema,
} from "@/features/todolists/api/todolistsApi.types.ts"
import { clearDataAC } from "@/common/actions"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    //Action creator
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    changeTodolistStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),

    //Thunk creator
    fetchTodoistsTC: create.asyncThunk(
      async (_arg, { rejectWithValue, dispatch }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.getTodolists()
          todolistsApischema.array().parse(res.data)
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (_state, action) => {
          return action.payload?.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        },
      },
    ),
    changeTodolistTitleTC: create.asyncThunk(
      async (payload: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.changeTodolistTitle(payload)
          defaultResponseSchema.parse(res.data)
          if (res.data.resultCode === ResaultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
          return payload
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state[index].title = action.payload.title
          }
        },
      },
    ),
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
