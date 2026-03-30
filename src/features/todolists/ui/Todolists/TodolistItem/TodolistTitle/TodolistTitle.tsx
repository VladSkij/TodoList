import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {
  todolistsApi,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} from "@/features/todolists/api/todolistsApi.ts"
import { useAppDispatch } from "@/common/hooks"
import { ResaultCode } from "@/common/enums"
import { RequestStatus } from "@/common/types"
import { DomainTodolist } from "@/features/todolists/ui/Todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus, addedDate } = todolist
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const [removeTodolist] = useDeleteTodolistMutation()
  const dispatch = useAppDispatch()

  const changeEntityStatus = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.entityStatus = status
        }
      }),
    )
  }

  // const deleteTodolistHandler = () => {
  //   changeEntityStatus("loading")
  //   removeTodolist(id)
  //     .unwrap()
  //     .then((res) => {
  //       if (res.resultCode === ResaultCode.Error) {
  //         changeEntityStatus("failed")
  //       }
  //     })
  //     .catch(() => {
  //       changeEntityStatus("failed")
  //     })
  // }

  const deleteTodolistHandler = async () =>{
    const patchResult = dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
        const todolist = state.find(todolist => todolist.id === id)
        if (todolist) {
          todolist.entityStatus = 'loading'
        }
      })
    )
    try {
      await removeTodolist(id).unwrap()
    } catch {
      patchResult.undo()
    }
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ id, title })
  }

  const disabled = entityStatus === "loading"

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} disabled={disabled} />
      </h3>
      <span>{new Date(addedDate).toLocaleDateString()}</span>
      <IconButton onClick={deleteTodolistHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
