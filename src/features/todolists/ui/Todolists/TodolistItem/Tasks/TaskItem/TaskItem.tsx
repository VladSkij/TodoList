import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "@/common/hooks"
import { deleteTaskTC, updateTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { getListItemSx } from "./TaskItem.styles"
import { TaskStatus } from "@/common/enums"
import { ChangeEvent } from "react"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { useGetTasksQuery, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  task: DomainTask
  todolistId: string
  disabled?: boolean
}

export const TaskItem = ({ task, todolistId, disabled }: Props) => {
  const dispatch = useAppDispatch()
  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
  }

  const [updateTask] = useUpdateTaskMutation()
  const { data } = useGetTasksQuery(todolistId)

  const changeTaskTitleHandler = (title: string) => {
    updateTask({
      todolistId,
      taskId: task.id,
      model: {
        title,
      },
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>)=>{
    const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTask({
      todolistId,
      taskId: task.id,
      model: {
        status: newStatusValue
      },
    })
  }

  const checked = task.status === TaskStatus.Completed


  return (
    <ListItem sx={getListItemSx(checked)}>
      <div>
        <Checkbox checked={checked} onChange={changeTaskStatusHandler} disabled={disabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={disabled} />
      </div>
      <span>{new Date(task.addedDate).toLocaleDateString()}</span>
      <IconButton onClick={deleteTask} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
