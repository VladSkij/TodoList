import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { getListItemSx } from "./TaskItem.styles"
import { TaskStatus } from "@/common/enums"
import { ChangeEvent } from "react"
import type { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  task: DomainTask
  todolistId: string
  disabled?: boolean
}

const updateTaskModel = (task: DomainTask, patch: Partial<UpdateTaskModel>): UpdateTaskModel => ({
  title: task.title,
  status: task.status,
  description: task.description,
  priority: task.priority,
  startDate: task.startDate,
  deadline: task.deadline,
  ...patch,
})

export const TaskItem = ({ task, todolistId, disabled }: Props) => {
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useRemoveTaskMutation()

  const deleteTaskHandler = () => {
    deleteTask({ todolistId, taskId: task.id })
  }

  const changeTaskTitleHandler = (title: string) => {
    updateTask({ todolistId, taskId: task.id, model: updateTaskModel(task, { title: title }) })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTask({ todolistId, taskId: task.id, model: updateTaskModel(task, { status: newStatusValue }) })
  }

  const checked = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(checked)}>
      <div>
        <Checkbox checked={checked} onChange={changeTaskStatusHandler} disabled={disabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={disabled} />
      </div>
      <span>{new Date(task.addedDate).toLocaleDateString()}</span>
      <IconButton onClick={deleteTaskHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
