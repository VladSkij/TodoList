import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"
import { DomainTodolist } from "@/features/todolists/ui/Todolists/lib/types"


type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, addedDate } = todolist
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const [removeTodolist] = useDeleteTodolistMutation()

  const deleteTodolistHandler = () => {
    removeTodolist(id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
      </h3>
      <span className={styles.date}>{new Date(addedDate).toLocaleDateString()}</span>
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
